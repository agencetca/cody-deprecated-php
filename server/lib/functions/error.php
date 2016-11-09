<?php

/* 
 * Copyright (C) 2015 innov24
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function error($context,$code){

    if(\get_constant('\platform\config\error::debug_server')){
        $args = \func_get_args();
        $label = \ucfirst(\strtolower(\get_constant('\platform\config\error::error_label')));
        die($label.' : '.\ucfirst(\strtolower(\call_user_func_array('config',$args))).'<br>');
    }else{
        die();
    }

}

function warning($context,$code){

    if(\get_constant('\platform\config\error::debug_server')){
        $args = \func_get_args();
        \array_shift($args);//BUG
        $label = \ucfirst(\strtolower(\get_constant('\platform\config\error::warning_label')));
        get_transmission()->warn("console.log('".$label." : ".  \ucfirst(\strtolower(\preg_replace("/'/","\\'",\call_user_func_array('config',$args))))."');");
    }

}

function exception_error_handler($severity, $message, $file, $line) {
    if (!(\error_reporting() & $severity)) {
        // Ce code d'erreur n'est pas inclu dans error_reporting
        return;
    }
    throw new \ErrorException($message, 0, $severity, $file, $line);
}

\set_error_handler("exception_error_handler");