define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var Membership = Backbone.Model.extend({
    idAttribute: "Level"
    })

    //usually returning the object you created...
    return Membership
});