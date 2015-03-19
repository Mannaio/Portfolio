import Ember from 'ember';

var ArtistController = Ember.ArrayController.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    sortProperties: ['created_at:desc'],
    sortedPlaylists: Ember.computed.sort('model', 'sortProperties'),
    actions: {
        setAsPlaylist: function (playlist) {
            var track, tracks;
            tracks = playlist.get('tracks');
            track = tracks.get('firstObject');
            if (track != null) {
                this.get('player').set('tracks', tracks);
            }
            if (track != null) {
                return this.get('player').send('selectTrack', track, 0);
            }
        }
    }
});

export default ArtistController;