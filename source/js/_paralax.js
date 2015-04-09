(function (exp) {

  var position = function(h,y) {
    var x = '50% ';
    return x + ((h / (h - y)) * 100) / 2 + '%';
  };

  exp.element = function(element) {
    var $_bgobj = $( element );
    var height, yPos, coords;

    height = $_bgobj.height();
    yPos = 0;
    coords = position(height, yPos);
    $_bgobj.css({ backgroundPosition: coords });

    $(window).scroll(function() {
      yPos = $(window).scrollTop();
      if (yPos < (height / 2)) {
        coords = position(height, yPos);
      }

      $_bgobj.css({ backgroundPosition: coords });
    });

  };

  return exp;
})(this.paralax = {});
