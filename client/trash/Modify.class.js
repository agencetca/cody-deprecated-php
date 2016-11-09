Modify = new function() {

//	var self = this;
//
//	this.addClass = function (ele, cls) {
//		if(Check.isArray(cls)){
//			self.arrayAddClass(ele,cls);
//		}else{
//			if (!Check.hasClass(ele,cls)) ele.className += " "+cls;
//		}
//	};
//
//	this.removeClass = function (ele, cls) {
//		if (Check.hasClass(ele,cls)) {
//			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
//			ele.className=ele.className.replace(reg,' ');
//		}
//	};
//
//	this.arrayAddClass = function (ele, cls) {
//		
//		function addCls(v){
//			self.addClass(ele,v);
//		}
//
//		Iterate.array(cls,addCls);
//
//	};

	this.renameKeyObject = function (object,oldkey,newkey) {

		if (object[oldkey] && oldkey !== newkey) {
			Object.defineProperty(object, newkey,
				Object.getOwnPropertyDescriptor(object, oldkey));
			delete object[oldkey];
		}
		
	};
        
};
