<?php

/* 
 * Copyright (C) 2015 innov24
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function scan($directory) {
    
    return array_diff(scandir($directory), array('..', '.'));
    
}

function stack_folder($path,$namespace,$mask = null) {

    //record the folder path containing libs
    try{
        $directory= new \DirectoryIterator($path);
    }catch(Exception $e){
        warning('filesystem', 'e001',$path);
        return;
    }

    //format eventual namespace
    //if namespace exist push namespace in stack as new javascript object
    if($namespace != '') { 
        $namespace = trim($namespace, '.');
        get_transmission()->stack('if(!'.$namespace.'){'.$namespace . ' = {};}');
        $namespace = $namespace.'.';
    }

    //scan the folder
    //exit if there is NO item, item is NOT (a folder or a file), item IS "dot" folder
    foreach($directory as $object) {

        //get path of item
        $pathname = $object->getPathname();

            if($object->isDir() && !$object->isDot()) {

                //get foldername
                $foldername = $object->getBasename();

                //build new namespace
                $newnamespace = $namespace.$foldername;

                //send new path and new namespace back to the function
                stack_folder($pathname,$newnamespace);

            }
            else if($object->isFile()) {
                
                //apply mask rule
                if($mask){
                    if(!preg_match('#'.$mask.'#', $pathname)){
                        continue;
                    }
                }

                //get file content
                $filecontent = get_file($pathname);

                //add $namespace to the beginning of file content
                $filecontent = $namespace.$filecontent;

                //push javascript object with new namespace in stack
                get_transmission()->stack($filecontent);

            }

    }

}