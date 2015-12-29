import DS from 'ember-data';

var repo = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    created_at: DS.attr('string'),
    language: DS.attr('string'),
    html_url: DS.attr('string')
});

export default repo;
