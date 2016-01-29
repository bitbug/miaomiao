// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    baseUrl: 'http://localhost:8888/miaomiao/MnApp/',
    waitSeconds: 60,
    map: {
      '*': {
        'css': 'js/lib/css' // or whatever the path to require-css is
            }
    },
    paths: {
        alertify: 'js/lib/alertify/alertify.min',
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/loDash',
        backbone: 'js/lib/backbone',
        footable:'js/lib/footable/js/footable',
        fuse:'js/lib/fuse/fuse.min',
        mn: 'js/lib/backbone.marionette',
        moment:'js/lib/moment/moment',
        mdModal: 'js/views/mdModal',
        bootstrap: 'js/lib/bootstrap-3.2.0/js/bootstrap.min',
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
        // BSDatePicker: 'js/bs-datepicker/js/bootstrap-datepicker',
        // pager: 'js/objects/pagination/js/pager',
        // maskLoader: 'js/objects/maskLoader/maskLoader',
        // mdModal: 'js/objects/mdModal/js/mdModal'
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
        'footable':{
            'deps':['css!js/lib/footable/css/footable-demos.css','css!js/lib/footable/css/footable.core.css']
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
], function(App) {
    // The "app" dependency is passed in as "App"
    App.start()
});