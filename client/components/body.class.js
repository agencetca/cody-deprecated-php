body = {
	
	name : 'body',
	config : function() {

		 this.structure = {
			
                        design : 'body',
			element : 'container'
		
		};
	
		this.design = {
			body : {
				position : 'relative',
				cssFloat : 'left',
				width : '100%',
                                height : screen.availHeight/1.16,
                                minWidth : '800px',
                                backgroundColor : 'transparent'
			}
		};
                
                this.methods = {
                    
                   onload : function(that){
                       
                       window.onscroll = function (e) {  
                           __lib__.singleton.Events.fire('scroll',that);
                       };
                       
                   },
                    
                };
                
		this.events = {
                    
                   scroll : {}
                    
		};

		return this;

	}

}
