define(['jquery',
    'underscore'
], function($, _) {
    var MDDownloadButton = function(model) {
        //the constructor

        this.button = '<a href="#" class="mdButton blue raised"><i class="fa fa-cloud-download"></i> Download</a>';
        this.init();
    };

    //the methods...
    MDDownloadButton.prototype = {
        init: function() {
            console.log('initing!')
        },
        show: function() {
            return this.button;
        }

    }

    //usually returning the object you created...
    return MDDownloadButton;
});
