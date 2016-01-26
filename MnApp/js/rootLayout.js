define(['mn',
], function(Mn) {
        RootLayout = Backbone.Marionette.LayoutView.extend({

        el: '#appContainer',

        regions: {
            header: '#header',
            main: '#main',
            menu:"#menu"
        }
    });


    return RootLayout;
});