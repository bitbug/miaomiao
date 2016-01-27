define(['mn',
    'views/trading/sellingItemView',
    'text!templates/trading/selling.html',
], function(Mn, itemView, template) {

    var SellingAppView = Mn.CompositeView.extend({
        childView: itemView,
        childViewContainer: "#dataBody",
        initialize: function(option) {
            this.fullCollection = option.collection.toJSON()
        },
        template: function() {
            return _.template(template)
        },
        ui: {
            searchInput: "#searchBox",
            searchButton: "#searchButton"
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

        }, 1000)
    })

    //usually returning the object you created...
    return SellingAppView;
});