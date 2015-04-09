(function(section) {

  section.bgImage = function(imgName) {
    $( '.featured' ).css( 'background-image', function() {
      console.log('load');
      return 'url("/images/' + $( this ).attr(imgName) + '")';
    });
  };


})(this.featuredSection = {});

