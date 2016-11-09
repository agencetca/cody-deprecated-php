<?php
namespace config;

class translate {
    
    public static function e001($value){
        return 'Unrecognized value "'.$value.'" has NOT been translated';
    }
    
    public static function technical(){
        $terms = array(
            
            '__platform__' => 'codie',
            '__lib__' => 'codie.libraries',
            '__events__' => 'codie.events',
            '__components__' => 'codie.components',
            '__data__' => 'codie.data',
            '__modules__' => 'codie.modules',
            '__factories__' => 'codie.libraries.factories',
            '__singleton__' => 'codie.libraries.singleton',
            '__template__' => 'codie.environment.template'
            
        );
        return $terms;
    }
    
    public static function fr(){
        $terms = array(
            
            '__bonjour__' => 'hello',
            '__le monde__' => 'world'
            
        );
        return $terms;
    }
    
}