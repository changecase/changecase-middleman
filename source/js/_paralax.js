var paralax = (function () {
  var exp = {};

  exp.articleHeader = function() {
    $('#article-title').each(function() {
      var $bgobj = $(this);

      $(window).scroll(function() {
        var yPos = -($(window).scrollTop() / 3 );
        var height = $('#article-title').height();
        var coords = '50% ' + (50 - (yPos / 20)) + '%';

        $bgobj.css({ backgroundPosition: coords });
      });
    });
  };

  return exp;
}());

