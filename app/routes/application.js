import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
    renderTemplate: function() {
        this._super();
        return this.render('menu', {
            into: 'application',
            outlet: 'menu',
        });
    },
});

export default ApplicationRoute;