$(document).ready(function(){
	$("#loginBtn").click(function(e){
		e.preventDefault();

		var UserName = $("#userName").val(),
			PassWord = $("#passWord").val(),
			errors=[];

		if(!$.trim(UserName)){
			errors.push("请填写用户名");
		};
		if(!$.trim(PassWord)){
			errors.push("请填写密码");
		};

		if(errors.length==0){
			$.ajax({
				url:"index.php/Landing/adminLogin",
				type:"POST",
				data:$.param({
					UserName:UserName,
					PassWord:PassWord
				})
			}).success(function(){
				console.log("ok")
                window.location = $("#last_url").val();
                return true;
             
			}).fail(function(response){
				alertify.error(response.responseText)
			})
		}else{
			alertify.error(errors)
		}

	})
})