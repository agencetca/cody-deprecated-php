<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function get24($namespace){
    
    if(isset($_SESSION[$namespace])){
        return $_SESSION[$namespace];
    }
    
}

function set24($namespace,$value){
    
    $_SESSION[$namespace] = $value;
    
}
