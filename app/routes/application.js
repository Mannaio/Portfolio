import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
    renderTemplate: function() {
        this._super();
        return this.render('menu', {
            into: 'application',
            outlet: 'menu',
        });
    },
	  beforeModel: function() {
	    this.transitionTo('index');
	  }
    // model: function(params){
	   // return Ember.$.getJSON("https://api.github.com/users/" + params.mannaio);
    // },
});

export default ApplicationRoute;