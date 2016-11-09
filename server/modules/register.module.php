<?php
namespace platform;


class mregister extends \platform\ldap {
    
    private $data;

    public function __construct($data) {
        get_transmission()->stack('hello');
        get_transmission()->run();
    }
    
    public function verify($data) {
        
        $this->process($data);
    }
    
    public function process($data) {
        $this->stash->record_user($data);
    }
    
    public function create_user() {

    }

}