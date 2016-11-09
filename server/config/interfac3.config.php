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

namespace config;

class interfac3 {
    
    const _namespace = 'interface';
    
    const _module_namespace = 'modules';
    const _modules_directory = 'client/modules';
    const _valid_description_file = 'description.txt';
    const _no_module_description_msg = 'no description yet...';
    const _valid_module_extension = '.module.js';
    
    const e001 = 'This mode has NO access role;';
    public static function e002 ($interface_name){
        return 'Interface '.$interface_name . ' is referenced in access list, but does\'nt exist...';
    }
    
    
    //Access list
    /**
     * @todo if one entry in the array is empty (like '') platform fails
     */
    const _a_public = array(
        'common','registering','login'
    );
    
    const _a_journalist = array(
        'common','nav'
    );
    
    const _a_communicator = array(
        'common','nav'
    );
    
    const _a_leader = array(
        'common','nav'
    );
    
    const _a_admin = array(
        'common'
    );
    
    
    //Interface list
    
    const _i_common = array(
        
        'logo'
        
    );
    
    const _i_registering = array(
        
        'register'
        
    );
    
    const _i_login = array(
        
        'login'
        
    );
    
    const _i_nav = array(
        
        'navi','profil_sum'
        
    );
         
}