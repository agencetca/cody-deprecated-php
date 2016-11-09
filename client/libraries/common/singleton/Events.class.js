Events = new function() {

    this.fire = function(e,element){
        
        var array = element.origin;
        var db = __events__.EventListeners;
        var db2 = __events__.EventStorage;
        
        for(var i in array){
            if(array.hasOwnProperty(i)){
                var ev = db.get(array[i]+'::'+e);
                
                if(ev){
                    for(var oo in ev){
                        if(ev.hasOwnProperty(oo)){
                            
                            for(var aa in ev[oo]){
                                if(ev[oo].hasOwnProperty(aa)){
                                    var ev2 = db2.get(array[i]+'::'+e);
                                    if(ev2.detail.stop === false){
                                        ev2.detail['date'] = new Date();
                                        ev2.detail['element'] = element;
                                        ev[oo][aa](ev2);
                                    }
                                }
                            }
                            
                            
                        }
                    }
                }
            }
        }
        
    };
    
    this.listen = function(e,func,priority){
        
        if(!priority){ priority = 2;};
        if(priority > 3){ priority = 3;};
        if(priority < 0){ priority = 0;};
        
        var db = __events__.EventListeners;
        var cont = null;
        
        if(e.match(/\*/)){
            
            e = e.replace(/\*/g,'(.*)');
            var db2 = __events__.EventStorage;
            cont = db2.search(e);
            
        }else{
            cont = [];
            cont.push(e);
        }
        
        for(var itm in cont){
            if(cont.hasOwnProperty(itm)){
                var tab = db.get(cont[itm]);
                
                if(tab){
                    tab[priority].push(func);
                    db.set(cont[itm],tab);
                }else{
                    var array = [];
                    array.push([]);//CRITICAL
                    array.push([]);//HIGH
                    array.push([]);//MEDIUM
                    array.push([]);//LOW
                    array[priority].push(func);
                    db.set(cont[itm],array);
                }
            }
        }
        
    };
    
};