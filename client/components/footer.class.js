footer = {
	
	name : 'footer',
	config : function(obj){
                
		this.structure = {
			
		 	design : 'footer',
			element : document.createElement('footer')
		
		};
	
		this.design = {
			footer : {
                                position : 'fixed',
                                bottom : 0,
                                left : 0,
                                width : '100%',
                                height : '40px',
                                backgroundColor : 'black',
                                zIndex : '9999'
			}
		};
                
                this.methods = {
                        
		};
                
		this.events = {
		};

		return this;

	}

}
