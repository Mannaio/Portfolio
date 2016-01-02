import Ember from 'ember';

var IndexController = Ember.Controller.extend({
    errorText: null,
    sortProperties: ['created_at:desc'],
    sortedRepos: Ember.computed.sort('model.repos', 'sortProperties')
});

export default IndexController;