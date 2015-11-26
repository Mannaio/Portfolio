import DS from 'ember-data';

var Gituser = DS.Model.extend({
    name: DS.attr('string'),
    login: DS.attr('string'),
    location: DS.attr('string'),
    company: DS.attr('string'),
    followers: DS.attr('string'),
    following: DS.attr('string'),
    public_repos: DS.attr('string'),
    public_gists: DS.attr('string')
});

export default Gituser;


