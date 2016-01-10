import DS from 'ember-data';

var img = DS.Model.extend({
	owner: DS.attr('string'),
	secret: DS.attr('string'),
	server: DS.attr('string'),
	title: DS.attr('string'),
	farm: DS.attr('string'),
});

export default img;


