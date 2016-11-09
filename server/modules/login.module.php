<?php
namespace platform;

class mlogin  extends \platform\ldap{

    public function __construct($data) {
        
        //new ldap
        $this->stash = new ldap();
        $this->verify($data);
        
    }
    
    private function verify($data) { 
        //is the cn exist
        $this->user = $this->stash->get_member($data->email);
        $_SESSION['user'] = $this->user;
        
       if($this->user['userpassword'][0]){
 
            //is the mode de passe good?
             //crypt 'innov24' with expected password
            
        }
        
        $_SESSION['mode'] = $data->role;
        
        
        $this->process();
        
    }
    
    private function process() {
        
        $user = new user('plow');
        $template = new template();
    
        //get environment

        //send environment
        get_transmission()->stack(json_encode($user));
        get_transmission()->stack(json_encode($template));
        get_transmission()->stack('codie.environment.'.  file_get_contents('client/templates/computer/journalist.template.js'));
        get_transmission()->run();
    }
    
    public function log_user() {}

}