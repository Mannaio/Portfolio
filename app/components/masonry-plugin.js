import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
   var $grid = this.$('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
   // layout Isotope after each image loads
   $grid.imagesLoaded().progress( function() {
     $grid.masonry();
   });  
  }
});
