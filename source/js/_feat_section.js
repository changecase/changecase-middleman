(function(section) {

  section.bgImage = function() {
    $( '.featured' ).css( 'background-image', function() {
      console.log('load');
      return 'url("/images/' + $( this ).attr('data-image') + '")';
    });
  };


})(this.featured_section = {});

$(document).ready(function () { 
  featured_section.bgImage();
});
