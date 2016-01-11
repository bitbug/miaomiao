define(['mn',
    'text!templates/dashboard.html'
], function(Mn, template) {
    var Dashboard = Mn.ItemView.extend({
        initialize: function(option) {
            console.log(Router.admin)
        }
    })

    //usually returning the object you created...
    return Dashboard;
});