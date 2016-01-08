define(['jquery', 
		'underscore', 
		'backbone',
		'models/newsModel'
], function($, _, Backbone,newsModel) {
	var NewsCollection = Backbone.Model.extend({

		model:newsModel,
		url:'index.php/News/getAllNews'


	})
    
    //usually returning the object you created...
    return new NewsCollection()
});