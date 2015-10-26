import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({
    showMenu: true,
    display: true,
    actions: {
        showMenu: function() {
            this.set("showMenu", !this.get("showMenu"));
        },
    }
});

export default ApplicationController;