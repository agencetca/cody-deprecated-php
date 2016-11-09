<?php
namespace config;

class env {
    
    const _namespace = 'environment';
    
    public static function e001($device,$check){
        return 'There is no device "' . $device . '". Possible choices are : "' . $check . '"';
    }
    
}