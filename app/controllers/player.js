import Ember from 'ember';

var PlayerController = Ember.Controller.extend({
    isExpanded: false,
    trackSortProperties: ['created_at:desc'],
    sortedTracks: Ember.computed.alias('tracks'),
    formattedArtwork: Ember.computed('currentTrack.artwork_url', function() {
        var splitURL, url;
        if (this.get('currentTrack.artwork_url')) {
            url = this.get('currentTrack.artwork_url');
            splitURL = url.split('-large');
            return splitURL[0] + '-t300x300' + splitURL[1];
        }
    }),
    actions: {
        togglePlayer: function() {
            this.toggleProperty('isCollapsed');
            return false;
        },
        selectTrack: function(track, index, play) {
            var nextTrack, prevTrack, self, trackPath;
            self = this;
            if (play == null) {
                play = true;
            }
            self.get('tracks').setEach('playingTrack', false);
            self.set('isBuffering', true);
            track.set('playingTrack', true);
            trackPath = track.get('uri');
            prevTrack = this.get('currentTrackObject');
            if (prevTrack != null) {
                prevTrack.destruct();
            }
            self.set('currentTrack', track);
            if (!this.get('externalPlay')) {
                index = index + 1;
                nextTrack = this.get('sortedTracks').nextObject(index, track);
                self.set('nextTrack', nextTrack);
            }
            return SC.stream(trackPath, {
                whileplaying: function() {
                    return self.set('currentTrackPosition', this.position);
                },
                onbufferchange: function() {
                    return self.set('isBuffering', this.isBuffering);
                },
                onfinish: function() {
                    self.set('isPlaying', false);
                    if (self.get('nextTrack') != null) {
                        return self.send('selectTrack', self.get('nextTrack'), index);
                    }
                }
            }, function(sound) {
                self.set('currentTrackObject', sound);
                self.set('isPlaying', true);
                sound.play();
                if (!play) {
                    sound.pause();
                    return self.set('isPlaying', false);
                }
            });
        }
    }
});

export default PlayerController;