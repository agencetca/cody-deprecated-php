logo = {
	
	name : 'logo',
	config : function(obj) {

		this.structure = {
                            id : true,
                            design : 'default',
                            element : 'div'
                         
		};
	
		this.design = {
			default : {
				width : '100px',
				height : '60px',
                                cursor : 'pointer',
                                background : 'url(http://t2.gstatic.com/images?q=tbn:ANd9GcRpoq9FCDb5i0XFQzdcG9_l4uHOICkFnlxa4HX5kQEhivoKbQWgL_1NcCtn) no-repeat top left',
                                //background : 'blue',
			}
		};
                
                this.methods = {
                    
                    visible : 'yes',
                    
                    _toggle : function(){
                        if(this.get('visible') === 'yes'){
                            this._hide();
                        }else{
                            this._show();
                        }
                    },
                    
                    _hide : function(){
                        $(this).fadeOut();
                        this.set('visible','no');
                    },
                    
                    _show : function(){
                        $(this).fadeIn();
                        this.set('visible','yes');
                    },
                    
                    onclick :function() {
                        
                    },
                    
                    getPic : function(action,data,callback){
                        //__lib__.singleton.Transmission.post(action,data,callback);
                    },
                    
                    onload : function(that){

                        that.getPic('pouet','64',function(p){
                            alert(p);
                        });
                        
                        
                    }
                    
                };
                        
                this.events = {
                            
		};
                
                this.suscribe = {
                    
                    //'button::push'
                            
		};

		return this;
	}
}

