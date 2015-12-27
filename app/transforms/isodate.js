/* global moment*/
import DS from "ember-data";
import Ember from 'ember';

export default DS.Transform.extend({
	deserialize: function(serialized) {
		return Ember.isEmpty(serialized) ? null : moment(serialized, 'YYYY-MM-DD').toDate().toISOString();
	},
	serialize: function(deserialized) {
		return Ember.isEmpty(deserialized) ? null : moment(deserialized).format('YYYY-MM-DD');
	}
});
