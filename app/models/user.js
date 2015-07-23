import DS from 'ember-data';

var User = DS.Model.extend({
	favorite: DS.belongsTo('favorite'),
    username: DS.attr('string')
});

export default User;