(function() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "index.php?token=1234", true );
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
            
            function ArrayLoop(a) {
                for (var i=0; i < a.length; i++){
                    if(isArray(a[i])){
                        Warn('is array : '+a[i],'GOOD');
                        ArrayLoop(a[i]);
                    }else{
                        Warn('to eval : '+JSON.parse(a[i]),'GOOD');
                        try{
                            eval(JSON.parse(a[i]));;
                        }catch(e){
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
            
            //Loop on STACK (decode and eval)
            //on Errors, ignore or warn (depends on : FLAG ERROR state)
            ArrayLoop(stack);
            
            //on success close connection
            CloseConnexion();

        };
    };
})();
