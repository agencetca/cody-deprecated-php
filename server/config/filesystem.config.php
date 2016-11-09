<?php
namespace config;

class filesystem {
    
    public static function e001($folder){
        if(is_string($folder)){
            return 'folder "' . $folder . '" is empty, command has aborted.';
        }else{
            return 'supplied entry "' . json_encode($folder) . '" is NOT a folder...';
        }
    }
    
}