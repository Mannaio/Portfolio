import DS from 'ember-data';

var repo = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    language: DS.attr('string')
});

export default repo;
