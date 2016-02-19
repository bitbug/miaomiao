define(['mn',
    'text!templates/trading/itemDetail.html',
    'text!templates/trading/editItem.html',
    'alertify',
    'moment',
    'bootstrap'
], function(Mn, template,editTemplate,alertify, moment,bootstrap) {
    var ItemDetailView = Mn.ItemView.extend({
        initialize: function(option) {
            this.ProductId = option.ProductId;
            this.photoCollection = option.photoCollection;
            this.model = option.model;
            this.mode = option.mode
        },
        template: function(object) {
            switch(object.mode){
                case "view":
                return _.template(template, {
                model: object.model,
                photoCollection: object.photoCollection,
                baseurl:object.basurl
            })
                break;
                case "edit":
                return _.template(editTemplate,{
                    model:object.model
                })
            }

        },
        serializeData: function() {
            return {
                model: this.model,
                photoCollection: this.photoCollection,
                basurl:MMAPP.basePhotoPath,
                mode:this.mode
            }
        },
        events:{
            "click #update":"changeRecord",
            "click #delete":"deleteRecord",
            "click #photoManager":"routeToPhoto"
        },
        routeToPhoto:function(){
            MMAPP.router.navigate("photoManager/?title=photoManager?productId="+this.model.id,{trigger:true})
        },
        changeRecord: function(e) {
            console.log("triggered")
            e.preventDefault();
            var _this = this,
                formData = $("#itemForm").serializeObject();
            this.model.save(formData, {
                success: function() {
                    alertify.set({
                        labels : {
                            ok   : "确认",
                            cancel : "取消"
                            }
                    })
                    alertify.alert("修改成功");
                    MMAPP.router.navigate("userCenter/?title=my?filter="+_this.model.get("Type")+"?userId="+MMAPP.user.id,{trigger:true});

                }
            })
        },
        deleteRecord: function(e) {
            e.preventDefault();
            var _this = this,
                formData = $("#itemForm").serializeObject();
            _.extend(formData, {
                "DateVoid": moment().format()
            });
            alertify.set({
                labels : {
                    ok   : "确认",
                    cancel : "取消"
                        }
            })
            alertify.confirm("删除的条目不可找回，确定删除？", function(e) {
                if (e) {
                    _this.model.save(formData, {
                        wait: true,
                        success: function() {
                            alertify.alert("删除成功");
                            MMAPP.router.navigate("userCenter/?title=my?filter="+_this.model.get("Type")+"?userId="+MMAPP.user.id,{trigger:true});
                        }
                    })
                }
            })
        },
        onRender:function(){
            $("#photoSliders").carousel()

        }
    })

    //usually returning the object you created...
    return ItemDetailView;
});