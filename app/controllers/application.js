import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({
    artistName: null,
    actions: {
        goToArtist: function() {
            var artist;
            if (this.get('artistName').length) {
                artist = this.get('artistName');
                return this.transitionToRoute('artist', artist);
            }
        }
    }
});

export default ApplicationController;