import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
	visibility: Ember.inject.service('visible'),
	model: function(params) {
		var url, self, git;
		self = this;
		git = this.store.createRecord('git',{});
		url = 'https://api.github.com/users/mannaio';
		return new Ember.RSVP.Promise(function(resolve, reject) {
			return Ember.$.getJSON(url, function(data) {
				var item = [];
				git.setProperties({
					name: data.name,
					login: data.login,
					location: data.location,
					company: data.company,
					followers: data.followers,
					following: data.following
				});
				item.pushObject(git);
				return resolve(item);
			});
		});
	},
    afterModel: function() {
        this.set('visibility.isVisible', true);
    }
});

export default IndexRoute;