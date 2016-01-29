define(['jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'fuse'
], function($, _, Backbone, sellingModel,Fuse) {
    var UserListCollection = Backbone.Collection.extend({
        model: sellingModel,
        url: '../User/userList',
        fuzzySearch:function(query){
            var initData = this.toJSON(),
                keys = ["UserName","WechatId","Address","Phone","Email","RoleName","DateCreated"],
                queryArr = query.split(" "),
                fuse,
                result;

            for(var i=0;i<queryArr.length;i++){
                fuse = new Fuse(initData,{keys:keys});

                if(queryArr[i]!=""){
                    result = fuse.search(queryArr[i]);                   
                }
                initData = result;
            }
            return result
        },

    })

    //usually returning the object you created...
    return new UserListCollection()
});