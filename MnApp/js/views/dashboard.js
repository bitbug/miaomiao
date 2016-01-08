define(['mn',
		'collections/newsCollection',
		'text!templates/dashboard.html'
], function(Mn,collection,template) {
	var Dashboard = Mn.ItemView.extend({
		template:template,
		initialize:function(){
			var _this = this;
			collection.fetch().done(function(response){
				console.log(response);
				_this.render()
			})
		}
	})
    
    //usually returning the object you created...
    return Dashboard;
});