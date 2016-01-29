define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var UserModel = Backbone.Model.extend({

    	idAttribute: "Id"
    })

    //usually returning the object you created...
    return UserModel
});