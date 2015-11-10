(function(section) {

  section.bgImage = function(imgName) {
    $( '.featured' ).css( 'background-image', function() {
      return 'url("' + $( this ).attr(imgName) + '")';
    });
  };


})(this.featuredSection = {});

