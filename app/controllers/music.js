import Ember from 'ember';

var MusicController = Ember.ArrayController.extend({
    needs: ['player'],
    player: Ember.computed.alias('controllers.player'),
    sortProperties: ['created_at:desc'],
    sortedFavorites: Ember.computed.sort('model', 'sortProperties'),
});

export default MusicController;