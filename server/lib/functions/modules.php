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

function get_module_path($module_name){

    if(\module_exist($module_name)){
        return get_module_dir().'/'.$module_name;
    }else{
        return false;
    }
    
}

function module_exist($module_name){
    

    if(is_dir(get_module_dir().'/'.$module_name)){
        return true;
    }else{
        return false;
    }
    
}

function get_module_dir(){
    //get module directory
    $module_dir = \get_constant('platform\config\interfac3::_modules_directory');
    return $module_dir;
}

function get_module_description($module_name){
    
    if(description_exists($module_name)){
        return get_file(get_module_path($module_name).'/'.get_constant('platform\config\interfac3::_valid_description_file'));
    }else{
        $error_msg = get_constant('\platform\config\interfac3::_no_module_description_msg');
        return $error_msg;
    }
}

function description_exists($module_name){
    
    return is_file_exist(get_module_path($module_name).'/'.get_constant('platform\config\interfac3::_valid_description_file'));
    
}