define(['jquery', 
		'underscore', 
		'backbone',
		'models/session'
], function($, _, Backbone,sessionModel) {
	var SessionCollection = Backbone.Collection.extend({

		model:sessionModel,
		url:'../User/user'

	})
    
    //usually returning the object you created...
    return new SessionCollection()
});