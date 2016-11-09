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

class error {
    
         const debug_server = 1;
         
         const warning_label = 'warning';
         const error_label = 'error';
         
             const e200 = '200 Nothing to do';
    
            //Auth/Reg
            const e301 = '301 Wrong password';
            const e302 = '302 Bad Request';
            const e303 = '303 Null';
            const e304 = '304 Too much results';
            const e305 = '305 Awaiting validation';
            const e306 = '306 User already registered';//warning security
            const e307 = '307 Unicity has not been checked, then LDAP cowardly refuse to process the registration';//warning security

            const e404 = '404 Environment not found';
            const e414 = '414 Variable is missing';

            const e500 = 'Undetermined error';
            //const e501 = 'Class does not exist';
            //const e501 = 'There is no module to handle this request.';
            const e501 = 'There is no module to handle this request/Class does not exist';
         
}