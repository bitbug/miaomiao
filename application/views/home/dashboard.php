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
        <link rel="stylesheet" type="text/css" href="<?=base_url().'MnApp/css/miaomiao.css'?>">

       
        <!-- Add your own css file for equipment app here -->

    

    </head>
    <body>
        <div id="appContainer" class="container-fluid">
            <header id="header" class="navbar navbar-static-top"></header>
            <div>
                <div id="menu"></div>
                <div id="mainPanel"class="wrap-fluid">
                    <div class="container-fluid paper-wrap bevel tlbr">
                    <!-- CONTENT -->
                    <!--TITLE -->
                    <div class="row">
                        <div id="paper-top">
                            <div class="col-lg-3">
                                <h5 class="tittle-content-header">
                                    <i class="icon-window"></i> 
                                    <span>
                                    </span>
                                </h5>

                            </div>
                        </div>
                    </div>
                    <!--/ TITLE -->

                    <!-- BREADCRUMB -->
                    <ul id="breadcrumb">
<!--                         <li><i class="fa fa-lg fa-angle-right"></i>
                        </li>
                        <li><a href="#" title="Sample page 1">首页</a>
                        </li>
                        <li><i class="fa fa-lg fa-angle-right"></i>
                        </li>
                        <li><a href="#" title="Sample page 1">控制面板</a>
                        </li> -->
                    </ul>
                    <div class="content-wrap" id="main">


                    </div>
                        <!-- / END OF FOOTER -->
                    </div>
                </div>
                </div>
            </div>
        </div>
      <!--  <script data-main="App/js/main" src="App/js/require/require.min.js"></script>-->
      <script data-main="<?=base_url().'MnApp/js/main'?>" src="<?=base_url().'MnApp/js/require/require.min.js'?>"></script>
    </body>
</html>