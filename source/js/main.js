//= require "vendor/jquery-1.10.1.min.js"
//= require "vendor/modernizr-2.6.2-respond-1.1.0.min.js"

//= require "mixitup"

//= require "_paralax"
//= require "_top_nav"
//= require "_feat_section"
//= require "_typekit"
//= require "_portfolio"

//= require "blog/_sharepoint_custom_tiles"

$( document ).ready(function() {
  // utilities
  //browserWidth.broadcast();
  topNav.toggle('.header-container nav');

  // index
  featuredSection.bgImage('.featured', 'data-image');

  // all articles
  featuredSection.bgImage('#article-title', 'data-image', {'displayMobile':false});
  paralax.element('#article-title');

  // unique pages
    //sharepointTile();
});
