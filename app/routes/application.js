import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
    renderTemplate: function() {
        this._super();
        return this.render('player', {
            into: 'application',
            outlet: 'player',
            controller: 'player'
        });
    }
});

export default ApplicationRoute;