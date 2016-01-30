define(['jquery', 
		'underscore', 
		'backbone'
], function($, _, Backbone) {
	var NewsModel = Backbone.Model.extend({
		idAttribute:"ArticleId"
	})
    
    //usually returning the object you created...
    return NewsModel
});