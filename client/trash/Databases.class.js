Databases
.DefaultStorage = new __lib__.singleton.Storage;

Databases
        .Functions = new __lib__.singleton.Storage();

Databases
        .EventStorage = new __lib__.singleton.Storage();

Databases
        .EventStorage.get = function(key){

		if(this.database[key]){var count = 0;
                    
                        var result;
                        var checkSimLink = function(key) {
                            
                            if(typeof this.database[key] === 'string' && this.database[key].match(/^\*.*\*$/)){
                                
                                var event = this.database[key].replace(/^\*(.*)\*$/,'$1');
                                checkSimLink(event);
                                
                            }else{
                                result = this.database[key];
                            }
                        }.bind(this);
                        
                        checkSimLink(key);
                        return result;
		}else{
			return null;
		}
	
	};

Databases
        .EventListeners = new __lib__.singleton.Storage();

Databases
        .IntStorage = new function() {

	this.id = {};

	this.create = function(what,keyword,element){
	
		var num = this.generate(what);
		this[what][keyword] = num;

		if(element && __lib__.singleton.Check.inArray(what,mustBeHTMLRegen)){
		
			element.setAttribute(what,num);
		
		}

		return this[what][keyword];

	};
	this.read = function(what,keyword){
	
		return this[what][keyword];
	
	};
	this.updateKey = function(what,oldkey,newkey){
	
		__lib__.singleton.Modify.replaceInObject(this[what],oldkey,newkey);
			
	};


	this.updateVal = function(what,key){
	
		var oldval = this[what][key];
		var newval = this.generate(what);
		this[what][key] = newval;

		if(__lib__.singleton.Check.inArray(what,mustBeHTMLRegen)){
		
			regenHtmlElement(what,oldval,newval);

		}

		return newval;
	
	};

	this.remove = function(what,name){

		if(__lib__.singleton.Check.inArray(what,mustBeHTMLRegen)){
		
			var ID = this[what][name];
			var target = document.getElementById(ID);
			target.removeAttribute(what);

		}

		delete this[what][name];
	
	};

	var mustBeHTMLRegen = ['id'];

	var regenHtmlElement = function(what,oldVal,newVal){
	
		var target = document.getElementById(oldVal);
		target.removeAttribute(what);
		target.setAttribute(what,newVal);

	}

	this.generate = function(what){

		var num;
	
		do{
			num = Math.floor(Math.random()*999);
		} while(__lib__.singleton.Check.inObject(num,this[what]));

		return num;

	}.bind(this);

}
