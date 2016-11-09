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

/**
 * Description
 *
 * @author Guillaume Pierre
 */


class platform {
    
    public $type = 'server';
    
    public function __constructor() {
        
        //init platform
        $init = new init();
        $init->start();
        
        if(set24('mode') === 'public'){
            set24('user',new user('guest'));
        }
        
        //setup platform
        set_24('platform_name',get_constant('\platform\config\platform::name'));
        
    }
    
    public function build_client() {
    }
    
    public function send_client() {
        set_transmission(new send());
        get_transmission()->stack('var init = __template__;');
        get_transmission()->stack('__singleton__.Loading.template(init);');
        get_transmission()->run();
    }
    
}
