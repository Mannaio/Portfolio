import Ember from 'ember';

var PhotographyRoute = Ember.Route.extend({
    visibility: Ember.inject.service('visible'),
    model: function(params){
        var store, flickrApi, result, self;
        self = this;
        result = [];
        store = this.get('store');
        flickrApi = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7fa03a7940801a3126d8ac7675a11dd2&user_id=126042902%40N03&format=json&nojsoncallback=1&auth_token=72157662415623189-10d15049944e7abf&api_sig=1c1bced3afbfeced31e97a89ae3acf5d';
        return new Ember.RSVP.Promise(function (resolve, reject) {
            return Ember.$.ajax(flickrApi, {
                success: function(data) {
                    data.photos.photo.forEach(function(item){
                        if (item.length) {
                            var photo;
                            self.resetStore();
                            photo = self.createPhotolist(item);
                            result.push(photo);
                        }
                    });
                    resolve(result);
                },
                error: function(reason) {
                 console.log('not good');
                },
            });
        });
    },
    createPhotolist: function(photo) {
        return this.store.createRecord('photo', {
            id: photo.id,
            owner: photo.owner,
            secret: photo.secret,
            server: photo.server,
            title: photo.title,
            farm: photo.farm,
        });
    },
    resetStore: function() {
        this.store.unloadAll('photo');
    },
});

export default PhotographyRoute;