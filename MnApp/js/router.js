define(['mn',
        'controller',
        'collections/session'
], function(Mn,controller,sessionCollection) {

    var Router = Mn.AppRouter.extend({
        initialize:function(){
            var _this = this;
            sessionCollection.fetch().done(function(response){
                console.log(sessionCollection)
            })
        },
        controller:controller,
        appRoutes:{
            "":"index",
            "dashboard":"dashboard"
        },

        // index: function() {
        //     var _this = this;
        
        //     this.loadView('views/login');
        // },



        // loadView: function(targetView, options) {

        //     var def = $.Deferred(),
        //         _this = this;

        //     var options = $.extend({
        //         el: '#appContainer'
        //     }, options);

        //     require([targetView], function(appView) {

        //         _this.app = new appView(options);
        //         def.resolve();
        //     });

        //     return def.promise();
        // },

    });

    return Router;
});