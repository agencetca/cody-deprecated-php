register = {
	
	name : 'register',
	config : function(obj){
            
                this.structure = {

                            id : true,
                            design : 'container',
                            element : 'form',
                            
                            role :{
                                id : true,
                                element : 'role',
                            },
                            
                            username : {
                                    id : true,
                                    design : 'input',
                                    element : 'input',
                                    configure : {
                                            type : 'text',
                                            value : '',
                                            placeholder : 'username'
                                        }
                            },
                            email : {
                                    id : true,
                                    design : 'input',
                                    element : 'input',
                                    configure : {
                                            type : 'text',
                                            value : '',
                                            placeholder : 'email'
                                        }
                            },
                            submit : {
                                    id : true,
                                    design : 'submit',
                                    element : 'submit',
                                    methods : ['submit']
                            }
                            

                };
	
		this.design = {
                        container : {
                            width : '100%',
                            height: '100%',
                            minWidth : function(){
                                return screen.width * 5 / 100 + '%';
                            }
			},
                        label : {
                            margin : 0,
                            padding : '5px'
                        },
                        input : {
			},
                        input2 : {
                            marginTop : '4px'
			},
                        submit : {
			}
		};
                
                this.methods = {
                    
                    submit : {
                            
                        
                        onclick : function(e){

                            var data = {};
                            data.role = __components__[this.parentNode.path+'/role'].get('value');
                            data.username = __components__[this.parentNode.path+'/username'].get('value');
                            data.email = __components__[this.parentNode.path+'/email'].get('value');

                            if(data.role && data.username && data.email){
                                this.transmit('register',data,function(obj){
                                    alert(obj);
                                });
                            }
                        }
                        
                    }
                        
                }; 

		return this;

	}

}
