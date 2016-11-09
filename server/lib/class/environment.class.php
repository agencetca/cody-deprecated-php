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

class environment extends object {
    
    //public $data;
    //public $events;
    
    protected $parent;
    
    public function __constructor() {

        if(func_get_args()) {
            $this->parent = func_get_arg(0);
        }else{
            $this->parent = new client();
        }
        
        //record a "menu interface" in object client
        //$this->_namespace = \get_constant('\platform\config\interfac3::_namespace');
        //$this->{$this->_namespace} = empty_object();
        
        //load template
        $this->_template_namespace = \get_constant('\platform\config\template::_namespace');
        $this->{$this->_template_namespace} = new template($this);
        
        //load components
        $this->load_components();
        
        //get array of allowed interfaces, depends on role (mode)
        $access_list = '\platform\config\interfac3::_a_'.$_SESSION['mode'];
        if(is_defined($access_list)){
            $allowed_interfaces = \get_constant($access_list);
        }else{
            \error('interfac3','e001');
        }

        foreach ($allowed_interfaces as $interface) {
            
            //record a sub object for "menu interface" in object client
            //$this->{$this->_namespace}->{$interface} = empty_object();
                    
            //if interface exists, generate interface
            if(is_defined('\platform\config\interfac3::_i_'.$interface)){
                new interfac3($this,$interface);
            }else{
                \warning('interfac3','e002',$interface);
            }
        }
        
    }
    
    public function load_components(){
        $this->parent->lib2namespace(get_constant('\platform\config\components::_location'), $_SESSION['client_name'].'.'.get_constant('\platform\config\components::_namespace'));
    }
    

    

    

    
}
