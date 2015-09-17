import DS from 'ember-data';

var Track = DS.Model.extend({
    playlist: DS.belongsTo('playlist'),
    duration: DS.attr('string'),
    artwork_url: DS.attr('string'),
    created_at: DS.attr('date'),
    title: DS.attr('string'),
    uri: DS.attr('string')
});

export default Track;