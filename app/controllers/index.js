import Ember from 'ember';

var IndexController = Ember.Controller.extend({
    errorText: null,
    sortProperties: ['created_at:desc'],
    sortAnOtherPropery: ['name:asc'],
    // sortedNames: Ember.Computed.sort('model.commits', 'sortAnOtherPropery'),
    sortedRepos: Ember.computed.sort('model.repos', 'sortProperties'),
    // firstTenNames: Ember.computed.filter('sortedNames', function(name, index) {
    //     return (index < 10);
    // })
});

export default IndexController;