$(document).ready(function() {
    $("#loginBtn").click(function(e) {
        e.preventDefault();

        var UserName = $("#userName").val(),
            PassWord = $("#passWord").val(),
            errors = [];

        if (!$.trim(UserName)) {
            errors.push("请填写用户名");
        };
        if (!$.trim(PassWord)) {
            errors.push("请填写密码");
        };

        if (errors.length == 0) {
            $.ajax({
                url: "/miaomiao/index.php/Admin/adminLogin",
                type: "POST",
                data: $.param({
                    UserName: UserName,
                    PassWord: PassWord
                })
            }).success(function(r) {
                console.log(r);
                window.location = $("#last_url").val()
                return true;
            }).fail(function(response) {
                alertify.error(response.responseText)
            })
        } else {
            alertify.error(errors)
        }

    })
})