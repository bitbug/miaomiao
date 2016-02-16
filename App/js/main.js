// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    baseUrl: 'http://localhost:8888/miaomiao/App/',
    waitSeconds: 60,
    map: {
        '*': {
            'css': '/miaomiao/lib/css' // or whatever the path to require-css is
        }
    },
    paths: {
        alertify: '/miaomiao/lib/alertify/alertify.min',
        jquery: '/miaomiao/lib/jquery',
        underscore: '/miaomiao/lib/loDash',
        backbone: '/miaomiao/lib/backbone',
        footable: '/miaomiao/lib/footable/js/footable',
        fuse: '/miaomiao/lib/fuse/fuse.min',
        mn: '/miaomiao/lib/backbone.marionette',
        moment: '/miaomiao/lib/moment/moment',
        mdModal: 'js/views/mdModal',
        upload: 'js/upload',
        bootstrap: '/miaomiao/lib/bootstrap-3.2.0/js/bootstrap.min',
        templates: 'templates',
        controller: "js/controller",
        rootLayout: "js/rootLayout",
        router: 'js/router',
        views: 'js/views',
        text: 'js/text',
        //async: 'App/viper/js/async',
        // chartjs: 'js/chartjs/js/Chart',
        //gridster: '3rdParty/gridster/js/jquery.gridster',
        // BaseView: 'js/views/baseView',
        collections: 'js/collections',
        models: 'js/models',
        Modernizr: 'js/Modernizr/js/modernizr2.8.3.custom',
        slimScroll:'/miaomiao/lib/jQuery-slimScroll-1.3.0/jquery.slimscroll.min'
        // BSDatePicker: 'js/bs-datepicker/js/bootstrap-datepicker',
        // pager: 'js/objects/pagination/js/pager',
        // maskLoader: 'js/objects/maskLoader/maskLoader',
        // mdModal: 'js/objects/mdModal/js/mdModal'
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
        'footable': {
            'deps': ['css!/miaomiao/lib/footable/css/footable-demos.css', 'css!/miaomiao/lib/footable/css/footable.core.css']
        },
        'Modernizr': {
            'exports': 'Modernizr'
        },
        'BSDatePicker': {
            'deps': ['bootstrap']
        },
        'mn': {
            'deps': ['jquery', 'underscore', 'backbone']
        }
    },

});

require([
    // Load our app module and pass it to our definition function
    'js/app', //this is the app.js file, relative to this config/main file
], function(MMAPP) {
    // The "app" dependency is passed in as "App"
    MMAPP.start()
});