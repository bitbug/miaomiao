define(['jquery', 
		'underscore', 
		'backbone',
		'BaseView',
		'collections/newsCollection',
		'text!templates/dashboard.html'
], function($, _, Backbone,BaseView,collection,template) {
	var Dashboard = BaseView.extend({
		initialize:function(){
			collection.fetch().done(function(response){
				console.log(response);
			})
		}
	})
    
    //usually returning the object you created...
    return Dashboard;
});