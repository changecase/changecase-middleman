$(document).ready(function() {

  $('#article-title').each(function() {
    console.log('success');
    var $bgobj = $(this);

    $(window).scroll(function() {
      var yPos = -($(window).scrollTop() / 3 );
      var height = $('#article-title').height();
      var coords = '50% ' + (50 - (yPos / 2)) + '%';

      $bgobj.css({ backgroundPosition: coords });
    });
  });

});
