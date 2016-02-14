define(['mn',
], function(Mn) {
        RootLayout = Backbone.Marionette.LayoutView.extend({

        el: '#appContainer',

        regions: {
        	header:"#header",
            nav: '#nav',
            main: '#main'        
        }
    });


    return RootLayout;
});