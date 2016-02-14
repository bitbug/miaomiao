<!DOCTYPE html>
<html>
    <head>
<!-- <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,300|Oswald:400,300,700' rel='stylesheet' type='text/css'> -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
        
        <link rel="stylesheet" type="text/css" href="<?= base_url().'MnApp/css/bootstrap-3.2.0/css/bootstrap.css'?>">
        
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/bootstrapOverrides.css'?>">
        <link rel="stylesheet" type="text/css" href="//cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.css">
        <link rel="stylesheet" href="<?=base_url().'lib/alertify/alertify.css'?>">
        <link rel="stylesheet" href="<?=base_url().'lib/alertify/alertify.bootstrap.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/animate.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'App/css/mmuser.css'?>">

       
        <!-- Add your own css file for equipment app here -->

    

    </head>
    <body>
        <div id="appContainer" class="container-fluid">
            <div>
                <div id="header"></div>
                <div id="main"class="wrap-fluid">
                <div id="nav"></div>
                </div>
                </div>
            </div>
        </div>
      <!--  <script data-main="App/js/main" src="App/js/require/require.min.js"></script>-->
      <script data-main="<?=base_url().'App/js/main'?>" src="<?=base_url().'MnApp/js/require/require.min.js'?>"></script>
    </body>
</html>