define(['mn',
    'text!templates/menu.html'
], function(Mn, template) {
    var MenuView = Mn.View.extend({
        className:"sidebar-menu nav-collapse",
        initialize: function() {
            this.render();
        },
        render: function() {
            var preparedTemplate = _.template(template);
            this.$el.html(preparedTemplate)
        },
        events:{
            "click .has-sub>a":"toggleSub"
        },
        toggleSub:function(e){
            var last = jQuery('.has-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);           
            var thisElement = $(e.currentTarget); 
            var sub = jQuery(e.currentTarget).next();
            var slideSpeed = 200;

            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(e.currentTarget)).removeClass("open");
                jQuery(e.currentTarget).parent().removeClass("open");
                sub.slideUp(slideSpeed);
            } else {
                jQuery('.arrow', jQuery(e.currentTarget)).addClass("open");
                jQuery(e.currentTarget).parent().addClass("open");
                sub.slideDown(slideSpeed);
            }
        }
    })

    //usually returning the object you created...
    return MenuView;
});