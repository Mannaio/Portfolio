import Ember from 'ember';

var ArtistRoute = Ember.Route.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    beforeModel: function() {
        return SC.initialize({
            client_id: window.soundcloud_api_key,
            redirect_url: '#'
        });
    },
    model: function(params) {
        var artist, favoriteListProxy, self;
        self = this;
        artist = params.artist;
        this.controllerFor('application').set('artistName', artist);
        favoriteListProxy = Ember.ArrayProxy.create({
            content: []
        });
        return new Ember.RSVP.Promise(function(resolve, reject) {
            return SC.get("/users/" + 'mannaio' + "/favorites", {limit: 40}, function(favorites) {
                if (favorites.length) {
                    favorites.forEach(function(item, index, arr){
                        var favorite;
                        favorite = self.createFavoritelist(item, favoriteListProxy)
                    });
                    favorites = favoriteListProxy.get('content')
                    return resolve(favorites);
                }
            });
        });
    },
    // model: function(params) {
    //     var artist, playlistProxy, self;
    //     self = this;
    //     artist = params.artist;
    //     this.controllerFor('application').set('artistName', artist);
    //     playlistProxy = Ember.ArrayProxy.create({
    //         content: []
    //     });
    //     return new Ember.RSVP.Promise(function(resolve, reject) {
    //         return SC.get("/users/" + 'mannaio' + "/playlist", function(playlists) {
    //             if (playlist.length) {
    //                 self.resetStore();
    //                 playlists.forEach(function(item, index, arr) {
    //                     var playlist;
    //                     playlist = self.createPlaylist(item, playlistProxy);
    //                     return item.tracks.forEach(function(track, index, arr) {
    //                         return track = self.createTrack(track, playlist);
    //                     });
    //                 });
    //                 playlists = playlistProxy.get('content');
    //                 return resolve(playlists);
    //             } else {
    //                 return reject(self.errorHandler(artist));
    //             }
    //         });
    //     });
    // },
    // setupController: function(controller, model) {
    //     var track, tracks;
    //     this._super(controller, model);
    //     tracks = model.get('firstObject').get('tracks');
    //     track = tracks.get('firstObject');
    //     this.controllerFor('player').set('tracks', tracks).send('selectTrack', track, 0, false);
    //     return controller;
    // },
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
    createFavoritelist: function(favorite, arr) {
        var record;
        record = this.store.createRecord('favorite', {});
        record.setProperties({
            id: favorite.id,
            title: favorite.title,
            artwork_url: favorite.artwork_url
        });
        arr.pushObject(record);
        return record;
    },
    createTrack: function(track, playlist) {
        var record;
        record = this.store.createRecord('track', {});
        record.setProperties(track).set('playlist', playlist);
        return record;
    },
    errorHandler: function(artist) {
        this.controllerFor('index').set('errorText', "Artist " + artist + " is invalid or does not have any playlists.");
        return this.transitionTo('index');
    }
});

export default ArtistRoute;