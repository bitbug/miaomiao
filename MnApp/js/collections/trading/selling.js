define(['jquery', 
		'underscore', 
		'backbone',
		'models/trading/selling'
], function($, _, Backbone,sellingModel) {
	var SellingCollection = Backbone.Collection.extend({
		model:sellingModel,
		url:'../Products/sellingListing'

	})
    
    //usually returning the object you created...
    return new SellingCollection()
});