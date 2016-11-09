login = {
	
	name : 'login',
	config : function(obj){

		this.structure = {

                            id : true,
                            design : 'container',
                            element : 'container',
                            
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
                            password : {
                                    id : true,
                                    design : 'input',
                                    element : 'password',
                                    configure : {
                                            placeholder : 'password'
                                        }
                            },
                            submit : {
                                    id : true,
                                    design : 'submit',
                                    element : 'submit',
                                    configure : {
                                            text : 'ok'
                                        },
                                    methods : 'submit',
                            },
                            message : {
                                id : true,
                                design : 'msg',
                                element : 'div',
                                methods : 'msg',
                            }

                };
	
		this.design = {
                        
                        container : {
                            
                            width : '100%'
                            
			},
                        input : {
                            padding : '2px',
                            width : '42%'
                        },
                        submit : {
                            cssFloat : 'none',
                            padding : '0.8px',
                        },
                        msg : {
                            width : '100%',
                            height : 'auto',
                            display : 'none',
                            color : 'red'
                        }
                        
                        
		};
                
                this.methods = {
                    
                    submit : {
                        
                        onclick : function(e){

                            var data = {};
                            data.email = __components__[this.parentNode.path+'/email'].get('value');
                            data.password = __components__[this.parentNode.path+'/password'].get('unsecure');
                            data.role = 'journalist';
                            
                            if(data.email && data.password){
                                this.transmit('login',data,function(obj){

                                      codie.user = JSON.parse(obj[0]);
                                      codie.environment.template = JSON.parse(obj[1]);
                                      eval(JSON.parse(obj[2]));
                                      __singleton__.Loading.template(codie.environment.template);
//                                    
//                                    var value = obj.default;
//                                    var boxmsg = __components__[this.parentNode.path+'/message'];
//                                    boxmsg.display(value);
                                }.bind(this));
                            }
                        }
                        
                    },
                    
                    msg : {
                        
                        busy : false,
                        
                        display : function(cont){
                            
                            if(this.get('busy') === true){
                                return;
                            };
                            
                            this.set('busy',true);
                            this.set('value',cont);
                            this._show();
                            
                            if('textContent' in this){
                                this.textContent = this.get('value');
                            }else{
                                this.innerText = this.get('value');
                            };
                            
                            setTimeout(function(){
                                
                                this._clear();
                                this._hide();
                                this.set('busy',false);
                                
                            }.bind(this), 2500);
                            
                            
                        },
                        
                        _clear : function(){
                            if(this.get('busy') === true){
                                return;
                            };
                            this.set('value','');
                            this.display();
                        },
                        
                        _hide : function(){
                            this.style.display = 'none';
                        },
                        
                        _show : function(){
                            this.style.display = 'block';
                        }
                        
                    }
                        
                };

		return this;

	}

}
