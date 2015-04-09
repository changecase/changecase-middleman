(function(mainNav){
  var $_main, $_navIcon;

  $_main = $( '.main-container' );
  $_navIcon = $( '<i class="fa fa-times"></i>' );
  
  var expand = function(targetNav) {
    targetNav.removeClass( 'collapsed' ).addClass( 'expanded' )
      .before($_navIcon);
  }

  // Collapse the navigation when anything outside of the nav is clicked
  var collapse = function (targetNav) {
    if (!targetNav.hasClass('collapsed')){
      targetNav.removeClass( 'expanded' ).addClass( 'collapsed' );
      $_navIcon.detach();
    }
  }

  mainNav.toggle = function (nav) {
    nav = $( nav );
    
    // Collapse the navigation to start
    nav.addClass( 'collapsed' );

    // Expand the navigation when the hamburger is clicked
    nav.on(       'click', function(){ expand(nav); });

    // Collapse the navigation when anything outside of the nav 
    // is clicked
    $_main.on(    'click', function(){ collapse(nav); });
    
    // Collapse the navigation when the close icon is clicked
    $_navIcon.on( 'click', function(){ collapse(nav); });
  };
})(this.topNav = {});
