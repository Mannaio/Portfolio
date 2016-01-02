import Ember from 'ember';

var MusicController = Ember.ArrayController.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    actions: {
        setAsFavorite: function (favorite) {
            var favorites = this.get('model');
            var player = this.get('player');

            if (Ember.isPresent(favorite)) {
              this.controllerFor('player').set('favorite', favorite);
              player.send('selectFavorite', favorite, favorites.indexOf(favorite)); 
              // for next song 
             //  player.send('selectFavorite', favorite, favorites.nextObject(favorite)); 
            } 
        }
    }    
});

export default MusicController;