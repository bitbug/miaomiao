define(['jquery',
    'underscore',
    'model/document'
], function($, _, DocumentModel) {
    var TAGDownload = function(theView) {
        //the constructor

        this.theView = theView;
        this.init();
    };

    //the methods...
    TAGDownload.prototype = {
        init: function() {
            this.documentModel = new DocumentModel();

        },
        downloadFile: function(model) {
            var _this = this,
                viewSelector = (this.theView instanceof Backbone.View) ? this.theView.$el.selector : 'body';

            this.documentModel.fetch({
                data: $.param({
                    id: model.get('documentID')
                })
            }).done(function() {
                var theLocation = window.location.origin + window.location.pathname + 'downloadFile/' + _this.documentModel.formatURL_GET();
                //console.log(_this.documentModel)
                location.replace(theLocation);
            }).fail(function() {
                Snack.show({
                    message: ['Error downloading file...'],
                    container: viewSelector
                })
            });


        }
    }

    //usually returning the object you created...
    return TAGDownload;
});
