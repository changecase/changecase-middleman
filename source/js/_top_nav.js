$(document).ready(function(){
  var $_nav = $( '.header-container nav' );
  var $_main = $( '.main-container' );
  var $_navIcon = $( '<i class="fa fa-times"></i>' );

  // Collapse the navigation to start
  $_nav.addClass( 'collapsed' );

  // Expand the navigation when the hamburger is clicked
  $_nav.on("click", function(){
    $( this ).removeClass( 'collapsed' ).addClass( 'expanded' )
      .before($_navIcon);
  });

  // Collapse the navigation when anything outside of the nav is clicked
  $_main.on("click", function(){
    if ( !$_nav.hasClass( 'collapsed' )){
      $_nav.addClass( 'collapsed' ).removeClass( 'expanded' );
      $_navIcon.detach();
    }
  });

  // Collapse the navigation when the close icon is clicked
  $_navIcon.on("click", function(){
    if ( !$_nav.hasClass( 'collapsed' )){
      $_nav.addClass( 'collapsed' ).removeClass( 'expanded' );
      $_navIcon.detach();
    }
  });
});
