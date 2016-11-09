<?php

function init(){

    $init = "<script>(function() {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( 'GET', 'index.php?token=1234', true );
        xmlHttp.send( null );

        xmlHttp.onreadystatechange=function(){
            if (xmlHttp.readyState===4 && xmlHttp.status===200) {

                //Get FLAG ERROR location
                //read and record FLAG ERROR 
                var integrity = true;
                var debug = true;

                function HandleError(e) {
                    Warn(e, 'Error:');
                    CloseConnexion();
                    integrity = false;
                }

                function Warn(e,msg) {
                    if(debug === true) console.log(msg+' :: '+e);
                }

                function CloseConnexion() {
                    window.stop();
                }

                function isArray(a) {
                    if(Object.prototype.toString.call( a ) === '[object Array]' ){
                        return true;
                    }else{
                        return false;
                    }
                }

                function HandleData(data) {
                    if(data === '') {
                        Warn('Empty Data','Cancellation');
                        integrity = false;
                    }
                    Warn(data,'Data:');
                    return data;
                }

                var tmp = [];
                function ArrayLoop(a) {
                    for (var i=0; i < a.length; i++){

                        for (var y=0; y < tmp.length; y++){
                            var nt = tmp.shift(tmp[y]);
                            try{
                                eval(JSON.parse(nt));
                            }catch(e){
                                tmp.push(nt);
                                Warn(e, 'Loop Error');
                            }
                        }
                        
                        if(isArray(a[i])){
                            Warn('is array : '+a[i],'GOOD');
                            ArrayLoop(a[i]);
                        }else{
                            Warn('to eval : '+JSON.parse(a[i]),'GOOD');
                            try{
                                eval(JSON.parse(a[i]));;
                            }catch(e){
                                tmp.push(a[i]);
                                Warn(e, 'Loop Error');
                            }
                        }
                    }
                }

                //record data as STACK
                var stack = HandleData(xmlHttp.responseText);
                if(!integrity) return;

                //try to decode STACK
                //on failure, handle error
                try{
                    stack = JSON.parse(stack);
                    Warn('stack has been parsed!','GOOD');
                }catch(e){
                    Warn('stack has NOT been parsed!','WRONG');
                    Warn(xmlHttp.responseText, 'Data:');
                    HandleError(e);
                    if(!integrity) return;
                }

                //Check if data is an array
                //on failure, handle error
                if(!isArray(stack)){
                    HandleError('Data is not Array.');
                }else{
                    Warn('data is Array!','GOOD');
                }
                
                //SELECT THE 2 LAST ELEMENTS
                last = [];
                last.push(stack.pop());
                last.unshift(stack.pop());
                
                //Loop on STACK (decode and eval)
                //on Errors, ignore or warn (depends on : FLAG ERROR state)
                ArrayLoop(stack);
                for (var z=0; z < tmp.length; z++){
                    Warn(tmp[z], 'Unsuccessful');
                }

                //DO LAST
                for (var l=0; l < last.length; l++){
                    console.log('Loading Template : ' + JSON.parse(last[l]));
                    eval(JSON.parse(last[l]));
                }

                //on success close connection
                CloseConnexion();

            };
        };
    })();</script>";
    
    return $init;
}
