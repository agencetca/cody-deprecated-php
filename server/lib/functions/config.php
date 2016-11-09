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

function config(){
    
    $args = func_get_args();
    $context = array_shift($args);
    $code = array_shift($args);
    
    if(is_defined('\platform\config\\'.$context.'::'.$code)){
        $message = get_constant('\platform\config\\'.$context.'::'.$code);
    }else if(method_exists('\platform\config\\'.$context, $code)){
        $message = call_user_func_array(array('\platform\config\\'.$context, $code),$args);
    }else{
        $message = 'Unexpected Error : '.$code;
    }
    return $message;
    
}

function get_config_option($namespace,$thing){
    
    $thing = '_'.trim($thing,'_');
    
    $base_namespace = '\\platform\\config\\'.$namespace;
    return get_constant($base_namespace.$thing);
    
}