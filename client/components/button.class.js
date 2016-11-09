button = {
	
	name : 'button',
	config : function(obj){
                
		this.structure = {
                        design : 'style',
                        element : document.createElement('button'),
                        methods : ['interact','misc'],
                        events : ['test']
		};
	
		this.design = {
			style : {
				position : 'relative',
				cssFloat : 'left',
				width : 'auto',
				height : 'auto',
                                cursor : 'pointer',
                                background : 'gray'
			}
		};
                
                this.methods = {
                
                        state : 'off',
                        min_opacity : 0.2,
                        max_opacity : 1,
                        
                        onclick : function(e){

                                e.preventDefault();
                                
                        },
                        
                        interact : {
                    
                            push : function(){
                                
                                if(this._isPulled){
                                    this.set('state','on');
                                    this.style.opacity = this.get('max_opacity');
                                    __lib__.singleton.Events.fire('push',this);
                                    return true;
                                }else{return false;}
                                
                            },
                            
                            pull : function(){
                                if(this._isPushed){
                                    this.set('state','off');
                                    this.style.opacity = this.get('min_opacity');
                                    __lib__.singleton.Events.fire('pull',this);
                                    return true;
                                }else{return false;}
                                
                            },
                            
                            _push : function(){//silent push (no event)
                                
                                if(this._isPulled){
                                    this.set('state','on');
                                    this.style.opacity = this.get('max_opacity');
                                    return true;
                                }else{return false;}
                                
                            },
                            
                            _pull : function(){//silent pull (no event)
                                if(this._isPushed){
                                    this.set('state','off');
                                    this.style.opacity = this.get('min_opacity');
                                    return true;
                                }else{return false;}
                                
                            },
                            
                            _isPushed : function(){
                                if(this.get('state') === 'on'){
                                    return true;
                                }else{
                                    return false;
                                }
                            },
                            
                            _isPulled : function(){
                                if(this.get('state') === 'off'){
                                    return true;
                                }else{
                                    return false;
                                }
                            },
                            
                            _onload : function(that){
                                
                                if(that.get('state') === 'on'){
                                    that.push();
                                }else{
                                    that.pull();
                                }

                            },
                            
                            switch : function(){

                                if(this._isPushed()){
                                    this.pull();
                                }else{
                                    this.push();
                                }

                            },
                            
                            onclick : function(){

                                this.switch();
                                

                            }
                            
			},
                        
                        misc : {
                            
                            _highlight : function(){
                                
                                if(this._isPushed){
                                    if(!this._isPushed()){
                                        this.style.opacity = this.get('max_opacity')/4;
                                    }
                                }else if(!this._isPushed){
                                    this.style.opacity = this.get('max_opacity')/4;
                                }
                                
                                
                                
                            },
                            
                            _unhighlight : function(){
                                
                                this.style.opacity = this.get('min_opacity');
                                
                            },
                            
                            onmouseenter : function(){
                                    
                                this._highlight();
                            },
                            
                            onmouseleave : function(){
                                if(this.get('state') === 'off'){
                                    this._unhighlight();
                                }
                            }
                            
                        }
                        
		};

		return this;

	}

}
