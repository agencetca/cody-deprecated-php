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

function get_folder($address){
    
    if(\is_folder_exist($address)){
        return \scan($address);
    }else{
        return false;
    }
    
}

function is_folder_exist($address){
    
    if(\is_dir($address)){
        return true;
    }else{
        return false;
    }
    
}