<?php

abstract class process {
    
    public $name = null;
    public $identifier;
    public $start_time;
    public $stop_time;
    public $duration;
    public $args;
    public $result;
    
    public function __construct(){
        
        $args = func_get_args();
        $this->identifier = time();
        $this->args = $args;
        if(method_exists($this, '__constructor')){
            $this->__constructor($args);
        }
        
    }
    
    public function start(){
        $this->start_time = microtime_float();
        $this->result = $this->run();
        $this->stop();
        $this->duration = $this->stop_time - $this->start_time;
        return true;
    }
    
    public function stop(){
        $this->stop_time = microtime_float();
    }
    
    abstract public function run();
    
}
