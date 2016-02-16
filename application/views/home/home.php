<!DOCTYPE html>
<html>
    <head>
<!-- <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,300|Oswald:400,300,700' rel='stylesheet' type='text/css'> -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
        
        <link rel="stylesheet" type="text/css" href="<?= base_url().'App/css/cloud-admin.css'?>">
        
        <link rel="stylesheet" type="text/css" href="<?=base_url().'App/css/themes/default.css'?>" id="skin-switcher" >
        <link rel="stylesheet" type="text/css" href="//cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.css">
        <link rel="stylesheet" type="text/css" href="<?= base_url().'App/css/responsive.min.css'?>">
        <link rel="stylesheet" href="<?=base_url().'lib/alertify/alertify.css'?>">
        <link rel="stylesheet" href="<?=base_url().'lib/alertify/alertify.bootstrap.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'App/css/animate.min.css'?>">
        <link rel="stylesheet" type="text/css" href="<?=base_url().'App/css/mmuser.css'?>">

       
        <!-- Add your own css file for equipment app here -->

    

    </head>
    <body>

        <div id="appContainer" class="container-fluid">
            <header class="navbar clearfix" id="header">
            </header>
            <section id="page">
                <div id="sidebar" class="sidebar">
                </div>
                <div id="main-content">
                </div>
            </section>
        </div>
      <!--  <script data-main="App/js/main" src="App/js/require/require.min.js"></script>-->
      <script data-main="<?=base_url().'App/js/main'?>" src="<?=base_url().'MnApp/js/require/require.min.js'?>"></script>

    </body>
</html>