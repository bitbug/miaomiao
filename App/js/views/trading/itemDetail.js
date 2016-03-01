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
                    model:object.model,
                    specListBuilder:object.specListBuilder
                })
            }

        },
        serializeData: function() {
            return {
                model: this.model,
                photoCollection: this.photoCollection,
                basurl:MMAPP.basePhotoPath,
                mode:this.mode,
                specListBuilder:this.specListBuilder
            }
        },
        specListBuilder:function(){
            var lists = '',
                _this = this;
            if(this.model.get("DiJin")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>地径</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("DiJin")+'" name="DiJin"><span class="input-group-addon specUnit">cm</span></div><span class="pull-right"><i class="fa fa-icon-minus-sign "></i></span></li>'
            };
            if(this.model.get("MiJin")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>米径</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("MiJin")+'" name="MiJin"><span class="input-group-addon specUnit">cm</span></div></li>'
            };
            if(this.model.get("XiongJin")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>胸径</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("DiJin")+'" name="XiongJin"><span class="input-group-addon specUnit">cm</span></div></li>'
            };
            if(this.model.get("GuanFu")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>冠幅</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("GuanFu")+'" name="GuanFu"><span class="input-group-addon specUnit">cm</span></div></li>'
            };
            if(this.model.get("GaoDu")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>高度</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("GaoDu")+'" name="GaoDu"><span class="input-group-addon specUnit">cm</span></div></li>'
            };
            if(this.model.get("TuQiu")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>土球</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("TuQiu")+'" name="TuQiu"><span class="input-group-addon specUnit">cm</span></div></li>'
            };
            if(this.model.get("TiaoChang")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>条长</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("TiaoChang")+'" name="TiaoChang"><span class="input-group-addon specUnit">cm</span></div></li>'
            };
            if(this.model.get("ShuLing")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>树龄</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("ShuLing")+'" name="ShuLing"><span class="input-group-addon specUnit">年</span></div></li>'
            };
            if(this.model.get("FenZhi")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>分支</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("FenZhi")+'" name="FenZhi"><span class="input-group-addon specUnit">个</span></div></li>'
            };
            if(this.model.get("FenZhiDian")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>分支点</p></div><div style="width:48%" class="valueContainer pull-right input-group"><input typxe="text" class="form-control" value="'+this.model.get("FenZhiDian")+'" name="FenZhiDian"><span class="input-group-addon specUnit">m</span></div></li>'
            };
            if(this.model.get("Mao")){
                lists +='<li class="spec" style="overflow:hidden"><div style="width:48%" class="pull-left"><p>帽</p></div><div style="width:48%" class="valueContainer pull-right"><select class="form-control" name="Mao"><option value="year">年帽</option><option value="full">全冠</option><option value="half">半冠</option></select></div></li>'
                 $(lists).find("option[value='"+this.model.get("Mao")+"']").selected = true

            };

            return lists

        },
        events:{
            "click #update":"changeRecord",
            "click #delete":"deleteRecord",
            "click #photoManager":"routeToPhoto",
            "click #contact":"contactSeller",
            "click #makeQuote":"makeQuote",
            "click #checkQuoting":"checkQuoting",
            "click #addSpec":"anotherSpec",
            "change .spec":"changeUnit"
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

            e.preventDefault();
            var _this = this,
                specInfo = {},
                formData = $("#itemForm").serializeObject();
            this.$el.find(".valueContainer").each(function(index,container){
                if($(container).find("input").length>0){
                    _.extend(specInfo,$(container).find("input").serializeObject());
                }else{
                    _.extend(specInfo,$(container).find("select").serializeObject());
                }

            });
            _.extend(formData,specInfo);
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