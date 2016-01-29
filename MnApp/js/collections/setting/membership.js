define(['jquery',
    'underscore',
    'backbone',
    'models/setting/membership',
], function($, _, Backbone, model) {
    var MembershipCollection = Backbone.Collection.extend({
        model: model,
        url: '../Setting/membershipList',
    })

    //usually returning the object you created...
    return new MembershipCollection()
});