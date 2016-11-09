<?php
namespace config;

class client {
    
    const name = 'codie';
    const _default_langage = 'fr';
    
    const infos = array(
        'code name' => 'Codie',
        'code version' => '0.02',
        'editor name' => 'TCA',
        'team (editorial)' => array('Eliane Kan','Erick Haehnsen','Guillaume Pierre'),
        'team (technical)' => array('Guillaume Pierre'),
        'repository' => 'https://guillaumeferron_@bitbucket.org/guillaumeferron_/i24.git',
        'licence' => 'GPL (General Public Licence)'
    );
    
    public static function get_infos(){
        
        $infos = new \stdClass();
        
        foreach (self::infos as $key => $value) {
            $infos->{is_string($key) ? ucwords(strtolower($key)) : $key} = $value;
        }
        
        return $infos;
        
    }
    
    //cleitn side paths
    const _libs_namespace = 'libraries';
    const _common = 'client/libraries/common';
    const _private = 'client/libraries/private';
    const _admin = 'client/libraries/admin';
    const _external = 'client/libraries/external';
    
    const communities = array('journalist','communicator','leader');
    
    public static function _libraries($mode){
        
        if(in_array($mode, self::communities)){
            $mode = 'private';
        }

        switch ($mode) {
            case 'public':
                $answer = array('common');
                break;
            
            case 'private':
                $answer = array('common','private');
                break;
            
            case 'admin':
                $answer = array('common','private','admin');
                break;

            default:
                break;
        }
        
        //var_dump($answer);
        return $answer;
    }
    
}