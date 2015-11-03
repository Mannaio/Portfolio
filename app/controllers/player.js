import Ember from 'ember';

var PlayerController = Ember.Controller.extend({
    isExpanded: false,
    favoriteSortProperties: ['created_at:desc'],
    sortedFavorites: Ember.computed.alias('favorites'),
    formattedArtwork: Ember.computed('currentFavorite.artwork_url', function() {
        var splitURL, url;
        if (this.get('currentFavorite.artwork_url')) {
            url = this.get('currentFavorite.artwork_url');
            splitURL = url.split('-large');
            return splitURL[0] + '-t300x300' + splitURL[1];
        }
    }),
    actions: {
        togglePlayer: function() {
            this.toggleProperty('isCollapsed');
            return false;
        },
        selectFavorite: function(favorite, index, play) {
            var nextFavorite, prevFavorite, self, favoritePath;
            self = this;
            if (play == null) {
                play = true;
            }
            // self.get('favorite').set('playingFavorite', false);
            // self.set('isBuffering', true);
            // favorite.set('playingFavorite', true);
            favoritePath = favorite.get('uri');
            prevFavorite = this.get('currentFavoriteObject');
            if (prevFavorite != null) {
                prevFavorite.destruct();
            }
            self.set('currentFavorite', favorite);
            if (!this.get('externalPlay')) {
                index = index + 1;
                nextFavorite = this.get('sortedFavorites').nextObject(index, favorite);
                self.set('nextFavorite', nextFavorite);
            }
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
                    };
                    self.set('favorite.artwork_url', nextFavorite.artwork_url)
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

export default PlayerController;