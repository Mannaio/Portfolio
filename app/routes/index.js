import ajax from 'ic-ajax';
import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
    visibility: Ember.inject.service('visible'),
    model: function() {
        var store, userUrl, reposUrl, reposAct, eventsAct;
        store = this.get('store');
        userUrl = 'https://api.github.com/users/mannaio';
        reposUrl = 'https://api.github.com/users/mannaio/repos';
        eventsAct = 'https://api.github.com/users/mannaio/events';

        var gituserPromise = function() {
            return Ember.$.ajax(userUrl, {
                success: function(data) {               
                    return store.createRecord('gituser', {
                        name: data.name,
                        login: data.login,
                        email: data.email,
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
        // var gitactivitiesPromise = function() {
        //     return Ember.$.ajax(eventsAct, {
        //         success: function(events) {
        //             return events.filter(function(event) {
        //                 return event.type == 'PushEvent';
        //             }).forEach(function(item){
        //                 return item.payload.commits.map(function(commit){
        //                     // return console.log(commit.message);
        //                     return commit.message;
        //                 });
        //             });
        //             // return events.map(function(event) {
        //             //     return store.createRecord('event', {
        //             //         name: event.type
        //             //     });
        //             // });
        //         },
        //         error: function(reason) {
        //          reject(reason);
        //     }});             
        // };
        var gitactivitiesPromise = function() {
            return Ember.$.ajax(eventsAct, {
                success: function(events) {
                    return events.filter(function(event) {
                        return event.type == 'PushEvent';
                    }).forEach(function(item){
                        return item.payload.commits.map(function(commit){
                            return store.createRecord('commit', {
                                message: commit.message,
                            });
                        });
                    });
                },  
                error: function(reason) {
                 reject(reason);
            }});             
        };
        return Ember.RSVP.hash({
            gitUsers: gituserPromise(),
            repos: gitrepositoriesPromise(),
            commits: gitactivitiesPromise()
        });

    },

    afterModel: function() {
        this.set('visibility.isVisible', true);
    }


});

export default IndexRoute;