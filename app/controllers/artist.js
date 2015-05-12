import Ember from 'ember';

var ArtistController = Ember.ArrayController.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    sortProperties: ['created_at:desc'],
    sortedFavorites: Ember.computed.sort('model', 'sortProperties'),
});

export default ArtistController;