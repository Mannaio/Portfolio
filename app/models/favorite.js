import DS from 'ember-data';

var Favorite = DS.Model.extend({
    title: DS.attr('string'),
});

export default Favorite;