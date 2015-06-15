import Ember from 'ember';

var PlaylistController = Ember.ObjectController.extend({
    albumArt: Ember.computed('artwork_url', function() {
        var firstTrack, lastTrack, playlistArt, trackArt;
        playlistArt = this.get('artwork_url');
        if (playlistArt != null) {
            return playlistArt;
        }
        firstTrack = this.get('tracks').get('firstObject');
        if (firstTrack != null) {
            trackArt = firstTrack.get('artwork_url');
        }
        if (trackArt != null) {
            return trackArt;
        }
        lastTrack = this.get('tracks').get('lastObject');
        if (lastTrack != null) {
            trackArt = lastTrack.get('artwork_url');
        }
        return trackArt;
    }),
    formattedArtwork: Ember.computed('albumArt', function() {
        var splitURL, url;
        if (this.get('albumArt')) {
            url = this.get('albumArt');
            splitURL = url.split('-large');
            return splitURL[0] + '-t500x500' + splitURL[1];
        }
    })
});

export default PlaylistController;