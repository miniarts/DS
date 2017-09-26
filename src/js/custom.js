/*
    author: kaori

    edit this file and compile/minimise it
*/

(function($, window) {
    var ns = window.app || {},
        app = { 
 
        init: function () {
            "use strict";
 
            $(document).ready(function () { 
                var isMobile = {
                    Android: function() {
                        return navigator.userAgent.match(/Android/i);
                    },
                    BlackBerry: function() {
                        return navigator.userAgent.match(/BlackBerry/i);
                    },
                    iOS: function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    },
                    Opera: function() {
                        return navigator.userAgent.match(/Opera Mini/i);
                    },
                    Windows: function() {
                        return navigator.userAgent.match(/IEMobile/i);
                    },
                    any: function() {
                        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                    }
                };
                 
                if(!isMobile.any()){
                }else{
                    //desktop onlhy
                }

                app.wechatSocial();
                app.burgerIcon();
                app.setDrawer();
               	app.onDemandNav();
            });
 
            return false;
        },
        wechatQR: function(wechatbtn) {
            if ($(wechatbtn).hasClass('qr-on')) {
                $(wechatbtn).removeClass('qr-on');
                $(wechatbtn).children('.wechatQR').remove();
            } else {
                $(wechatbtn).addClass('qr-on');
                $(wechatbtn).append("<div class='wechatQR'><img src='/images/system/wechat-qr-V2.png'></div>").fadeIn();
            }
        },
        wechatSocial: function(){
            var $wechatSocial = $('#socialicons .foundicon-torso').parent('a');

            $($wechatSocial).on("click", function(event){
                    event.preventDefault();
                    app.wechatQR(this);
            });
        },
        burgerIcon: function(){
            var $btn = $('#mob-navbar-btn'),
                $wrapper = $('.t3-wrapper');

            $btn.on('click', function() {
                if ($wrapper.hasClass('mobnav-closed')) {
                    //isMobNavOpen = true;
                    $wrapper.removeClass('mobnav-closed');
                    $wrapper.addClass('mobnav-open');
                } else {
                    //isMobNavOpen = false;
                    $wrapper.addClass('mobnav-closed');
                    $wrapper.removeClass('mobnav-open');
                }
            });
        },
        transitionDelay: function(el, speed){
            var docElemStyle = document.documentElement.style,
                transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';

                $.each(el, function(){
                    $(this).css(transitionProp + 'Delay', i*speed + 'ms');
                });      
        },
        setLineHeight: function(el){
            var height = ($('.navbar-inner').height() - 110)/ el.length; //set the line-height, not sure about the -110 but copied from the old one
            
            $.each(el, function(){
               $(this).css("line-height", height + "px"); 
            });    
        },
        setDrawer: function(){
            var $items = $('#mob-navbar .navbar-inner .navbar-nav > li');

            app.transitionDelay($items, 25);
           	app.setLineHeight($items);

            $(window).on( "orientationchange", function(event) { 
                app.setLineHeight($items);
            });

            // $(window).on("resize", function($items){
            //     app.setLineHeight($items);
            // });

        },
        scrollToTop: function(){
            $("#back-to-top").click(function (e) {
                e.preventDefault();
                $("html, body").animate({scrollTop: 0}, 500);
            });
        },
		onDemandNav :function(){    
			var paused = false,
				lastScrollTop = 0,
				onLoaded = true,
				$document = $(document);

// Detect IE version
var iev=0;
var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
var trident = !!navigator.userAgent.match(/Trident\/7.0/);
var rv=navigator.userAgent.indexOf("rv:11.0");
if($('.t3-wrapper').hasClass('mobnav-closed')){var isMobNavOpen = false;} else{var isMobNavOpen =true;} 

if (ieold) iev=new Number(RegExp.$1);
if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
if (trident&&rv!=-1) iev=11;

//$(window).on('load', function() {
    var $body = $('body');
    //var titleSticky = 0;

    // if ($('html').hasClass('view-article') && ($('.content-main .page-header').length == 1)) {
    //     titleSticky = 1;
    //     var contentBottom = $('.content-main').height();
    //     var titleHeight = $('.content-main .page-header').outerHeight();
    // }

// Firefox or IE 11
if(typeof InstallTrigger !== 'undefined' || iev == 11) {

    $(window).on('scroll', function() {
        if (isMobNavOpen === true) {
            return false;
        }
        st = $document.scrollTop();//$(this).scrollTop();   
                    
        if (onLoaded === true || st <= 100) {
            onLoaded = false;
            $body.removeClass('headerHide');
            $body.removeClass('scrolled');
            return false;
        } else {
            if ($window.width() > 991) {
                $body.addClass('scrolled');
            }
        }

        // if (titleSticky == 1) {
        //     tt = $('.content-main .page-header').offset().top + titleHeight;
        //     if (tt > contentBottom) {
        //         titleHide();
        //     } else {
        //         titleShow();
        //     }
        // }

        if(st < lastScrollTop) {
            if( paused ){
                //headerShow();
                $body.removeClass('headerHide');
                paused = false;
            }  
        }
        else if(st > lastScrollTop) {
            if( !paused ){
                //headerHide();
                $body.addClass('headerHide');
                paused = true;
            }
        }
        lastScrollTop = st;
    });
} 
// Other browsers
else {
    $(window).scroll(function(){    
        if (isMobNavOpen === true) {
            return false;
        }
        var st = $document.scrollTop();//$(this).scrollTop();       

        if (onLoaded === true || st <= 100) {
            onLoaded = false;
            $body.removeClass('headerHide');
            $body.removeClass('scrolled');
            titleShow();
            return false;
        } else {
            if ($window.width() > 991) {
                $body.addClass('scrolled');
            }
        }

        // if (titleSticky == 1) {
        //     var tt = $('.content-main .page-header').offset().top + titleHeight;
        //     if (tt > contentBottom) {
        //         titleHide();
        //     } else {
        //         titleShow();
        //     }
        // }

        if( st < lastScrollTop ) {
             if( paused ){
                //headerShow();
                $body.removeClass('headerHide');
                paused = false;
            }       
        } else {
            if( !paused ){
                //headerHide();
                $body.addClass('headerHide');
                paused = true;
            }
        }           
        lastScrollTop = st;
    });
}

    // function headerHide() { 
    //     $body.removeClass('headerShow');
    //     $body.addClass('headerHide');
    // }
    // function headerShow()  {
    //     $body.removeClass('headerHide');
    //     $body.addClass('headerShow');
    // }
    // function titleHide() {
    //     $('.content-main .page-header').css({'opacity':'0'});
    // }
    // function titleShow() {
    //     $('.content-main .page-header').css({'opacity':'1'});
    // }


//});

//})( jQuery );

        },



    //     onDemandNav: function(){
    //     	var $body = $('body'),
    //         lastScrollTop,
    //         scrollTop,
    //         $window = $(window),
    //         $document = $(document),
 
    //         init = function(){
    //         	lastScrollTop = 0;
    //         	scrollTop = 0;
    //         	$body.removeClass('headerHide');
    //         },
 
    //         scrollNav = function(){
    //             scrollTop = $document.scrollTop();
 
    //             if(lastScrollTop > scrollTop){//up
    //             	$body.removeClass('headerHide');
    //             }else{//down
    //             	$body.addClass('headerHide');
    //             }
    //             lastScrollTop = scrollTop;
    //         };
 			
 			// //if($window.width() > 991){
		  //       // $window.resize(function(){
		  //       //     init();
		  //       //     scrollNav();
		  //       // });
		 
		  //       $window.scroll(function(){ console.log('scroll')
		  //           scrollNav();
		  //       });
		 
		  //       init();
		  //  // / }
    //     },
        
        //set boxes in equal size - not used
        setHeight : function(el){
            var maxHeight = 0;
 
            $(el).css({
                'height':''
            });
 
            $(el).each(function() {
                maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
            });
             
            $(el).height(maxHeight);    
            return false;       
        },
        heightFix : function(){
            if($('.img-thumbnail').length){              
                $(window).resize(function(){ 
                   app.setHeight($('.img-thumbnail'));
                }); 
 
                $(window).trigger('resize');
            }
        }
    };
  
    app.cache = ns.cache || {};
     
    app.init($); // initialises the calls
     
    window.app = $.extend(ns, app);
}) (jQuery, window);