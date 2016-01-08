<!DOCTYPE html>
<html>
    <head>
<!-- <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,300|Oswald:400,300,700' rel='stylesheet' type='text/css'> -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
        
        <link rel="stylesheet" type="text/css" href="/miaomiao/MnApp/css/bootstrap-3.2.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="MnApp/js/lib/alertify/alertify.css">
        <link rel="stylesheet" href="MnApp/js/lib/alertify/alertify.bootstrap.css">
        <link rel="stylesheet" type="text/css" href="MnApp/css/font-awesome.css">
        <link rel="stylesheet" type="text/css" href="MnApp/css/animate.css">
        <link rel="stylesheet" type="text/css" href="MnApp/css/miaomiao.css">

       
        <!-- Add your own css file for equipment app here -->

    


    </head>
    <body>

        <link rel="stylesheet" href="MnApp/css/views/login.css">
        <div id="loginContainer" >
        <div id="loginView">
            <form action="" id="loginForm">
                <div class="form-group">
                    <label for="userName">用户名</label>

                    <div>
                        <input type="text" class="form-control" id="userName" name="UserName">
                    </div>
                    
                </div>
                <div class="form-group">
                    <label for="passWord">密码</label>

                    <div >
                        <input type="password" class="form-control" id="passWord" name="PassWord">
                    </div>

                </div>
                <button type="submit" class="btn btn-primary" id="loginBtn">登陆</button>
            </form>
        <input type="text" style="display:none" id="last_url" value="<?php echo $last_url;?>"/>
        </div>
        </div>
        <script src="MnApp/js/lib/jquery.js"></script>
        <script src="MnApp/js/lib/bootstrap-3.2.0/js/bootstrap.min.js"></script>
        <script src="MnApp/js/lib/alertify/alertify.min.js"></script>
        <script src="MnApp/js/login/login.js"></script>
    </body>
</html>