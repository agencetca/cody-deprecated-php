div = {
	
	name : 'div',
	config : function(obj){
            
                this.structure = {
                        
                        design : 'div',
                        element : document.createElement('div')

		};
	
		this.design = {
                    
			div : {
				position : 'relative',
				cssFloat : 'left',
				width : 'auto',
				height : 'auto',
				margin : 0,
				padding : 0
			}
                    
		};

		return this;

	}

}
