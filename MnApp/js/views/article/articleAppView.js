define(['mn',
    'views/article/articleItem',
    'text!templates/article/article.html',
], function(Mn, itemView, template) {

    var ArticleAppView = Mn.CompositeView.extend({
        childView:itemView,
        childViewContainer:"#articleBody",
        initialize: function(option) {
            var _this = this;
            this.fullCollection = option.collection.toJSON();
            this.listenTo(this.collection,"change",this.render);

        },
        template: function() {
            return _.template(template)
        },
        ui: {
            searchInput: "#searchBox",
            newButton: "#newArticle"
        },
        events: {
            "keyup @ui.searchInput": "runSearch",
            "click @ui.newButton":"createArticle"
        },
        createArticle:function(){
            App.modal.show("views/article/newArticle",{
                title:"新文章",
                collection:this.collection
            })
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
    return ArticleAppView;
});