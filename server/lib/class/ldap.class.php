<?php
namespace platform;

class ldap {
    
    protected $bind;
    protected $ldap_server = 'ldapi://';
    protected $admin_user = 'cn=admin';
    protected $admin_password = 'TIGl4vieestr00t';
    protected $base_dn = 'dc='.\platform\config\main::name;
    protected $members_dn = 'ou=members,dc='.\platform\config\main::name;
    protected $awaiting = 'ou=awaiting,dc='.\platform\config\main::name;
    protected $journalists = 'cn=journalists,ou=members,dc='.\platform\config\main::name;//first system CN in members
    protected $communicators = 'cn=communicators,ou=members,dc='.\platform\config\main::name;//second system CN in members
    protected $leaders = 'cn=leaders,ou=members,dc='.\platform\config\main::name;//third system CN in members

    protected function __construct() {

        $this->code = new code();
        $this->open();
        return $this->bind;
        

    }

    protected function open(){

        $bind = \ldap_connect($this->ldap_server);
        \ldap_set_option($this->bind, LDAP_OPT_PROTOCOL_VERSION, 3);
        \ldap_bind($bind, $this->admin_user . ',' . $this->base_dn, $this->admin_password);
        $this->bind = $bind;
    }
    
    protected function close(){

            ldap_close($this->bind);

    }
    
    public function get($obj){
        $result = $this->search($obj);
        return \ldap_get_entries($this->bind, $result);
    }
    
    private function get_last_uid(){
        
        $result = $this->get_all_members();
        $last_entry = end($result);
        $last_uid = (isset($last_entry['uid'][0])) ? $last_entry['uid'][0] : 1;
        return $last_uid;
    }
    
    protected function search($obj){
        $dn = $obj->dn;
        $filter = $obj->filter;
        return ldap_search ($this->bind, $dn , $filter);
    }
    
    public function set($key,$val){
        ldap_add ($this->bind , $key , $val );
    }
    
    protected function format_pass($password){
        return password_hash($password, PASSWORD_DEFAULT);
    }
    
    protected function verify_pass($password,$hash){
        if(password_verify($password, $hash)){
            return true;
        }else{
            throw new \Exception(\config\errors::e301);
        }
    }
    
    protected function get_all_members(){
        $obj = new \stdClass();
        $obj->objectclass = array('person','inetOrgPerson');
        $obj->dn = $this->members_dn;
        $obj->filter = 'cn=*';
        $result = $this->get($obj);
        return $this->get($obj);
    }
    
    protected function get_member($cn){
        $obj = new \stdClass();
        $obj->objectclass = array('person','inetOrgPerson');
        $obj->dn = $this->members_dn;
        $obj->filter = 'cn='.$cn;
        $result = $this->get($obj);
        if($this->check_entry_unique($result)){
            return $this->get($obj);
        }
        
    }
    
    protected function all_good($result,$password){
        if($this->check_entry_unique($result)){
            if($this->check_user_request($result) && $this->check_password_request($result)){
                $pass_ref = $result[0]['userpassword'][0];
                return $this->verify_pass($password, $pass_ref);
            }else{
                throw new \Exception(\config\errors::e302);
            }
        }elseif($this->count_entries($result) === 0){
                throw new \Exception(\config\errors::e303);
        }elseif($this->count_entries($result) > 1){
                throw new \Exception(\config\errors::e304);
        }
    }
    
    protected function user_exist($cn){
        
        if($this->user_valid($cn)){
            return true;
        }elseif($this->user_wait($cn)){
            return true;
        }else{
            return false;
        }
    }
    
    protected function validate_user($cn){
        if($this->user_exist($cn) && $this->user_wait($cn)){
            
            
            
        }else{
            throw new \Exception(\config\errors::e200);
        }
    }
    
    protected function user_valid($cn){
        $obj = new \stdClass();
        $obj->dn = $this->members_dn;
        $obj->filter = 'cn='.$cn;
        $result = $this->get($obj);
        unset($obj);
        if($result['count'] === 1){
            return true;
        }else{
            return false;
        }
        
    }
    
    protected function user_wait($cn){
        $obj = new \stdClass();
        $obj->dn = $this->awaiting;
        $obj->filter = 'cn='.$cn;
        $result = $this->get($obj);
        unset($obj);
        if($result['count'] === 1){
            return true;
        }else{
            return false;
        }
        
    }
    
    protected function count_entries($array){
        return $array['count'];
    }
    
    protected function check_entry_unique($array){
        if($this->count_entries($array) === 1){
            return true;
        }else{
            return false;
        }
    }
    
    protected function check_user_request($array){
        if($array[0]['objectclass'][0] === 'person'
                    && $array[0]['objectclass'][1] === 'inetOrgPerson'
                    && isset($array[0]['uid'][0])){
            return true;
        }else{
            return false;
        }
    }
    
    protected function check_password_request($array){
        if($array[0]['userpassword'][0]){
            return true;
        }else{
            return false;
        }
    }
    
    private function new_uid() {
        return $this->get_last_uid() + 1;
    }
    
    protected function record_user(\StdClass $data) {
        
        if($data->unicity !== true){
            throw new \Exception(\config\errors::e307);
        }
                
        $uid = $this->new_uid();
        
        $entry = array();
        $entry["objectclass"] = $data->objectclass;
        $entry["ou"] = $data->ou;
        $entry["cn"] = $data->cn;
        $entry["sn"] = $data->sn;
        
        if($entry["ou"] === 'journalist'){
            $ou = 'awaiting';
        }else{
            $entry["uid"] = $uid;
            $ou = $entry["ou"].'s';
        }
        
        $user = new user($entry,$ou);
        $this->user = $user->get();

        $entry["description"] = $this->code->encode($this->user);
        
        if(property_exists($this, $ou)){
            $user_dn = 'cn='.$entry["cn"].','.$this->{$ou};
            $this->set($user_dn,$entry);
        }
        
        if($this->user_exist($data->cn) && $this->user_valid($data->cn)){
            
            //generate token
            $length = 78;
            $token = \bin2hex(\openssl_random_pseudo_bytes($length));
            
            //Send email (and password stuffs)
            
            $to = $entry["cn"];
            $subject = \config\mails::m001;
            
            $message = \config\mails::m002.'\<br>'.'<a href="https://dev.innov24/index.php?action=finalize_registration&token='.$token.'">click me</a>';
            
            $headers = "From: " . \config\mails::m0 . "\r\n";
            $headers .= "Reply-To: " . \config\mails::m0 . "\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

            mail('test@localhost',$subject,$message);
            return true;
        }elseif($this->user_exist($data->cn) && $this->user_wait($data->cn)){
            throw new \Exception(\config\errors::e305);//Awaiting validation
        }else{
            throw new \Exception(\config\errors::e303);//Unexpected error
        }
        
    }
    
    protected function setf($key,$val){}
    public function maj($key,$val){}
    public function del($key){}

}