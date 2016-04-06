import DS from 'ember-data';

var commit = DS.Model.extend({
	message: DS.attr('string'),
	commitUrl: DS.attr('string'),
	date: DS.attr('string'),
	name: DS.attr('string'),
	branch: DS.attr('string')
});

export default commit;


