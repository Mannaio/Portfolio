import Ember from 'ember';

var SoundcloudPlayerComponent = Ember.Component.extend({
    tagName: 'div',
    classNames: ['soundcloud-player'],
    track: null,
    sound: null,
    position: 0,
    isPaused: false,
    percentPlayed: Ember.computed('track.duration', 'position', function () {
        var percent;
        percent = 0;
        if (this.get('track') != null) {
            percent = (this.get('position') / this.get('track').get('duration')) * 100;
        }
        return percent;
    }),
    setPercentPlayed: Ember.observer('percentPlayed', 'position', function () {
        var percent;
        percent = this.get('percentPlayed');
        return this.$('.progress-bar').css('width', percent + "%");
    }),
    formattedPosition: Ember.computed('position', function () {
        var position, res;
        position = this.get('position');
        res = this.formatTime(position);
        return res;
    }),
    formattedDuration: Ember.computed('track.duration', function () {
        var duration, res;
        duration = this.get('track.duration');
        res = this.formatTime(duration);
        return res;
    }),
    formatTime: function (time) {
        var minutes, seconds, timeObject;
        time = isNaN(time) ? 0 : time;
        timeObject = new Date(time);
        minutes = timeObject.getMinutes().toString();
        seconds = timeObject.getSeconds().toString();
        seconds = seconds.length < 2 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    },
    actions: {
        pauseTrack: function () {
            this.get('sound').pause();
            this.set('isPlaying', false);
            return this.set('isPaused', true);
        },
        resumeTrack: function () {
            this.get('sound').resume();
            this.set('isPlaying', true);
            return this.set('isPaused', false);
        },
        playTrack: function () {
            this.get('sound').play();
            this.set('isPlaying', true);
            return this.set('isPaused', false);
        }
    }
});

export default SoundcloudPlayerComponent;