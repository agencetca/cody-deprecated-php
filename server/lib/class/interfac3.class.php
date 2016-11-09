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

class interfac3 extends slotable {
    
    public $type = 'interfaces';
    
    public function __constructor() {
        
        $this->parent = func_get_arg(0);
        $this->name = func_get_arg(1);
        $this->export_modules();
    }
    
    public function export_modules() {
        
        $parent = $this->parent->get('parent');
        
        //record the "menu interface" of object client
        //$interfaces_object = $this->parent->get(\get_constant('\platform\config\interfac3::_namespace'));
        
        foreach (get_constant('\platform\config\interfac3::_i_'.$this->name) as $module) {

            if(module_exist($module)){
                $module_path = get_module_path($module);
                $parent->lib2namespace($module_path, $parent->name.'.'.get_constant('\platform\config\interfac3::_module_namespace'),build_extension(get_constant('\platform\config\interfac3::_valid_module_extension'),1));
                //update the "menu interface" of object client
                //$interfaces_object->{$this->name}->{$module} = get_module_description($module);
            }else{
                //update the "menu interface" of object client
                //$interfaces_object->{$this->name}->{$module} = get_constant('\platform\config\interfac3::_no_module_description_msg');
            }
            
//            if($this->slots > $this->slots_max){
//                throw new \Exception;
//            }else{
//                $this->slots_number += $module->slots_number;
//            }
        }
        
    }
    
}