navi = {
	
	name : 'navi',
	config : function(obj) {

		this.structure = {
                            id : true,
                            design : ['default'],
                            element : 'div',
                            choice : {
                                id : true,
                                design : ['choice'],
                                element : 'div',
                                choice1 : {
                                    id : true,
                                    design : ['choice_button'],
                                    element : 'linechoice',
                                    methods : ['line']
                                },
                                choice2 : {
                                    id : true,
                                    design : ['choice_button'],
                                    element : 'linechoice',
                                    methods : ['line']
                                },
                                choice3 : {
                                    id : true,
                                    design : ['choice_button'],
                                    element : 'linechoice',
                                    methods : ['line']
                                }
                            },
                            line : {
                                id : true,
                                design : ['line'],
                                element : 'div',
                                methods : ['line'],
                                selector : {
                                    id : true,
                                    design : ['selector'],
                                    element : 'div'
                            }
                            }
		};
	
		this.design = {
                        default : {
                                width : '100%',
				height : '100%'
			},
                        choice : {
				width : '100%',
				height : '90%'
			},
                        choice_button : {
                                'height*' : '100%'
			},
                        line : {
				width : '100%',
				height : '10%'
			},
                        selector : {
				'width*' : function(that){
                                    var sign = that.parentNode.style.width.match(/.$/);
                                    return parseInt(that.parentNode.style.width)/that.parentNode.parentNode.childNodes[0].childNodes.length+sign;
                                },
                                marginLeft: '0.3%',
				height : '100%',
                                background : 'black',
                                borderRadius: '20px',
                                marginTop: '2px'
			}
		};
                
                this.methods = {
                    
                    onclick :function() {
                        
                    },
                    
                    onload : function(that){
                        
                    },
                    
                    choices : {
                        
                        onclick : function(){
                            __lib__.singleton.Events.fire('push',this);
                        }
                    },
                    
                    line : {
                        
                        onload : function(that){
                            
                            that.set('ml',that.childNodes[0].style.marginLeft);
                            
                            var parent = that.parentNode.childNodes[0];
                            var parent = parent.childNodes;
                            
                            for(var p in parent){
                                if(parent.hasOwnProperty(p)){
                                    __lib__.singleton.Events.listen(parent[p].path+'::push',function(e){
                                        var offset = e.detail.element.offsetLeft;
                                        var ml = that.get('ml');
                                        
                                        if(ml.match(/%$/)){
                                            ml = ($(that).width()*ml.replace(/%$/,''))/100;
                                        }else{
                                            ml = parseInt(ml);
                                        }
                                       
                                        $(that.childNodes[0]).animate({
                                            marginLeft : offset+ml
                                        },120);
                                        
                                    });
                                }
                            }
                            
                             
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

