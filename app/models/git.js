import DS from 'ember-data';

var Git = DS.Model.extend({
    name: DS.attr('string'),
    login: DS.attr('string'),
    location: DS.attr('string'),
    company: DS.attr('string'),
    followers: DS.attr('string'),
    following: DS.attr('string'),
});

export default Git;


