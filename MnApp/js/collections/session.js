define(['jquery', 
		'underscore', 
		'backbone',
		'models/session'
], function($, _, Backbone,sessionModel) {
	var NewsCollection = Backbone.Collection.extend({

		model:sessionModel,
		url:'index.php/Landing/getSession'

	})
    
    //usually returning the object you created...
    return new NewsCollection()
});