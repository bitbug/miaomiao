define(['mn',
    'collections/trading/photo',
    'text!templates/photoView.html',
], function(Mn, collection, template) {
    var PhotoView = Backbone.View.extend({
        initialize: function(option) {
            var _this = this;
            this.model = option.model;
            collection.reset();
            collection.fetch({
                data: $.param({
                    "FileType": "ProductPhoto",
                    "ProductId": this.model.id
                })
            }).done(function() {
                _this.render(collection)
            })
        },

        render: function(collection) {
            var baseurl = App.basePhotoPath;
            var preparedTempalte = _.template(template, {
                model: this.model,
                collection: collection,
                baseurl: baseurl
            });
            this.$el.html(preparedTempalte)
        },
        triggerUpload: function() {
            this.$el.find(".uploadTrigger").trigger("click")
        },
        uploadPhoto: function() {
            var fileList = this.$el.find("#upload")[0].serializeObject().files
            console.log(fileList)
        },
        events: {
            "click .addButton": "triggerUpload",
            "change [type='file']": "uploadPhoto"
        }
    })

    //usually returning the object you created...
    return PhotoView;
});