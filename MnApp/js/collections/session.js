define(['jquery', 
		'underscore', 
		'backbone',
		'models/session'
], function($, _, Backbone,sessionModel) {
	var NewsCollection = Backbone.Collection.extend({

		model:sessionModel,
		url:'../User/user'

	})
    
    //usually returning the object you created...
    return new NewsCollection()
});