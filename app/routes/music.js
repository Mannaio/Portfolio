import Ember from 'ember';

var MusicRoute = Ember.Route.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    beforeModel: function() {
        return SC.initialize({
            client_id: window.soundcloud_api_key,
            redirect_url: '#'
        });
    },
    model: function(params) {
        var artist, favoriteList, self, ret;
        self = this;
        artist = params.artist;
        ret = [];
        this.controllerFor('application').set('artistName', artist);

        return new Ember.RSVP.Promise(function(resolve, reject) {
            return SC.get("/users/" + 'mannaio' + "/favorites", {
                limit: 40
            }, function(favorites) {
                if (favorites.length) {
                    favorites.forEach(function(item, index, arr) {
                        var favorite;
                        favorite = self.createFavoritelist(item);
                        ret.push(favorite);
                        favorite.user = self.createUser(item.user);
                    });
                }
                resolve(ret);
            });
        });
    },
    resetStore: function() {
        this.store.unloadAll('playlist');
        return this.store.unloadAll('track');
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
            artwork_url: favorite.artwork_url,
            genre: favorite.genre,
        });
    },
    createTrack: function(track, playlist) {
        var record;
        record = this.store.createRecord('track', {});
        record.setProperties(track).set('playlist', playlist);
        return record;
    },
    createUser: function(user) {
        return this.store.createRecord('user', {
            username: user.username
        });
    },
    errorHandler: function(artist) {
        this.controllerFor('index').set('errorText', "Artist " + artist + " is invalid or does not have any playlists.");
        return this.transitionTo('index');
    }
});

export default MusicRoute;