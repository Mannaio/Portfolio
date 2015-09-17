import Ember from 'ember';

var MusicController = Ember.ArrayController.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    sortProperties: ['created_at:desc'],
    sortedFavorites: Ember.computed.sort('model', 'sortProperties'),
    actions: {
      selectFavorite: function(favorite, index, play) {
        var nextFavorite, prevFavorite, self, favoritePath;
        self = this;
        if (play == null) {
            play = true;
        }
        // self.get('favorites').setEach('playingFavorite', false);
        // self.set('isBuffering', true);
        // favorite.set('playingFavorite', true);
        favoritePath = favorite.get('uri');
        // prevFavorite = this.get('currentFavoriteObject');
        // if (prevFavorite != null) {
        //     prevFavorite.destruct();
        // }
        self.set('currentFavorite', favorite);
        // if (!this.get('externalPlay')) {
        //     index = index + 1;
        //     nextFavorite = this.get('sortedFavorites').nextObject(index, favorite);
        //     self.set('nextFavorite', nextFavorite);
        // }
        return SC.stream(favoritePath, {
            whileplaying: function() {
                return self.set('currentFavoritePosition', this.position);
            },
            onbufferchange: function() {
                return self.set('isBuffering', this.isBuffering);
            },
            onfinish: function() {
                self.set('isPlaying', false);
                if (self.get('nextFavorite') != null) {
                    return self.send('selectFavorite', self.get('nextFavorite'), index);
                }
            }
        }, function(sound) {
            self.set('currentFavoriteObject', sound);
            self.set('isPlaying', true);
            sound.play();
            if (!play) {
                sound.pause();
                return self.set('isPlaying', false);
            }
        });
      }
    }
});

export default MusicController;