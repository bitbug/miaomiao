define(['mn',
    'text!templates/menu.html'
], function(Mn, template) {
    var Menu = Mn.ItemView.extend({
        template: function(data) {
            return _.template(template, data)
        },

    })

    //usually returning the object you created...
    return Menu;
});