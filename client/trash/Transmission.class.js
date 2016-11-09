Transmission = new function() {

        this._init = function() {
		
            var xhr = null;

            if (window.XMLHttpRequest || window.ActiveXObject) {
                if (window.ActiveXObject) {
                    try {
                        xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch(e) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                } else {
                    xhr = new XMLHttpRequest(); 
                }
            } else {
                alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
                return null;
            }
            
            return xhr;
                
	};
        
//        this.get = function(action,data,callback) {};
        
        this.post = function(action,data,callback) {
            
            try{
                JSON.parse(data);
            }catch(e){
                data = JSON.stringify(data);
            }
            
            if(!action) {action = null;}
            action = JSON.stringify(action);
            
            var xhr = this._init();
            xhr.open("POST", "index.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("action="+action+"&&data="+data);

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                    
                    function process(data){
                        if(data.match(/^reload;?$/)) { location.reload();return;};
                    }
                    
                    function auto(data){
                        if(typeof data === 'string'){
                            
                            document.write(data);
                            
                        }else if(typeof data === 'object'){
                            
                            if(data.auto){
                                process(data.auto);
                            }
                            
                            if(callback) {callback(data);}
                        
                        }
                        
                        
                            
                        
                        
                        
                    }
                    
                    (function (data){
                        var d;
                        try{
                            d = JSON.parse(data);
                                auto(d);
                            }catch(e){
                                try{
                                    auto(data);
                                }catch(e){console.log('Error while parsing server answer.');}
                            }
                    })(xhr.responseText);
                    

                };
            };
            
        };

}
