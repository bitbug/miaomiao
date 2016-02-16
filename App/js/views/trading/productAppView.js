define(['mn',
    'views/trading/productItemView',
    'text!templates/trading/product.html',
], function(Mn, itemView, template) {

    var ProductAppView = Mn.CompositeView.extend({
        childView: itemView,
        childViewContainer: "#productContainer",
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
    return ProductAppView;
});