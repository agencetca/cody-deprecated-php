Check = new function() {

	this.hasClass = function (element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	};

	this.type = function (thing) {
		return Object.prototype.toString.call(thing);
	};

	this.objectSize = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    
	    return size;
	};

	this.isArray = function(thing) {
		
		if(this.type(thing) === '[object Array]'){
			return true;
		}else{
			return false;
		}

	};

	this.isObject = function(thing) {
		
		if(this.type(thing) === '[object Object]'){
			return true;
		}else{
			return false;
		}

	};

	this.isHTMLObject = function(thing) {
		
		if(this.type(thing) === '[object HTMLElement]' || this.type(thing) === '[object HTMLDivElement]' || this.type(thing) === '[object HTMLInputElement]' || this.type(thing) === '[object HTMLParagraphElement]'){
			return true;
		}else{
			return false;
		}

	};


	this.objectLength = function(obj) {

		var count = 0;

		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				++count;
			}
		}

		return count;

	};


	this.inArray = function(value, array) {

		if(array.indexOf(value) > -1){
			return array.indexOf(value) > -1;
		}else if(array.indexOf(parseInt(value)) > -1){
			return array.indexOf(parseInt(value)) > -1;
		}else{
			return false;
		}
	}

	this.inObject = function(value, object) {
		for(var prop in object) {
			if(object.hasOwnProperty(prop)) {
				if(object[prop] === value) {
					return true;
				}
			}
		}
		return false;
	}

	this.keyInObject = function(value, object) {

		if(object[value]){
			return true;
		}else{
			return false;
		}
	};
        
        this.isFunction = function(thing) {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Function]';
        }

}
