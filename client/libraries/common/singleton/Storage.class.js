Storage = function() {

	this.database = {};

}

codie.libraries.singleton.Storage.prototype.set = function(key,value){
	
		if(!this.database[key]){
			this.database[key] = value;
			return true;
		}else{
                        return this.maj(key,value);
		}

	};

codie.libraries.singleton.Storage.prototype.get = function(key){
	
		if(this.database[key]){
                    
                        var result;
                        var checkSimLink = function(key) {
                            if(typeof this.database[key] === 'string' && this.database[key].match(/^\*.*\*$/)){
                                checkSimLink(this.database[key].replace(/^\*(.*)\*$/,'$1'));
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

codie.libraries.singleton.Storage.prototype.maj = function(key,newval){

		if(this.database[key]){
			this.database[key] = newval;
			return true;
		}else{
			return false;
		}
	
	};


codie.libraries.singleton.Storage.prototype.del = function(key){


		if(this.database[key]){
			delete this.database[key];
			return true;
		}else{
			return false;
		}
	
	};
        
codie.libraries.singleton.Storage.prototype.search = function(motif,flags){

            var array = [];
            var regex = new RegExp(motif,flags);
            
            var makeArray = function(k,v){
                if(k.match(regex)){
                    array.push(k);
                }
            };

            __lib__.singleton.Iterate.object(this.database,makeArray);
            
            return array;
            
	};
        
 codie.libraries.singleton.Storage.prototype.majKey = function(key, newkey){

            __lib__.singleton.Modify.renameKeyObject(this.database,key,newkey);
            return 0;
	
	};

