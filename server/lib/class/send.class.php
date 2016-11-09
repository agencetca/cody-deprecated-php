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

class send extends process {

    public $stack = array();
    public $warnings = array();
    
    public function __constructor(){
        //prepare translation
        $this->translate = new translate($this);
    }
    
    public function stack() {
        
        $args = \func_get_args();
        foreach ($args as $value) {
            \array_push($this->stack, $value);
        }
    }
    
    public function stackU() {
        
        $args = \func_get_args();
        foreach ($args as $value) {
            \array_unshift($this->stack, $value);
        }
    }
    
    public function merge(array $array) {
        $this->stack = array_merge($this->stack,$array);
    }
    
    public function warn() {
        
        $args = \func_get_args();
        foreach ($args as $value) {
            \array_push($this->warnings, $value);
        }
    }
    
    public function run() {
        
        //Read the stack
        $stack = $this->stack;
        
        //Translate and Encode each entry in stack
        foreach ($stack as &$data) {
            $this->translate->flux = $data;
            $this->translate->start();
            $translated = $this->translate->result;
            
            try{
                \json_decode($translated);
            }catch(Exception $e){/*do nothing*/}
            
            if(!(json_last_error() == JSON_ERROR_NONE)){
                $translated = \json_encode($translated);
            }
            
            $ref = $translated;
            $data = $ref;
        }
        
        //Read the warnings
        $warnings = $this->warnings;
        
        //Encode the warnings
        foreach ($warnings as &$entry) {
            $warn = \json_encode($entry);
            $entry = $warn;
        }
        
        //Merge warnings and stack
        $stack = array_merge($stack,$warnings);
        
        //Encode the whole stack
        $package = \json_encode($stack);
    
        //Send the stack
        echo $package;
        
    }
    
}
