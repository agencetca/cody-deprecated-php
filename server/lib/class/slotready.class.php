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
 * Accept slottable element
 *
 * @author Guillaume Pierre
 */

class slotready extends object {
    
    public $slots;
    
    protected $components;
    protected $slots_max;
    
    public function import(Array $components) {
        
        $this->components = $components;
        
        foreach ($this->components as $component) {

            if($component->slot_address === null) { return; }
            
            if($this->slots_number > $this->slots_max){
                throw new \Exception;
            }else{
                $this->slots_number += 1;
            }
        }
        
    }
    
//    abstract public function add($component,$address);
//    abstract public function maj($component,$address);
//    abstract public function del($address);
    
    public function determine_slots_max(){
        //parse $this->config, count slots avalaible
    }
    
}