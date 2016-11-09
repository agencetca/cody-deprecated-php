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

function add_external_libs(){
    
            $path = 'public';
            $libs = '';

            $tree = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($path,
                    \RecursiveDirectoryIterator::SKIP_DOTS
                ),
                \RecursiveIteratorIterator::SELF_FIRST
            );
            
            foreach($tree as $file){
                $ext = new \SplFileInfo($file);
                
                if($ext->getExtension() === 'js'){
                    
                    $libs .= 'var script = document.createElement("script");
                        script.src = "'.$ext->getPathname().'";
                        document.getElementsByTagName("head")[0].appendChild(script);';
                    
                }
                
            }
            
            return '<script>'.$libs.'</script>';
    
}