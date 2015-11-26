import DS from 'ember-data';

var user = DS.Model.extend({
	favorite: DS.belongsTo('favorite'),
    username: DS.attr('string')
});

export default user;


