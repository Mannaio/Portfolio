import Ember from 'ember';

var PhotographyRoute = Ember.Route.extend({
    visibility: Ember.inject.service('visible'),
    model: function(params){
        var store, flickrApi, result, self;
        self = this;
        result = [];
        store = this.get('store');
        flickrApi = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=d33c49eb0bdcbce0dfa1577d86139f23&user_id=126042902%40N03&format=json&nojsoncallback=1';
        return new Ember.RSVP.Promise(function (resolve, reject) {
            return Ember.$.ajax(flickrApi, {
                success: function(data) {
                    var result = [];
                    data.photos.photo.map(function(img){
                        self.resetStore();
                        var imgUrl = 'http://farm6.staticflickr.com/' + img.server + '/' + img.id + '_' + img.secret + '.jpg'; 
                        result.push(store.createRecord('img', {
                            id: img.id,
                            owner: img.owner,
                            secret: img.secret,
                            server: img.server,
                            title: img.title,
                            farm: img.farm,
                            imgLink: imgUrl
                        }));
                    });
                    resolve(result);
                },
            });
        });
    },
    // createPhotolist: function(photo) {
    //     return this.store.createRecord('photo', {
    //         id: photo.id,
    //         owner: photo.owner,
    //         secret: photo.secret,
    //         server: photo.server,
    //         title: photo.title,
    //         farm: photo.farm,
    //     });
    // },
    resetStore: function() {
        this.store.unloadAll('img');
    },
});

export default PhotographyRoute;