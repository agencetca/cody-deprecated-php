template = {

        name : 'Public',
        
        structure : {
            
                        id : true,
                        design : 'body',
                        element : 'container',
                        methods : '',
                        events : 'test',

                        navbar : {
                                id : true,
                                design : 'navbar',
                                element : 'div',

                                one : {
                                        id : true,
                                        design : 'navbar_one',
                                        element : 'div',
                                },
                                
                                two : {
                                        id : true,
                                        design : 'navbar_two',
                                        element : 'div',
                                },
                                
                                three : {
                                        id : true,
                                        design : 'navbar_three',
                                        element : 'div',
                                }

                        },
                        
                        header : {
                                id : true,
                                design : 'header',
                                element : 'div',

                                one : {
                                        id : true,
                                        design : 'header_one',
                                        element : 'div',
                                        logo : {
                                            id : true,
                                            design : 'logo',
                                            element : 'module::logo',
                                        }
                                },
                                
                                two : {
                                        id : true,
                                        design : 'header_two',
                                        element : 'div',
                                },
                                
                                three : {
                                        id : true,
                                        design : 'header_three',
                                        element : 'div',
                                        connexion : {
                                            id : true,
                                            design : '',
                                            element : 'module::login',
                                        }
                                }

                        },
                        
                        working_area : {
                                id : false,
                                design : 'working_area',
                                element : 'div',

                                featured : {
                                        id : true,
                                        design : 'featured',
                                        element : 'div',
                                        header : {
                                                id : true,
                                                design : 'featured_one_header',
                                                element : 'div',
                                                txt : {
                                                    id : true,
                                                    design : 'featured_one_header_text',
                                                    element : 'div',
                                                    configure : {
                                                        text : 'Inscriptions'
                                                    }
                                                    
                                                }
                                        },
                                        main : {
                                                id : true,
                                                design : 'featured_one',
                                                element : 'div',
                                                register : {
                                                    id : true,
                                                    design : 'register',
                                                    element : 'module::register',
                                                }
                                        }
                                },
                                main : {
                                        id : true,
                                        design : 'main',
                                        element : 'div',
                                        one : {
                                                id : true,
                                                design : 'main_one',
                                                element : 'div',
                                        }
                                }

                        },
                        
                        footer : {
                                id : true,
                                design : 'footer',
                                element : 'div',

                                one : {
                                        id : true,
                                        design : 'footer_one',
                                        element : 'div',
                                },
                                
                                two : {
                                        id : true,
                                        design : 'footer_two',
                                        element : 'div',
                                },
                                
                                three : {
                                        id : true,
                                        design : 'footer_three',
                                        element : 'div'
                                }

                        }
            
	},

	design : {
		body : {
                        width : '100%',
			height : screen.availHeight/1.16,
			minWidth : screen.availWidth,
			backgroundColor : 'transparent',
                        zIndex : '1'
		},
		navbar : {
			position : 'fixed',
			top : 0,
			left : 0,
			width : '100%',
			height : '40px',
			backgroundColor : 'black',
                        zIndex : '9999'
		},
		navbar_one : {
			position : 'relative',
			cssFloat : 'left',
			width : '20%',
			height : '100%',
			background : 'transparent'
		},
		navbar_two : {
			position : 'relative',
			cssFloat : 'left',
			width : '55%',
			height : '100%',
			background : 'transparent'
		},
		navbar_three : {
			position : 'relative',
			cssFloat : 'left',
			width : '25%',
			height : '100%',
			background : 'transparent'
		},
		header : {
			position : 'relative',
			cssFloat : 'left',
			width : '98%',
			height : '15%',
			marginLeft : '1%',
			marginRight : '1%',
                        marginTop : '40px',
			marginBottom : '30px',
                        zIndex : '999'
		},
		'logo' : {
			width : '100%',
			height : '100%',
		},
		header_one : {
			width : '20%',
			height : '100%',
			marginLeft : '2px',
                        marginTop : '2px',
			marginBottom : '10px',
		},
		header_two : {
			position : 'relative',
			cssFloat : 'left',
			width : '53%',
			height : '100%',
			marginLeft : '2px',
		},
		header_three : {
			width : '24%',
			height : '100%',
			marginLeft : '1%',
                        marginTop : '2px',
			marginBottom : '10px',
			backgroundColor : 'transparent',
		},
		login : {
			position : 'relative',
			cssFloat : 'right',
                        width : '100%',
                        height : '100%',
			backgroundColor : '#F9F9F9',
                        marginRight : '6%',
                        padding : '0 0 0 5%',
                        margin : 0
		},
		working_area : {
			width : '100%',
			height : 'auto',
			backgroundColor : 'transparent',
                        zIndex : '99'
		},
		main : {
			width : '70%',
			height : 'auto',
			marginLeft : '1%',
                        marginTop : '2px',
			backgroundColor : 'transparent',
                        zIndex : '999'
		},
		main_one : {
			width : '100%',
			height : '64%',
			backgroundColor : 'transparent'
		},
		featured : {
			position : 'relative',
			cssFloat : 'right',
			width : '23.5%',
			height : '65%',
			marginRight : '2%',
			backgroundColor : 'transparent',
                        zIndex : '999'
		},
		featured_one_header : {
                        width : '100%',
			height : '10%'
		},
                featured_one_header_text : {
                        width : 'auto',
			height : 'auto',
                        marginTop : '5px',
                        fontSize : '20px'
		},
		featured_one : {
			width : '100%',
			height : '90%'
		},
		footer : {
			position : 'fixed',
			bottom : 0,
			left : 0,
			width : '100%',
			height : '40px',
			backgroundColor : 'black',
                        zIndex : '9999'
		},
		footer_one : {
			position : 'relative',
			cssFloat : 'left',
			width : '20%',
			height : '100%',
			background : 'transparent'
		},
		footer_two : {
			position : 'relative',
			cssFloat : 'left',
			width : '75%',
			height : '100%',
			background : 'transparent'
		},
		footer_three : {
			position : 'relative',
			cssFloat : 'left',
			width : '5%',
			height : '100%',
			background : 'transparent'
		}
	},
        
        methods : {

        },

	events : {
            
	}

};

document.getElementsByTagName('body')[0].style.margin = 0;
