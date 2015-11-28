import DS from 'ember-data';

var event = DS.Model.extend({
    type: DS.attr('string')
});

export default event;
