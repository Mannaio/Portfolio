//app/services/mtg-level-service.js
import Ember from 'ember';

//app/initializers/initializer-store.js
export default {
  name: 'initializer-store',
  after: 'store',

  initialize: function(container, application) {
    application.inject('service:mtg-level-service', 'store', 'store:main');
  }
};