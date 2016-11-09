<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function create_DOM(){
    
    $name = config\platform::name;
    $charset = config\platform::charset;
    
    //get init script location
    $init_script_location = 'client/init.js';
    //get init script
    $init_script = init();
    
    $dom = new DOMDocument('1.0', 'utf-8');
    $dom->loadHTML('
        <!DOCTYPE html>
        <html>
            <head>
                <title>'. $name.'</title>
                <meta charset="'.$charset.'">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                '.$init_script.'
            </body>
        </html>
    ');
    
    ob_start();
    echo add_external_libs();
    echo $dom->saveHTML($dom->getElementsByTagName('!DOCTYPE html')->item(0));
    ob_end_flush();
}