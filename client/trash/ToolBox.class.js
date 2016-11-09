ToolBox = {


	getElementByName : function(name){
	
		return __components__[name];
	
	},
        getUniqueElementByName : function(name){
	
		var id = __lib__.singleton.IntStorage.read('id',name);
		return document.getElementById(id);
	
	},
        getElementById : function(id){
	
		return document.getElementById(id);
	
	},

}
