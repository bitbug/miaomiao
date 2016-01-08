define(['mn',
		'text!templates/login.html'
], function(Mn,template) {
	var Login = Mn.ItemView.extend({
		template:template,
		initialize:function(){
			var _this = this;
			this.render()
		},
		ui:{
			login:"#login"
		},
		submitForm:function(e){
			e.preventDefault();
			var formData = this.$el.find("form").serializeObject();
			$.ajax({
				url:"index.php/News/getAllNews",
				data:$.param({
					data:formData
				}),
				type:"POST"
			})
			
		},
		events:{
			"click @ui.login":"submitForm"
		}
	})
    
    //usually returning the object you created...
    return Login;
});