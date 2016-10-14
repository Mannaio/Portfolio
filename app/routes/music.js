import Ember from 'ember';

var MusicRoute = Ember.Route.extend({
    needs: ['player'],
    isVisible: false,
    player: Ember.computed.alias('controllers.player'),
    visibility: Ember.inject.service('visible'),
    actions: {
        willTransition: function willTransition(controller) {
            this._super(controller);
            if (this.controllerFor('player').get('isPlaying', true)) {
                this.controllerFor('player').get('currentFavoriteObject').destruct();
                return controller;
            };
        }
    },
    beforeModel: function() {
        return SC.initialize({
            client_id: window.soundcloud_api_key,
            redirect_url: '#'
        });
    },
    model: function(params) {
        var artist, self, ret;
        self = this;
        artist = params.artist;
        ret = [];
        this.controllerFor('application').set('artistName', artist);

        return new Ember.RSVP.Promise(function(resolve, reject) {
            return SC.get("/users/" + 'mannaio' + "/favorites", {limit: 200 }, function(favorites) {
                if (favorites.length) {
                    self.resetStore();
                    favorites.toArray().forEach(function(item) {
                        var favorite;
                        favorite = self.createFavoritelist(item);
                        ret.push(favorite);
                        favorite.user = self.createUser(item.user);
                    });
                    resolve(ret);
                } else {
                  return reject(self.errorHandler(artist));
                }
            });
        });
    },
    afterModel: function() {
        this.set('visibility.isVisible', false);
    },
    setupController: function(controller, model) {
        var favorite, favorites ;
        this._super(controller, model);
        favorites = this.get('controller.model');
        favorite =  favorites.get('firstObject');
        this.controllerFor('player').set('favorites', favorites).send('selectFavorite', favorite, 0, false);
        this.controllerFor('player').set('favorite', favorite);
        return controller;
    },
    renderTemplate: function() {
        this._super();
        return this.render('player', {
            into: 'music',
            outlet: 'player',
            controller: 'player'
        });
    },
    resetStore: function() {
        this.store.unloadAll('favorite');
    },
    createPlaylist: function(playlist, arr) {
        var record;
        record = this.store.createRecord('playlist', {});
        record.setProperties({
            id: playlist.id,
            title: playlist.title,
            artwork_url: playlist.artwork_url
        });
        arr.pushObject(record);
        return record;
    },
    createFavoritelist: function(favorite) {
        return this.store.createRecord('favorite', {
            id: favorite.id,
            title: favorite.title,
            duration: favorite.duration,
            uri: favorite.uri,
            artwork_url: favorite.artwork_url,
            genre: favorite.genre,
        });
    },
    createUser: function(user) {
        return this.store.createRecord('user', {
            username: user.username,
            avatar_url: user.avatar_url,
        });
    },
    errorHandler: function(artist) {
        this.controllerFor('index').set('errorText', "Artist " + artist + " is invalid or does not have any playlists.");
        return this.transitionTo('index');
    }
});

export default MusicRoute;
