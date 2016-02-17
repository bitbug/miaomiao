define(['mn',
    'collections/trading/searchProduct',
    'views/trading/productItemView',
    'text!templates/trading/product.html',
], function(Mn,searchProductCol,itemView, template) {

    var ProductAppView = Mn.CompositeView.extend({
        childView: itemView,
        childViewContainer: "#productContainer",
        initialize: function(option) {
            var _this = this;
            this.des = option.des;
            this.filter = option.filter;
            this.listenTo(this.collection,"change",this.render)
        },
        template: function() {
            return _.template(template)
        },
        ui: {
            searchButton: "#searchButton",
        },
        events: {
            "click @ui.searchButton": "runSearch"
        },
        runSearch: function() {
            var _this = this,
                query = $("#searchBox").val();
            searchProductCol.fetch({data:$.param({
                "Query":query,
                "ProductType":_this.des,
                "Type":_this.filter
            })}).done(function(){
                _this.collection.reset(searchProductCol.toJSON())
            })

            // if (query != "") {
            //     this.collection.reset(this.fullCollection, {
            //         silent: true
            //     });
            //     var resultCollection = this.collection.fuzzySearch(query);
            //     this.collection.reset(resultCollection)
            // } else {
            //     this.collection.reset(this.fullCollection);
            // }

        }
    })

    //usually returning the object you created...
    return ProductAppView;
});