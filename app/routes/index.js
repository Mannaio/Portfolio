import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
    renderTemplate: function() {
        this._super();
        return this.render('menu', {
            into: 'application',
            outlet: 'menu',
        });
    },
});

export default IndexRoute;