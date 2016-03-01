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
            "click #addSpec":"anotherSpec",
            "change .spec":"changeUnit"
            // "change [type='file']": "uploadImg"
        },
        changeUnit:function(e){
            var $li = $(e.currentTarget).parents("li.spec"),
                $input = $li.find(".valueContainer");
            $input.html("<input typxe='text' class='form-control' name='"+$(e.currentTarget).val()+"'><span class='input-group-addon specUnit'>cm</span>");
            switch($(e.currentTarget).val()){
                case "DiJin":
                case "MiJin":
                case "XiongJin":
                case "GuanFu":
                case "GaoDu":
                case "TuQiu":
                case "TiaoChang":
                    $input.find(".specUnit").text("cm");
                break;
                case "ShuLing":
                    $input.find(".specUnit").text("年");
                break;
                case "FenZhi":
                    $input.find(".specUnit").text("个");
                break;
                case "FenZhiDian":
                    $input.find(".specUnit").text("m");
                 break;
                case "Mao":
                    $input.html("<select class='form-control' name='Mao'><option value='year'>年帽</option><option value='full'>全冠</option><option value='half'>半冠</option></select>");
                break;
            };
        },
        anotherSpec:function(){
            var $newSpec = $("#specs li:last-child").clone();
            $newSpec.find("input").val("");
            $("#specs").append($newSpec)
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
            e.preventDefault();
            var specInfo = {},
                formData = $("#newInfoForm").serializeObject(),
                data = _.extend(formData, {
                    "ProductDateCreated": moment().format(),
                    "UserCreated": MMAPP.user.id
                }),
                fileList = this.$el.find("#uploadImg")[0].files,
                _this = this;

            this.$el.find(".valueContainer").each(function(index,container){
                if($(container).find("input").length>0){
                    _.extend(specInfo,$(container).find("input").serializeObject());
                }else{
                    _.extend(specInfo,$(container).find("select").serializeObject());
                }

            });

            data = _.extend(data,specInfo)
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