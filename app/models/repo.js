import DS from 'ember-data';

var Repo = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string')
});

export default Repo;