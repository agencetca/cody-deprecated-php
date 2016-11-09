profil_sum = {
	
	name : 'profil_sum',
	config : function(obj) {

		this.structure = {
                            id : true,
                            design : ['default'],
                            element : 'div',
                            data : {
                                id : true,
                                design : ['data'],
                                element : 'container',
                                pl1 : {
                                    id : true,
                                    design : ['pl'],
                                    element : 'linedata',
                                    methods : ['line']
                                },
                                pl2 : {
                                    id : true,
                                    design : ['pl'],
                                    element : 'linedata',
                                    methods : ['line']
                                },
                                pl3 : {
                                    id : true,
                                    design : ['pl'],
                                    element : 'linedata',
                                    methods : ['line']
                                }
                            },
                            message : {
                                id : true,
                                design : ['message'],
                                element : 'container',
                                methods : ['line'],
                                welcome : {
                                    id : true,
                                    design : ['welcome'],
                                    element : 'pline',
                                    configure : {
                                        text : 'Bienvenue '+__platform__.user.username
                                    }
                                }
                            }
		};
	
		this.design = {
                    
                    default : {
                        width : '100%'
                    },
                    data : {
                        width : '100%',
                        height : '80%'
                    },
                    message : {
                        width : '100%',
                        height : '20%',
                        marginTop : '1%',
                        textAlign : 'right'
                    },
                    welcome : {
                        cssFloat : 'right',
                        marginRight : '1%',
                        paddingRight : '1%',
                        width : '97%'
                    }
                    
		};
                
                this.methods = {
                    
                    onclick :function() {
                        
                    },
                    
                    onload : function(that){
                        
                    },
                    
                    choices : {
                        
                        onclick : function(){
                            //__lib__.singleton.Events.fire('push',this);
                        }
                    },
                    
                    line : {
                        
                        onload : function(that){
                            
                             
                        }
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

