define(['mn',
	    'views/login',
	    'views/dashboard'
	   ], function(Mn,LoginView,dashboard) {

	var Controller = Mn.Controller.extend({
		dashboard:function(){

		},
		index:function(){
			App.AppRegion.show(new dashboard())
		},
		login:function(){
			App.AppRegion.show(new LoginView())
		},
	})

	return new Controller()
});