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

function record_object($namespace,$object,$inverse = 0){

    
    if(!$inverse){
        get24('transmission')->stack($namespace.' = '.json_encode($object));
    }else{
        get24('transmission')->stackU($namespace.' = '.json_encode($object));
    }

}

function empty_object(){
    return new stdClass();
}