define([
    'mn',
    'text!templates/newInfo.html',
    'alertify',
    'moment',
    'upload'
], function(Mn, template, alertify, moment, Upload) {
    var ItemDetailView = Backbone.View.extend({
        initialize: function(option) {
            this.model = option.model;
            this.render();

        },
        render: function() {
            this.$el.html(template)
        },
        events: {
            "click #create": "createInfo",
            // "change [type='file']": "uploadImg"
        },
        uploadPhoto: function(fileList, ProductId) {
            var _this = this,
                options = {
                    ProductId: ProductId, //productid
                    FileType: 'ProductPhoto',
                    UserId: this.model.id,
                    allowedExtensions: ['jpeg', 'jpg', 'pdf', 'png'], //array of allowed extensions
                    url: '../Products/productPhoto' //location to REST service
                },
                uploadObj = new Upload(this, options);
            uploadObj.addFiles(fileList);
            $(uploadObj).on('fileAdded', function(e, data) {
                App.modal.close();
                alertify.alert("发布成功");
            })

        },
        createInfo: function(e) {
            e.preventDefault()
            var formData = $("#newInfoForm").serializeObject(),
                data = _.extend(formData, {
                    "ProductDateCreated": moment().format(),
                    "UserCreated": this.model.id
                }),
                fileList = this.$el.find("#uploadImg")[0].files,
                _this = this;

            $.ajax({
                url: "../Products/product",
                type: "POST",
                data: data,
                dataType: "JSON"
            }).done(function(ProductId) {
                if (fileList) {
                    _this.uploadPhoto(fileList, ProductId)
                } else {
                    App.modal.close();
                    alertify.alert("发布成功");
                }
            })
        }
    })

    //usually returning the object you created...
    return ItemDetailView;
});