define(['mn',
], function(Mn) {
        RootLayout = Backbone.Marionette.LayoutView.extend({

        el: '#appContainer',

        regions: {
        	header:"#header",
        	menu:"#sidebar",
            main: '#main-content'        
        }
    });


    return RootLayout;
});