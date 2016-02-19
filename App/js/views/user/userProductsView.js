define(['mn',
    'views/user/userProductItem',
    'text!templates/user/userProducts.html',
    'text!templates/user/no-product.html'
], function(Mn,itemView,template,noProduct) {

    var UserProductsView = Mn.CompositeView.extend({
        childView: itemView,
        childViewContainer: "#recordsContainer",
        onBeforeRender: function(view) {
            var _this = this;
            this.filter = view.options.type;
            this.listenTo(this.collection,"change",this.render);
        },
        template: function(obj) {
            if(obj.collection.length>0){
                return _.template(template)
            }else{
                return _.template(noProduct)
            }
        },
        serializeData:function(){
            return {
                collection:this.collection
            }
        },
        ui: {
            newProduct:"#newProduct"
        },
        events: {
            "click @ui.newProduct":"newInfo"
        },
        newInfo:function(e){
            MMAPP.router.navigate("newInfo/?title=newInfo",{trigger:true})
        },
    })

    //usually returning the object you created...
    return UserProductsView;
});