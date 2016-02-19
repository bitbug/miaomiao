define(['jquery', 
		'underscore', 
		'backbone',
		'models/article/newsModel',
        'fuse'
], function($, _, Backbone,newsModel,Fuse) {
	var NewsCollection = Backbone.Collection.extend({
		model:newsModel,
		url:'./index.php/News/articleList',
		fuzzySearch:function(query){
            var initData = this.toJSON(),
                keys = ["UserName","Title","Slug","Content","ArticleDateCreated"],
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
    return new NewsCollection()
});