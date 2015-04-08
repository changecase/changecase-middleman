// var tile = {
//   height: $( '.sample-tile' ).height(),
//   width:  $( '.sample-tile' ).width()
// };

var sharepointTile = (function () {
  var sp = {};
  $( '.tile-group' )
    .on( 'mouseover', function(){
      sharepointTile.moveTileUp('0px');
    } )
    .on( 'mouseout', function(){
      sharepointTile.moveTileDown('100px');
    } );

  sp.backgroundColor = function(colorValue) {
    $('img.sample-tile').css('background-color', colorValue);
  };
  sp.header = function(tileTitle) {
    $('aside .tile-title').html(tileTitle);
  };
  sp.description = function(tileDescription) {
    $('aside .tile-description').html(tileDescription);
  };
  sp.moveTileUp = function(amount) {
    $('aside .tile-content')
      .stop() // prevent animation queuing so it animates only while being hovered
      .animate({
        'top': '0'
      }, 500, function(){});
  };
  sp.moveTileDown = function(amount) {
    $('aside .tile-content')
      .stop() // prevent animation queuing so it animates only while being hovered
      .animate({
        'top': amount
      }, 500, function(){});
  };

  return sp;
}());

