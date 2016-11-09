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

class translate extends process {

    public $flux = array();
    
    public function __construct() {
        
        //get array terms
        $technical_terms = config\translate::technical();
        $langage_terms = array();
        
        //merge multiples arrays in one array
        $this->terms = array_merge($technical_terms,$langage_terms);
        
    }
    
    public function flux($flux) {
        
        //get flux to translate
        $this->flux = $flux;
    }
    
    public function translate(){

        $content = $this->flux;
        $pattern = '/__.*__/';
        
        $translated = preg_replace_callback($pattern, function($matches) {
            foreach ($matches as $key=>$value) {
                foreach ($matches as $value) {
                    if(array_key_exists($value, $this->terms)){
                        return $this->terms[$value];
                    }else{
                        warning('translate', 'e001',$value);
                        return $value;
                    }
                }
            }
        }, $content);
        
        return $translated;
        
    }
    
    public function run() {
        
        return $this->translate();
        
    }
    
}
