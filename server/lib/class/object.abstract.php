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

/**
 * Description
 *
 * @author Guillaume Pierre
 */

abstract class object {
    
    public $name;
    
    public function __construct(){
        
        $args = func_get_args();
        if(method_exists($this, '__constructor')){
            call_user_func_array(array($this, '__constructor'),$args);
        }
        
    }
    
    public function export($prefix,$position = 1){
        
        record_object($_SESSION[$this->name],$this,$position);
        
    }
    
    public function get($thing){

        return $this->{$thing};
    }
    
    public function set($thing,$content){
        $this->{$thing} = $content;
    }
    
}
