import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['gears'],
    visibility: Ember.inject.service('visible'),
    isVisible:  Ember.computed.alias('visibility.isVisible'),

    _startTimer: Ember.on('didInsertElement', function () {
        var _this = this;


        this._visibleTimer = Ember.run.later(this, function () {
            _this._visibleTimer = null;
            _this.set('isVisible', true);
        }, 5000);
    }),

    _endTimer: Ember.on('willDestroyElement', function () {
        if (this._visibleTimer) {
            Ember.run.cancel(this, this._visibleTimer);
        }
    })
});


