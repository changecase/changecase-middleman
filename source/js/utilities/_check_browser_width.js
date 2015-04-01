function checkBrowserWidth() {
  var breakpointDevice = "";
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
}
