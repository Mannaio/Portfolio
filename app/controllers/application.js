import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({
    artistName: null,
    showMenu: true,
    actions: {
        goToArtist: function() {
            var artist;
            if (this.get('artistName').length) {
                artist = this.get('artistName');
                return this.transitionToRoute('artist', artist);
            }
        },
        showMenu: function() {
            this.set("showMenu", !this.get("showMenu"));
        },
    }
});

export default ApplicationController;