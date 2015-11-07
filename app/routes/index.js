import Ember from 'ember';

var IndexRoute = Ember.Route.extend({

	visibility: Ember.inject.service('visible'),
    afterModel: function() {
        this.set('visibility.isVisible', true);
    },
    // renderTemplate: function() {
    //     this._super();
    //     return this.render('menu', {
    //         into: 'application',
    //         outlet: 'menu',
    //     });
    // },
});

export default IndexRoute;