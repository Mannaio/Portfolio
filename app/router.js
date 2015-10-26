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

export default Router;
