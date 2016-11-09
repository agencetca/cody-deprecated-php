Loading = new function() {

	this.template = function (template) {
            
            if(!template){
                return;
            }
            
            var template = __lib__.factories.BuildHTML(template);
            var body = document.getElementsByTagName('body')[0];
            body.innerHTML = '';
            body.appendChild(template);

            for(var y in __platform__.tmp.queued){
                if(__platform__.tmp.queued.hasOwnProperty(y)){  
                    
                    var key = __platform__.tmp.queued[y][0];
                    var a = __platform__.tmp.queued[y][1];
                    var b = __platform__.tmp.queued[y][2];
                    var c = __platform__.tmp.queued[y][3];
                    var d = __platform__.tmp.queued[y][4];
                    
                    if(key === 'design'){

                        if(typeof c === 'function'){
                            a[b] = c(d);
                        }else{
                            a[b] = c;
                        }
                    }else if(key === 'control'){
  
                        c.control(a,b);
                        c(a,'methods');
                        
                    }else if(key === 'load'){
                        try{
                            a(b);
                        }catch(e){/*do nothing*/}
                    }
                    
                }
            }
            
	};

};
