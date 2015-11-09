import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({
    showMenu: true,
    display: true,
    sortedProperties: [':created_at:'],
    sortedRepos: Ember.computed.sort('model', 'sortedProperties'),
    actions: {
        showMenu: function() {
            this.set("showMenu", !this.get("showMenu"));
        },
    }
});

export default ApplicationController;