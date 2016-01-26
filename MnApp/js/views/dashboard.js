define(['mn',
    'text!templates/dashboard.html'
], function(Mn, template) {
    var Dashboard = Mn.ItemView.extend({
    	template:function(){
    		return _.template(template)
    	}
    })

    //usually returning the object you created...
    return Dashboard;
});