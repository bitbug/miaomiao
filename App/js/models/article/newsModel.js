define(['jquery', 
		'underscore', 
		'backbone'
], function($, _, Backbone) {
	var NewsModel = Backbone.Model.extend({
		url:"./index.php/News/getArticleById",
		idAttribute:"ArticleId"
	})
    
    //usually returning the object you created...
    return NewsModel
});