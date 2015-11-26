import ajax from 'ic-ajax';
import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
    visibility: Ember.inject.service('visible'),
    model: function() {
        var store, userUrl, reposUrl;
        store = this.get('store');
        userUrl = 'https://api.github.com/users/mannaio';
        reposUrl = 'https://api.github.com/users/mannaio/repos';

        var gituserPromise = function() {
            return Ember.$.ajax(userUrl, {
                success: function(data) {               
                    return store.createRecord('gituser', {
                        name: data.name,
                        login: data.login,
                        location: data.location,
                        company: data.company,
                        followers: data.followers,
                        following: data.following,
                        public_repos: data.public_repos,
                        public_gists: data.public_gists
                    });
               },
                error: function(reason) {
                 reject(reason);
               }});
        };
        var gitrepositoriesPromise = function() {
            return Ember.$.ajax(reposUrl, {
                success: function(repos) {
                    return repos.map(function(repo) {
                        return store.createRecord('repo', {
                            name: repo.name,
                            description: repo.description,
                            language: repo.language
                        });
                    });
                },
                error: function(reason) {
                 reject(reason);
            }});             
        };
        return Ember.RSVP.hash({
            gitUsers: gituserPromise(),
            repos: gitrepositoriesPromise()
        });

    },

    afterModel: function() {
        this.set('visibility.isVisible', true);
    }


});

export default IndexRoute;