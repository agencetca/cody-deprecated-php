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

class client extends object {

    public $type = 'ECMA6 application';
    public $tmp;
    
    protected $communities;
    protected $parent;
    protected $_env_namespace;
    
    private $_libraries;
    
    
    public function __constructor() {
        
        if(func_get_args()) {
            $this->parent = func_get_arg(0);
        }else{
            $this->parent = new platform();
        }
        
        //prepare detection
        $this->_libraries['device_detection'] = new \uagent_info();
        
        //setup client
        $_SESSION['client_name'] = get_constant('config\client::name') ? get_constant('config\client::name') : $_SESSION['platform_name'];
        $this->tmp = array();
        $this->tmp['queued'] = array();
        $this->data = new \stdClass();
        $this->events = new \stdClass();
        
        //detect device used
        $_SESSION['device'] = ($this->what_device()) ? 'computer' : 'mobile';
        
        //Export libs
        $this->export_libs();
        
        //load documentation
        $this->export_documentation();
        
        //load infos
        $this->export_infos();

        //load environment
        $this->_env_namespace = \platform\config\env::_namespace;
        $this->{$this->_env_namespace} = new environment($this);
        
    }
    
    public function what_device(){
        
        return !$this->_libraries['device_detection']->DetectMobileQuick();
        
    }

    public function export_documentation(){
        
        $namespace = 'manual';
        $location = 'client/doc/online';
        $this->files2namespace($location, $_SESSION['client_name'].'.'.$namespace);
        
    }
    
    public function export_infos(){
        
        $namespace = 'info';
        
        $infos = config('client','get_infos');
        
         get_transmission()->stack($_SESSION['client_name'].'.'.$namespace.' = '.json_encode($infos));
    }
    
    public function export_libs(){
        
        foreach (config\client::_libraries($_SESSION['mode']) as $folder) {
            $this->lib2namespace(config('client','_'.$folder), $_SESSION['client_name'] .'.'.  get_constant('\platform\config\client::_libs_namespace'));
        }
        
        //$this->lib2namespace(\platform\config\client::external);
        
        
    }
    
    public function files2namespace($dir,$namespace){
        
            $listDir = array();
            if($handler = opendir($dir))
            {
                while (($sub = readdir($handler)) !== FALSE)
                {
                    if ($sub != "." && $sub != "..")
                    {
                        if(is_file($dir."/".$sub))
                        {
                            $title = explode('.', $sub);
                            $listDir[$title[0]] = get_file($dir."/".$sub);
                        }elseif(is_dir($dir."/".$sub))
                        {
                            $listDir[$sub] = $this->files2namespace($dir."/".$sub); 
                        } 
                    } 
                }    
                closedir($handler); 
            } 

            record_object($namespace,$listDir);
        
    }
    
    public function lib2namespace($path,$namespace = '',$mask = null){
        
        stack_folder($path,$namespace,$mask);
        
    }

    
    public function send(){
        
        $this->export();
        get_transmission()->start();
        
    }
    
}
