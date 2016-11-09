BuildHTML = function(obj,prefix){
    var DESIGN = obj.design;
    var METHODS = obj.methods;
    var EVENTS = obj.events;
    var base = {};
    base.name = obj.template || obj.module || obj.name;
    base.id = obj.structure.id;
    base.configure = obj.structure.configure;
    base.design = obj.structure.design;
    base.methods = obj.structure.methods;
    base.events = obj.structure.events;
    base.element = obj.structure.element;
    var loop = function(o,callback,recursive) {
        if(!o) return;
        for(var i in o) {
            if(o.hasOwnProperty(i)) {
                if(callback) {
                    callback(i,o[i],o);
                };
                if(typeof o[i] === 'object') {
                    if(recursive === true){
                        loop(o[i],callback,true);
                    };
                };
            };
        };
    };
    var record = function(element) {
        __components__[element.path] = element;
    };
    var db = function(o) {
        if(!o.element.database) {
            if(!__data__.components){ 
                __data__.components = {};
            }; //TODO : create __data__.components in INIT
            o.element.database = new __lib__.singleton.Storage();
            __data__.components[o.element.path] = o.element.database;
            o.element.set = function(key,value) {
                this.database.set(key,value);
                __data__.components[o.element.path] = o.element.database;
            };
            o.element.get = function(key) {
                    return this.database.get(key);
                    __data__.components[o.element.path] = o.element.database;
            };
            if(!o.element.methods) {o.element.methods = [];};
            o.element.methods.push('set');
            o.element.methods.push('get');
        }else{
            __data__.components[o.name] = o.element.database;//SUPERFLU
        };
    };
    var configure = function(o){
        id(o);
        db(o);
        add_origin(o);
        config(o,'design');
        if(o.control){
            config(o,'control');
            config(o,'methods');
            o.methods_done === true;
        }else{
            config(o,'methods');
            o.methods_done === true;
        }
        
        config(o,'events');
        record_event.ancestor(o);
        
        if(o.configure){
            loop(o.configure,function(a,b){
                config.options(o,a,b);
            });
        };
    };
    
    var id = function(o){
        
        if(o.id === true){
            
            o.element.setAttribute('id',__lib__.singleton.IntStorage.create('id',o.element.path));

        };
        
    };
    
    var config = function(o,key){
        
        var _config = function(o,key){
            if(typeof o[key] === 'string'){
                o[key] = [o[key]];
            };

            loop(o[key],function(a,b){
            
                config[key](o,b);

            });
        };
        
        try{
            _config(o,key);
        }catch(e){
            alert('config loop '+e);
        };
    };
    
    config.design = function(o,ref){
        loop(DESIGN[ref],function(x,z){
            
            //if(x.match(/^\$/)){
                //appliquer ici patch pour issue #21
            //}
            
            if(x.match(/\*$/)){
                x = x.replace(/\*$/,'');
                delayed('design',o.element.style,x,z,o.element);
                
            }else{
            
                if(typeof z === 'function'){
                    try{
                        o.element.style[x] = z(o.element);
                    }catch(e){
                        console.log('Design error, on '+o.element.path+' '+e);
                    }
                }else{
                    o.element.style[x] = z;
                }
            }
        });
    };
    
    config.options = function(a,b,c){
       
       switch(b){
           
            case 'text':
                if('textContent' in a.element){
                    a.element.textContent = c;
                }else{
                    a.element.innerText = c;
                };
            break;
            
            default:
                a.element[b] = c;
            break;
       };
    };
    
    config.methods = function(o,ref){

        if(!o.element.methods) { o.element.methods = []; }

        if(METHODS){
            loop(METHODS,function(x,z){

                    if(typeof z !== 'object' && typeof z !== 'function'){
                        o.element.set(x,z);
                    };
            });
        }
        
        if(METHODS && METHODS[ref]){
            loop(METHODS[ref],function(x,z){
                
                    if(o.methods_done === true){return;};

                    if(typeof z === 'function'){
                        if(x === 'onload' || x === '_onload'){
                            delayed('load',z,o.element);
                        }else{
                            
                            if(o.control){
                                function addParameter(func, argIndex, argValue) {
                                    return function() {
                                        arguments[argIndex] = argValue;
                                        arguments.length = Math.max(arguments.length, argIndex);
                                        return func.apply(this, arguments);
                                    };
                                }

                                z = addParameter(z, 0, o.control);
                            }

                            if(x.match(/^on/)){
                                var opt = x.replace(/^on(.*)/,'$1');
                                o.element.addEventListener(opt,z,false);
                            }else{
                                var z = record_function(o,x,z);
                                o.element[x]= z;
                                if(!x.match(/^_/)){
                                    o.element.methods.push(x);
                                }
                            }

                        }
                    }else if(typeof z !== 'object'){
                        
                        o.element.set(x,z);
                    }

            });
        }
        
        o.methods_done = true;
    };
    
    config.events = function(o,ref){

        if(EVENTS && EVENTS[ref]){
            loop(EVENTS[ref],function(x,z){
                if(typeof z === 'object'){
                __events__
                    .EventStorage.set(
                        o.name+'::'+x,record_event.make(
                        o.name+'::'+x,o,z)
                    );

                }
            });
        }
        
    };
    
    config.control = function(o,ref){
        
        if(!o.control){return;}
      
        var slave = null;
        var index = o.control.indexOf(ref);
        var regex = new RegExp(ref+'$','');
        
        loop(__components__,function(k,v){

            if(k.match(regex)){
                
                slave = v;
            }
            
        });
        
        

        
        if(slave !== null){
            
            o.control[index] = slave;
            
        }else{
            

            var a = o;
            var b = ref;
            var c = config;
            
            delayed('control',a,b,c);
            
        }
        
              
    };
    
    var delayed = function(key,a,b,c,d){
        
        var tmp = __platform__.tmp.queued;
        var arr = [];
        arr.push(key);
        
        switch(key){
            case 'design':
                arr.push(a);
                arr.push(b);
                arr.push(c);
                arr.push(d);
                tmp.push(arr);
            break;
            case 'control':
                arr.push(a);
                arr.push(b);
                arr.push(c);
                tmp.push(arr);
            break;
            case 'load':
                arr.push(a);
                arr.push(b);
                tmp.push(arr);
            break;
        };
        
    };
    
    var add_origin = function(o){
        
        if(!o.element.origin){
            o.element.origin = [];
        };
        
        o.element.origin.unshift(o.name);
        
    };
    
    var record_function = function(o,x,fu){
        
        var func = o.name+'::'+x;
        var db = __events__.Functions;
        
        if(db.get(func) === null){
            db.set(func,fu);
            record_event(o,x);
        };
        
        return db.get(func);
        
    };
    
    var record_event = function(o,x) {

        var db = __events__.EventStorage;

        var event = o.name+'::'+x;
        var payload = record_event.make(event,o);
        db.set(event,payload);
        
    };
    
    record_event.ancestor = function(o) {
        
        var db = __events__.EventStorage;
        var ancestor = o.element.origin[1];
        
        if(ancestor){

            var h = db.search(ancestor+'::(.*)$','');
            
            if(h[0]){
                for(var l in h){
                    if(h.hasOwnProperty(l)){
                        
                        var n = ancestor+'::';
                        var event = o.name+'::'+h[l].slice(n.length,h[l].length);
                        var payload = db.get(h[l]);
                        
                        //FIX
                        if(n !== h[l].replace(/^(.*::)(.*)$/,'$1')){
                            return;
                        }
                        //FIX

                        if(!payload){
                            payload = record_event.make(event,o);
                        }
                        
                        if(db.get(event) === null){
                            db.set(event,payload);
                        };
                    }
                };
            }
        }
    };
    
    record_event.make = function(e,o,obj){
        
        if(!obj) {obj = {};};
        obj['stop'] = false;
        
        var event = new CustomEvent(
                    e,{
                        detail: obj,
                        bubbles: true,
                        cancelable: true
            });
        
        return event;
        
    };
    
    var end = function(o) {
        
        if(METHODS){
            loop(METHODS,function(x,z){
                if(typeof z === 'function'){
                    if(x === 'onload' || x === '_onload'){
                        delayed('load',z,o.element);
                    }else{
                        
                        if(o.control){
                            function addParameter(func, argIndex, argValue) {
                                return function() {
                                    arguments[argIndex] = argValue;
                                    arguments.length = Math.max(arguments.length, argIndex);
                                    return func.apply(this, arguments);
                                };
                            }

                            z = addParameter(z, 0, o.control);

                        }
                        
                        if(x.match(/^on/)){
                           var opt = x.replace(/^on(.*)/,'$1');
                           o.element.addEventListener(opt,z,false);
                        }else{
                           var z = record_function(o,x,z);
                           o.element[x]= z;
                           if(!x.match(/^_/)){
                                    o.element.methods.push(x);
                           };
                        };
                    };
                }else if(typeof z !== 'object'){
                    o.element.set(x,z);
                };
            });
        };
        
        if(EVENTS){
            loop(EVENTS,function(x,z){
                if(typeof z === 'object'){
                __events__
                    .EventStorage.set(
                        o.name+'::'+x,record_event.make(
                        o.name+'::'+x,o,z)
                    );

                }
            });
        };
        
    };
    
    var build = function(o){
        
        var tobuild = null;
        
        if(o.element.match(/^(module::).*$/)){
            o.element = o.element.replace(/^module::(.*)$/,'$1');
            try{
            tobuild = __modules__[o.element].config(o.configure || {});
            }catch(e){
                throw('Error : Module ['+o.element+'] is not properly declared or does not exist.');
            }
            tobuild.module = tobuild.name;
            tobuild.name = null;
        }else{
            try{
            tobuild = __lib__.components[o.element].config(o.configure || {});
            }catch(e){
                throw('Error : Component ['+o.element+'] is not properly declared or does not exist.');
            }
        }
        
        o.element = __there__.BuildHTML(tobuild,o.name);
        return o.element;
        
    };
    
    var make = function(o){
        
        if(typeof o.element === 'string'){
            try{
                o.element = build(o);
            }catch(e){
                console.log(e);
                o.element = document.createElement('div');
            };
        }else if(typeof o.element === 'function'){
            o.element = o.element();
            if(typeof o.element === 'string'){
                make(o);
            }
        };
        
        return o.element;
        
    };

    base.element = make(base);
    base.element.path = prefix || base.name;
    if(obj.template) {
        base.element.path = 'body';
        record(base.element);
    };
    
    configure(base);
    
    loop(obj.structure,function(k,v,b) {
                
                if(typeof v === 'object' && v.element) {
                    
                   v.name = base.element.path+'/'+k;
                   v.element = make(v);
                   v.element.path = v.name;
                   record(v.element);
                   
                   var parse = function(v,ref){
                     loop(v,function(x,y){
                         if(typeof y === 'object' && y.element) {
                             
                             y.name = v.name+'/'+x;
                             y.element = make(y);
                             y.element.path = y.name;
                             record(y.element);
                             
                             configure(y);
                             
                             v.element.appendChild(y.element);
                             if(ref) ref.appendChild(y.element);
                             parse(y);
                             
                         };
                     });
                    };
                    
                    configure(v);
                    base.element.appendChild(v.element);
                    parse(v);
                };
                
            });

    end(base);
    return base.element;
    
};   
