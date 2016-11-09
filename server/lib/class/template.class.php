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

class template extends environment {
    
    public $type;
    private $address;

    public function __constructor() {
        
        //setup template
        $this->type = \platform\config\template::_type;
        $this->load_template();
        
    }
    
    public function add($component,$address){}
    public function maj($component,$address){}
    public function del($address){}
    

    public function load_template(){
        
        $this->set_template($_SESSION['device'],$_SESSION['mode']);

            $parent = $this->parent->get('parent');
            $parent->lib2namespace(\platform\config\template::_templates_folder.'/'.$this->address, $_SESSION['client_name'].'.'.$parent->get('_env_namespace'),$_SESSION['mode'].build_extension(get_constant('\platform\config\template::_valid_template_extension'),1));

    }
    
    public function set_template($template){
        
        $check = $this->device_exists($_SESSION['device']);
        
        if($check !== 1){
            warning('env','e001',$_SESSION['device'],$check);
            warning('env','Fallback to "computer"');
            $_SESSION['device'] = 'computer';
        }
        
        $check2 = $this->template_exists($_SESSION['device'],$template);
            
        if($check2 !== 1){

            warning('env','There is no template "'. $template .'" for "' . $_SESSION['device'] . '". Possible choices are : "' . $check2 . '"');
            warning('env','Fallback to "public"');
            $template = 'public';
        }

        $this->address = $_SESSION['device'];
    }
    
    public function template_exists($template){
        
        $array = scan('client/templates/'.$_SESSION['device']);
        
        foreach ($array as &$value) {
            $reference = $value;
            $reference = explode('.', $reference);
            $value = array_shift($reference);
        }
        
        return (in_array($template,array_filter($array))) ? 1 : implode('" or "',array_filter($array));
        
    }
    
    public function device_exists(){
        
        $array = scan('client/templates');
        
        foreach ($array as &$value) {
            $reference = $value;
            $reference = explode('.', $reference);
            $value = array_shift($reference);
        }
        return (in_array($_SESSION['device'],array_filter($array))) ? 1 : implode('" or "',array_filter($array));
        
    }
    
}