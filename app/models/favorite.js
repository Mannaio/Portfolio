import DS from 'ember-data';

var Favorite = DS.Model.extend({
    duration: DS.attr('string'),
    title: DS.attr('string'),
    genre: DS.attr('string'),
    artwork_url: DS.attr('string'),
    uri: DS.attr('string'),
    users: DS.hasMany('user')
});

export default Favorite;