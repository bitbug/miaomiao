define(['mn',
    'text!templates/dashboard.html'
], function(Mn, template) {
    var Dashboard = Mn.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {

            var preparedTemplate = _.template(template, {
                data: this.stats
            });
            this.$el.html(preparedTemplate)
        }
    })

    //usually returning the object you created...
    return Dashboard;
});