define(['mn',
    'collections/trading/photo',
    'text!templates/photoView.html',
    'upload',
    'moment'
], function(Mn, collection, template, Upload, moment) {
    var PhotoView = Backbone.View.extend({
        initialize: function(option) {
            var _this = this;
            this.model = option.model;
            this.collection = collection;
            this.collection.reset();
            this.fetchAndRender();

            this.listenTo(this.collection, "update", this.render)
        },
        fetchAndRender: function() {
            var _this = this;
            this.collection.fetch({
                data: $.param({
                    "FileType": "ProductPhoto",
                    "ProductId": this.model.id
                })
            }).done(function() {
                _this.render(_this.collection)
            })
        },
        render: function() {
            var baseurl = App.basePhotoPath;
            var preparedTempalte = _.template(template, {
                model: this.model,
                collection: this.collection,
                baseurl: baseurl
            });
            this.$el.html(preparedTempalte)
        },
        triggerUpload: function() {
            this.$el.find(".uploadTrigger").trigger("click")
        },
        uploadPhoto: function() {
            var _this = this,
                fileList = this.$el.find("#upload")[0].files,
                ProductId = this.model.id,
                options = {
                    ProductId: ProductId, //productid
                    FileType: 'ProductPhoto',
                    UserId: this.model.get("Id"),
                    allowedExtensions: ['jpeg', 'jpg', 'pdf', 'png'], //array of allowed extensions
                    url: '../Products/productPhoto' //location to REST service
                };
            uploadObj = new Upload(this, options);
            uploadObj.addFiles(fileList);
            $(uploadObj).on('queueComplete', function(e, data) {
                _this.fetchAndRender()
            })
        },
        deletePhoto: function(e) {
            var _this = this,
                FileId = $(e.currentTarget).data("id"),
                selectedModel = this.collection.get(FileId);
            selectedModel.save({
                "FileDateVoid": moment().format()
            }, {
                success: function() {
                    _this.collection.remove(FileId)
                }
            })
        },
        events: {
            "click .addButton": "triggerUpload",
            "change [type='file']": "uploadPhoto",
            "click .deleteButton": "deletePhoto"
        }
    })

    //usually returning the object you created...
    return PhotoView;
});