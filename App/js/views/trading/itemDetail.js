define(['mn',
    'text!templates/trading/itemDetail.html',
    'text!templates/trading/editItem.html',
    'alertify',
    'moment',
    'bootstrap',
    'cookie'
], function(Mn, template,editTemplate,alertify, moment,bootstrap,cookie) {
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
            "click #photoManager":"routeToPhoto",
            "click #contact":"contactSeller",
            "click #makeQuote":"makeQuote",
            "click #checkQuoting":"checkQuoting"
        },
        checkQuoting:function(){
           MMAPP.router.navigate("quotingList/?title=quoting/?ProductId="+this.model.id,{trigger:true}) 
        },
        makeQuote:function(){
            var _this=  this
            alertify.prompt("输入报价金额",function(e,price){
                if(e){
                    var postData = _this.model.toJSON();
                    //reset info
                    postData["UserCreated"]= MMAPP.user.id;
                    postData["Type"]="quoting";
                    postData["Price"] = price;
                    postData["RelateProduct"]=postData["ProductId"];

                    $.ajax({
                        url:"./index.php/Products/product",
                        type:"post",
                        data:postData
                    }).done(function(){
                        alertify.alert("报价成功")
                    })

                }          
            })
        },
        contactSeller:function(){
            //$.cookie('viewCount', '', { expires: -1 });
            var phoneNumber = this.model.get("PhoneNumber")
            if(MMAPP.user.get("LimitTimes")){
                //if counter doesn't exist, create one
                if(!$.cookie("viewCount")){
                    $.cookie("viewCount",0,{expires: 1, path: '/'})
                }

                //if less than the limit, alert the phone number
                if($.cookie("viewCount") < MMAPP.user.get("LimitTimes")){
                    alertify.alert(phoneNumber);
                    $.cookie("viewCount",Number($.cookie("viewCount"))+1);

                }else{
                    alertify.alert("已经超过今日查看次数，请升级会员")
                }

            }else{
                alertify.alert(phoneNumber)
            }
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