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

                app.scrollToTop();
                app.stickyNav();
                app.menuSearch();
                app.heightFix();
            });
 
            return false;
        },
        scrollToTop: function(){
            $(".btt-wrap").click(function () {
                $("html, body").animate({scrollTop: 0}, 500);
            });
        },
        // STICKY NAVIGATION
        stickyNav :function(){    
            var $nav = $('#t3-mainnav');
            if ($nav.length > 0 ) {

                var stickyOffset = $nav.offset().top + 40;

                $(window).scroll(function(){
                  var sticky = $nav,
                      scroll = $(window).scrollTop();

                  if (scroll >= stickyOffset) {
                        $('body').addClass('fixNav');
                    } else {
                        $('body').removeClass('fixNav');
                    }
                });
            }
        },
        menuSearch: function(){
            var $nav =  $( "#t3-mainnav"),
                searchInput = $nav.find(".search form #mod-search-searchword" ),
                searchBtn = $nav.find( ".navsearchBtn" );

            $( searchBtn ).toggle(function() {
                TweenLite.to(searchInput, 0.2, {width:'100%', autoAlpha:1});
            }, function() {
                TweenLite.to(searchInput, 0.2, {width:'0px'});
                TweenLite.to(searchInput, 0.3, {autoAlpha:0, delay:0.3});
            });
        }, 
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