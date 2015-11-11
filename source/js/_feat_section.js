(function(section) {

  var insertImage = function(dest, imgName, opts) {
    if (opts.displayMobile == true || $(window).width() >= 1140) {
      $( dest ).css( 'background-image', function() {
        return 'url("' + $( this ).attr(imgName) + '")';
      });
    } else {
      $( dest ).css( 'background-image', 'none' );
    }
  }

  section.bgImage = function(d, i, o) {
    o = o || {
      'displayMobile': true
    };

    insertImage (d, i, o);

    $(window).resize(function() {
      insertImage (d, i, o);
    });
  };


})(this.featuredSection = {});

