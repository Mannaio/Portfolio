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
    formattedArtwork: Ember.computed('artwork_url', function() {
        var splitURL, url;
        if (this.get('artwork_url')) {
            url = this.get('artwork_url');
            splitURL = url.split('-large');
            return splitURL[0] + '-t500x500' + splitURL[1];
        } else {
            return "https://i1.sndcdn.com/artworks-000121961221-bzjnxn-t500x500.jpg";
        }
    }),
});

export default PlaylistController;