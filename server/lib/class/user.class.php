<?php

class user extends object {
    
    public $data;
    
    protected $uid;
    protected $session;
    protected $langage;
    protected $firstname;
    protected $lastname;
    protected $email;
    protected $username;
    protected $password;
    protected $company;
    protected $role;
    
    public function __constructor($name){
        
        $this->name = $name;
        $this->data = new \stdClass();
        
    }
    
    public function update(){}
    public function logout(){}
    
}
