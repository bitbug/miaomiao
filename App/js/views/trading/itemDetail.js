define(['mn',
    'text!templates/trading/itemDetail.html',
    'alertify',
    'moment',
    'bootstrap'
], function(Mn, template, alertify, moment,bootstrap) {
    var ItemDetailView = Mn.ItemView.extend({
        initialize: function(option) {
            this.ProductId = option.ProductId;
            this.photoCollection = option.photoCollection;
            this.model = option.model
        },
        template: function(object) {
            return _.template(template, {
                model: object.model,
                photoCollection: object.photoCollection,
                baseurl:object.basurl
            })
        },
        serializeData: function() {
            return {
                model: this.model,
                photoCollection: this.photoCollection,
                basurl:MMAPP.basePhotoPath
            }
        },
        onRender:function(){

            $("#photoSliders").carousel()

        },
        events: {
            "click #change": "changeRecord",
            "click #delete": "deleteRecord",
        }
    })

    //usually returning the object you created...
    return ItemDetailView;
});