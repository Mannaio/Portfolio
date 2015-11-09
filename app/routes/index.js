import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
	visibility: Ember.inject.service('visible'),
    model: function(params){
    	var self, url, repoListProxy;
    	self = this;
    	url = 'https://api.github.com/users/Mannaio/repos';
	    repoListProxy = Ember.ArrayProxy.create({
	        content: []
	    });
    	return new Ember.RSVP.Promise(function(resolve, reject) {
    		return Ember.$.getJSON(url, function(repos) {
    			if (repos.length) {
    				repos.toArray().forEach(function(item, index, arr){
    					var repo;
    					repo = self.createReposList(item, repoListProxy);
    				});
    				repos = repoListProxy.get('content');
    				return resolve(repos);
    			}
    		});
    	});
    },
    createReposList: function(repo, arr){
    	var record
    	record = this.store.createRecord('repo',{}),
    	record.setProperties({
    		name: repo.name,
    		description: repo.description
    	})
    	arr.pushObject(record);
    	return record;
    },
    afterModel: function() {
        this.set('visibility.isVisible', true);
    }
});

export default IndexRoute;

    // model: function(params) {
    //     var artist, self, ret;
    //     self = this;
    //     artist = params.artist;
    //     ret = [];
    //     this.controllerFor('application').set('artistName', artist);

    //     return new Ember.RSVP.Promise(function(resolve, reject) {
    //         return SC.get("/users/" + 'mannaio' + "/favorites", {limit: 40 }, function(favorites) {
    //             if (favorites.length) {
    //                 self.resetStore();
    //                 favorites.toArray().forEach(function(item) {
    //                     var favorite;
    //                     favorite = self.createFavoritelist(item);
    //                     ret.push(favorite);
    //                     favorite.user = self.createUser(item.user);
    //                 });
    //                 resolve(ret);                
    //             } else {
    //               return reject(self.errorHandler(artist));
    //             }
    //         });
    //     });
    // },