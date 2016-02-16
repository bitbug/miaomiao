define(['mn',
    'slimScroll',
    'text!templates/header.html'
], function(Mn, slimScroll, template) {
    var Header = Mn.ItemView.extend({
        className:"container",
        initialize:function(option){
            this.pos = option.pos;
            is_collapsed = true;
            is_mobile = ($(window).width()<=600)?true:false;
            if(is_mobile){
                $("#main-content").addClass("margin-left-0");
            }else{
                $("#main-content").removeClass("margin-left-0");
            }
       },
        template: function() {
            var _this = this;
            return _.template(template, {
                pos: MMAPP.currentPos
            })
        },
        ui:{
            menuButton:"#sidebar-collapse"
        },
        events:{
            "click @ui.menuButton":"toggleMenu"
        },
        toggleMenu:function(){
            if(is_mobile){
                if(is_collapsed){
                    jQuery('body').removeClass("slidebar");
                    jQuery('.sidebar').removeClass("sidebar-fixed");
                    is_collapsed = false;
                }else{
                    jQuery('body').addClass("slidebar");
                    jQuery('.sidebar').addClass("sidebar-fixed");
                    is_collapsed = true;
                    this.handleMobileSidebar();
                }
            }else{
                var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
                var iconLeft = iconElem.getAttribute("data-icon1");
                var iconRight = iconElem.getAttribute("data-icon2");
                //If sidebar is collapsed
                if(is_collapsed){
                    /* For Navbar */
                    jQuery('.navbar-brand').removeClass("mini-menu");
                    /* For sidebar */
                    jQuery('#sidebar').removeClass("mini-menu");
                    jQuery('#main-content').removeClass("margin-left-50");
                    jQuery('.sidebar-collapse i').removeClass(iconRight);
                    jQuery('.sidebar-collapse i').addClass(iconLeft);
                    /* Add placeholder from Search Bar */
                    jQuery('.search').attr('placeholder', "Search");
                    is_collapsed = false;
                }
                else {
                    /* For Navbar */
                    jQuery('.navbar-brand').addClass("mini-menu");
                    /* For sidebar */
                    jQuery('#sidebar').addClass("mini-menu");
                    jQuery('#main-content').addClass("margin-left-50");
                    jQuery('.sidebar-collapse i').removeClass(iconLeft);
                    jQuery('.sidebar-collapse i').addClass(iconRight);
                    /* Remove placeholder from Search Bar */
                    jQuery('.search').attr('placeholder', '');
                    is_collapsed = true;
                }
                $("#main-content").on('resize', function (e) {
                    e.stopPropagation();
                });
            }
        },
        handleMobileSidebar:function(){
             var menu = $('.sidebar');
        if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('#sidebar').removeAttr('style');
        }
        menu.slimScroll({
            size: '7px',
            color: '#a1b2bd',
            opacity: .3,
            height: "100%",
            allowPageScroll: false,
            disableFadeOut: false
        });
        }

    })

    //usually returning the object you created...
    return Header;
});