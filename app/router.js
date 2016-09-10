import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});


Router.map(function () {
  this.route('index', {path: '/'});
  this.route('music', {path: '/:music'});
  this.route('photography', {path: '/:photography'});
  this.route('graphic', {path: '/:graphic'});
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

export default Router;
