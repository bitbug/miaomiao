define(['mn',
], function(Mn) {
    Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "dashboard":"showDashboard",
            "?des=:des?filter=:filter":"showProductList"
        },
        onRoute:function(name,path,arguments){
            var _this = this
                breadList = '';
            arguments.forEach(function(seg){
                if(seg){
                    seg = _this.parseCh(seg);              
                    item="<li><i class='fa fa-lg fa-angle-right'></i></li><li><a title='"+seg+"'>"+seg+"</a></li>";
                    breadList+=item
                }
            })
            $("#breadcrumb").html(breadList)
        },
        parseCh:function(phrase){
            var enToCh={
                "seedling":"树苗交易",
                "garden":"园艺资材",
                "selling":"供应",
                "buying":"求购",
                "quoting":"报价"
            };
            return enToCh[phrase];
        }
    });

    // var Router = Mn.AppRouter.extend({
    //     routes: {
    //         "": "index"
    //     },
    //     index: function() {
    //         this.loadApp('views/dashboard')
    //     },
    //     setStage: function() {
    //         var _this = this,
    //             def = $.Deferred();
    //         this.getAdmin().done(function() {

    //             $.when(_this.loadView('views/header', {
    //                 el: "#header"
    //             }), _this.loadView("views/menu", {
    //                 el: "#menu"
    //             })).done(function() {
    //                 _this.stageSet = true
    //                 def.resolve()
    //             })
    //         })
    //         return def
    //     },

    //     loadApp: function(view, option) {
    //         var def = $.Deferred(),
    //             _this = this;

    //         if (this.stageSet) {
    //             def.notify()
    //         } else {
    //             this.setStage().done(function() {
    //                 def.notify();
    //             });
    //         }

    //         def.progress(function() {
    //             _this.loadView(view, option).done(function() {
    //                 def.resolve();
    //             });
    //         })
    //         return def.promise()
    //     },
    //     loadView: function(viewLink, option) {
    //         var def = $.Deferred(),
    //             _this = this;

    //         if (option["el"] === undefined) {
    //             option["el"] = "#mainView"
    //         }
    //         require([viewLink], function(view) {
    //             App.AppRegion.show(new view(option));
    //             def.resolve();
    //         });

    //         return def.promise()
    //     },
    //     getAdmin: function() {
    //         var def = $.Deferred(),
    //             _this = this;
    //         sessionModel.fetch().done(function() {
    //             _this.admin = sessionModel;
    //             def.resolve()
    //         }).fail(function() {
    //             def.reject()
    //         })

    //         return def.promise()
    //     },
    // });

     return Router;
});