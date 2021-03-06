import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
    visibility: Ember.inject.service('visible'),
    model: function() {
        var store, userUrl, reposUrl, eventsAct, gituser;
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
            return new Ember.RSVP.Promise(function (resolve, reject) {
                return Ember.$.ajax(reposUrl, {
                    success: function(repos) {
                        // var repos;
                        // repos = this.get('repos').slice(0, 2)
                        var result = [];
                        repos.slice(0,9).map(function(repo) {
                            result.push(store.createRecord('repo', {
                                created_at: repo.created_at,
                                html_url: repo.html_url,
                                name: repo.name,
                                description: repo.description,
                                language: repo.language
                            }));
                        });
                        resolve(result);
                    },
                    error: function(reason) {
                     reject(reason);
                    },
                });
            });
        };

        var gitactivitiesPromise = function() {
            return new Ember.RSVP.Promise(function (resolve, reject) {
                Ember.$.ajax(eventsAct, {
                    success: function(events) {
                        var result = [];
                        events.slice(0,15).filter(function(event) {
                    return event.type === 'PushEvent';
                    }).forEach(function(item){
                        var repoUrl = 'https://github.com/' + item.repo.name;
                        var authorUrl = 'https://github.com/' + item.actor.login;
                        var branchUrl = 'https://github.com/' + item.repo.name +'/' + 'tree/' + item.payload.ref;
                        item.payload.commits.map(function(commit){
                            result.push(store.createRecord('commit', {
                                name: item.repo.name,
                                date: item.created_at,
                                message: commit.message,
                                branch: item.payload.ref,
                                branchlink: branchUrl,
                                commitUrl: repoUrl + '/commit/' + commit.sha,
                                repositoryUrl: repoUrl
                            }));
                        });
                    });
                    resolve(result);
                  },
                  error: function(reason) {
                    reject(reason);
                  }
                });
            });
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
