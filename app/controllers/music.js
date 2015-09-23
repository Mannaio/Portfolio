import Ember from 'ember';

var MusicController = Ember.ArrayController.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    sortProperties: ['created_at:desc'],
    sortedFavorites: Ember.computed.sort('model', 'sortProperties'),
    actions: {
        setAsFavorite: function (favorite) {
            if (favorite != null) {
                this.get('player').set('favorite', favorite);
            }
            if (favorite != null) {
                return this.get('player').send('selectFavorite', favorite, 0);
            }
        }
    }

});

export default MusicController;