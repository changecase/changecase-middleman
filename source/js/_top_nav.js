$(document).ready(function(){
  var breakpointDevice = "";
  var $_nav = $( '.header-container nav' );
  var $_main = $( '.main-container' );

  $( window ).resize(function(){
    var $_window = $( window );

    // Tell the console which breakpoint we are at
    if ( $_window.width() < 480 ){ 
      if ( breakpointDevice != "default" ){
        breakpointDevice = "default";
        console.log( 'default size' );
      }
    } else if ( $_window.width() < 768 ){ 
      if ( breakpointDevice != "smartphone" ) {
        breakpointDevice = "smartphone";
        console.log( 'smartphone size (480px)' );
      }
    } else if ( $_window.width() < 1140 ){
      if ( breakpointDevice != "tablet" ) {
        breakpointDevice = "tablet";
        console.log( 'tablet size (768px)' );
      }
    } else {
      if ( breakpointDevice != "desktop" ) {
        breakpointDevice = "desktop";
        console.log( 'desktop size (1140px)' );
      }
    }
  });

  $_nav.addClass( 'collapse' );
  $_nav.on("click", function(){
    $( this ).removeClass( 'collapse' );
  });
  $_main.on("click", function(){
    if ( !$_nav.hasClass( 'collapse' )){
      $_nav.addClass( 'collapse' );
    }
  });
});
