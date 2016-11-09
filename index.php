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

session_start();

//Error management
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'server/lib/functions/sgetters.php';

require_once 'server/config/platform.config.php';
require_once 'server/config/client.config.php';
require_once 'server/config/error.config.php';
require_once('server/config/translate.config.php');
require_once 'server/config/template.config.php';

require_once 'server/lib/functions/config.php';
require_once 'server/lib/functions/constant.php';
require_once 'server/lib/functions/dom.php';
require_once 'server/lib/functions/error.php';
require_once 'server/lib/functions/extensions.php';
require_once 'server/lib/functions/files.php';
require_once 'server/lib/functions/filter.php';
require_once 'server/lib/functions/folder.php';
require_once 'server/lib/functions/init.php';
require_once 'server/lib/functions/libraries.php';
require_once 'server/lib/functions/microtime.php';
require_once 'server/lib/functions/modules.php';
require_once 'server/lib/functions/namespace.php';
require_once 'server/lib/functions/scan.php';
require_once 'server/lib/functions/sgetters.php';
require_once 'server/lib/functions/slot.php';

require_once 'server/lib/class/object.abstract.php';
require_once 'server/lib/class/process.abstract.php';

require_once 'server/lib/class/slotready.class.php';
require_once 'server/lib/class/slotable.class.php';

require_once 'server/lib/class/environment.class.php';
require_once 'server/lib/class/init.class.php';
require_once 'server/lib/class/interfac3.class.php';
require_once 'server/lib/class/ldap.class.php';
require_once 'server/lib/class/platform.class.php';
require_once 'server/lib/class/send.class.php';
require_once 'server/lib/class/template.class.php';
//require_once 'server/lib/class/translate.class.php';//BUG
require_once 'server/lib/class/user.class.php';
require_once 'server/modules/login.module.php';

require_once 'server/lib/functions/require.php';
require_once 'server/lib/class/client.class.php';

requireX('krumo/class.krumo.php');
requireX('mobileesp-master/PHP/mdetect.php');

if(get24('init')){
    
        set24('transmission',new send());
        set24('platform',new platform());
        set24('client',new client());
        set24('user',new user());
        set24('mode','public');
        
        get24('platform')->build_client();
        get24('platform')->send_client();

}elseif(get24('init') && \filter_input(\INPUT_POST, 'action') && \filter_input(\INPUT_POST, 'data')){    
	
        $cl = \filter_input(\INPUT_POST, 'action');
        $data = \filter_input(\INPUT_POST, 'data');
        
        if (class_exists($cl)) {
            new $cl(json_decode($data));
        }else{
            
            if(is_file_exist('server/modules/'.json_decode($cl).'.module.php')){
                if (class_exists('m'.json_decode($cl))) {
                    $cl = 'm'.json_decode($cl);
                    new $cl(json_decode($data));
                }
            }else{
                
                error('error','e501');
            }
        }
        
}else{

        set24('init',true);
        create_DOM();



}
