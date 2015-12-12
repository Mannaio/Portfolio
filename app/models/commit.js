import DS from 'ember-data';

var commit = DS.Model.extend({
	message: DS.attr('string'),
	url: DS.attr('string')
});

export default commit;


