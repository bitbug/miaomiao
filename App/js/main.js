// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    baseUrl: 'http://localhost:8888/miaomiao/App/',
    waitSeconds: 60,
    paths: {
        jquery: 'js/jquery-1.10.2.min',
        underscore: 'js/loDash',
        backbone: 'js/backbone',
        bootstrap: 'js/bootstrap-3.2.0/js/bootstrap.min',
        templates: 'templates',
        app: 'js/app',
        router: 'js/router',
        views: 'js/views',
        text: 'js/text',
        //async: 'App/viper/js/async',
        chartjs: 'js/chartjs/js/Chart',
        //gridster: '3rdParty/gridster/js/jquery.gridster',
        BaseView: 'js/views/baseView',
        collections: 'js/collections',
        models: 'js/models',
        Modernizr: 'js/Modernizr/js/modernizr2.8.3.custom',
        BSDatePicker: 'js/bs-datepicker/js/bootstrap-datepicker',
        pager: 'js/objects/pagination/js/pager',
        maskLoader: 'js/objects/maskLoader/maskLoader',
        mdModal: 'js/objects/mdModal/js/mdModal'
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
        'Modernizr': {
            'exports': 'Modernizr'
        },
        'BSDatePicker': {
            'deps': ['bootstrap']
        }
    },

});

require([

    // Load our app module and pass it to our definition function
    'app', //this is the app.js file, relative to this config/main file
], function(app) {
    // The "app" dependency is passed in as "App"
    app.initialize();
});