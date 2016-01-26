define(['mn',
    'text!templates/header.html'
], function(Mn, template) {
    var Header = Mn.ItemView.extend({
        template: function() {
            var _this = this;
            return _.template(template, {
                admin: App.admin
            })
        }

    })

    //usually returning the object you created...
    return Header;
});