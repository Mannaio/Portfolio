import Ember from 'ember';

var PlaylistController = Ember.ObjectController.extend({
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