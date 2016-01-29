define(['mn',
    'collections/user/userList',
    'views/user/userSelectView',
    'text!templates/user/userApp.html',
], function(Mn, collection, itemView, template) {

    var UserAppView = Mn.CompositeView.extend({
        childView: itemView,
        childViewContainer: "#userBody",
        initialize: function(option) {
            var _this = this;
            this.fullCollection = option.collection.toJSON();
            this.listenTo(this.collection,"change",this.render)
        },
        template: function() {
            return _.template(template)
        },
        ui: {
            searchInput: "#searchBox",
        },
        events: {
            "keyup @ui.searchInput": "runSearch"
        },
        runSearch: _.debounce(function() {
            var _this = this,
                query = $("#searchBox").val();

            if (query != "") {
                this.collection.reset(this.fullCollection, {
                    silent: true
                });
                var resultCollection = this.collection.fuzzySearch(query);
                this.collection.reset(resultCollection)
            } else {
                this.collection.reset(this.fullCollection);
            }

        }, 500)
    })

    //usually returning the object you created...
    return UserAppView;
});