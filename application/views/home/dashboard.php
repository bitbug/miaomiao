<!DOCTYPE html>
<html>
    <head>
<!-- <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,300|Oswald:400,300,700' rel='stylesheet' type='text/css'> -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
        
        <link rel="stylesheet" type="text/css" href="<?= base_url().'MnApp/css/bootstrap-3.2.0/css/bootstrap.min.css'?>">
        
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/bootstrapOverrides.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/font-awesome.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/animate.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/miaomiao.css'?>">

       
        <!-- Add your own css file for equipment app here -->

    

        <!-- Google Fonts...-->
        <link href='//fonts.googleapis.com/css?family=Roboto:300,700,900|Oswald:400,300,700' rel='stylesheet' type='text/css'>

    </head>
    <body>
        <div id="appContainer" class="container-fluid">
            <header id="header" class="navbar navbar-static-top"></header>
            <div>
                <div id="menu"></div>
                <div id="mainView"></div>
            </div>
        </div>
      <!--  <script data-main="App/js/main" src="App/js/require/require.min.js"></script>-->
      <script data-main="<?=base_url().'MnApp/js/main'?>" src="<?=base_url().'MnApp/js/require/require.min.js'?>"></script>
    </body>
</html>