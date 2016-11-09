template = {

        name : 'Journalist',
        
        structure : {
            
                        id : true,
                        design : 'body',
                        element : 'body',

                        navbar : {
                                id : true,
                                design : 'navbar',
                                element : 'container',
                                configure : {
                                    position : 'top'
                                },

                                one : {
                                        id : true,
                                        design : 'navbar_one',
                                        element : 'container',
                                },
                                
                                two : {
                                        id : true,
                                        design : 'navbar_two',
                                        element : 'container',
                                },
                                
                                three : {
                                        id : true,
                                        design : 'navbar_three',
                                        element : 'container',
                                }

                        },
                        
                        header : {
                                id : true,
                                design : 'header',
                                element : 'header',

                                one : {
                                        id : true,
                                        design : 'header_one',
                                        element : 'container',
                                        logo : {
                                            id : true,
                                            design : 'logo',
                                            element : 'module::logo'
                                        }
                                },
                                
                                two : {
                                        id : true,
                                        design : 'header_two',
                                        element : 'container',
                                        navi : {
                                            id : true,
                                            design : 'navi',
                                            element : 'module::navi'
                                        }
                                },
                                
                                three : {
                                        id : true,
                                        design : 'header_three',
                                        element : 'container',
                                        profil_sum : {
                                            id : true,
                                            design : 'navi',
                                            element : 'module::profil_sum'
                                        }
                                }

                        },
                        
                        sideline_left : {
                                id : true,
                                element : 'sideline',
                                configure : {
                                    side : 'left'
                                },
                                
                                button1 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'left',
                                        size : 'normal'
                                    }
                                },
                                button2 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'left',
                                        size : 'long'
                                    },
                                    control : ['panel_left','logo'],
                                    methods : 'button2'
                                },
                                button3 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'left',
                                        size : 'normal'
                                    },
                                },
                                button4 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'left',
                                        size : 'normal'
                                    },
                                },
                                button5 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'left',
                                        size : 'normal'
                                    },
                                },
                        },
                        
                        working_area : {
                                id : false,
                                design : 'working_area',
                                element : 'section',

                                featured : {
                                        id : true,
                                        design : 'featured',
                                        element : 'nav',
                                        featured_one : {
                                                id : true,
                                                design : 'featured_one',
                                                element : 'container'
                                        },
                                        featured_two : {
                                                id : true,
                                                design : 'featured_two',
                                                element : 'container'
                                        },
                                        featured_three : {
                                                id : true,
                                                design : 'featured_three',
                                                element : 'container'
                                        }
                                },
                                main : {
                                        id : true,
                                        design : 'main',
                                        element : 'main',
                                        one : {
                                                id : true,
                                                design : 'main_one',
                                                element : 'container',
                                        }
                                }

                        },
                        
                        sideline_right : {
                                id : true,
                                element : 'sideline',
                                configure : {
                                    side : 'right'
                                },
                                
                                button1 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'right',
                                        size : 'normal'
                                    },
                                },
                                button2 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'right',
                                        size : 'long'
                                    },
                                    control : ['panel_right'],
                                    methods : 'button2'
                                },
                                button3 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'right',
                                        size : 'normal'
                                    },
                                },
                                button4 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'right',
                                        size : 'normal'
                                    },
                                },
                                button5 : {
                                    id : true,
                                    element : 'side_button',
                                    configure : {
                                        side : 'right',
                                        size : 'normal'
                                    },
                                },
                        },
                        
                        footer : {
                                id : true,
                                design : 'footer',
                                element : 'frame',
                                configure : {
                                    position : 'bottom'
                                },

                                one : {
                                        id : true,
                                        design : 'footer_one',
                                        element : 'container',
                                },
                                
                                two : {
                                        id : true,
                                        design : 'footer_two',
                                        element : 'container',
                                },
                                
                                three : {
                                        id : true,
                                        design : 'footer_three',
                                        element : 'container',
                                }
                        },
                        
                        panel_left : {
                                id : true,
                                element : 'panel',
                                configure : {
                                    side : 'left'
                                }
                        },
                        panel_right : {
                                id : true,
                                element : 'panel',
                                configure : {
                                    side : 'right'
                                }
                        },
	},

	design : {
		
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
		logo : {
			width : '100%',
			height : '100%',
		},
		header_one : {
			width : '20%',
			height : '100%',
                        background : 'yellow'
		},
		header_two : {
			position : 'relative',
			cssFloat : 'left',
			width : '54%',
			height : '100%',
			marginLeft : '1%',
                        background : 'transparent'
		},
		header_three : {
			width : '24%',
			height : '100%',
			marginLeft : '1%',
			backgroundColor : 'transparent',
		},
		working_area : {
			width : '86%',
			height : '1000px',
			backgroundColor : 'yellow',
                        zIndex : '99'
		},
		main : {
			width : '76%',
                        zIndex : '999',
                        background : 'red'
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
			marginRight : '0',
			backgroundColor : 'transparent',
                        zIndex : '999'
		},
		featured_one_header : {
			width : '100%',
			height : '10%',
			backgroundColor : '#F1F1F1'
		},
                featured_one_header_text : {
                        width : 'auto',
			maxWidth : '100%',
			height : 'auto',
                        marginLeft : '30%',
                        marginRight : '25%',
                        marginTop : '3%',
                        borderBottom : '1px solid gray'
		},
		featured_one : {
			width : '100%',
			height : '90%',
			backgroundColor : '#F9F9F9'
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
            
            button2 : {
                onclick : function(slave){
                    slave[0]._switch();
                    if(slave[1] && slave[1]._hide){
                        slave[1]._hide();
                    };
                    
                }
            }

        },

	events : {
            
	}

};

document.getElementsByTagName('body')[0].style.margin = 0;
