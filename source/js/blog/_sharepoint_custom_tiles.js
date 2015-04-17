(function (sp) {
  $( '.sharepoint-tile' )
    .on( 'mouseover', function(){
      sharepointTile.moveTileUp($(this), '0px');
    } )
    .on( 'mouseout', function(){
      sharepointTile.moveTileDown($(this), '100px');
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
  sp.moveTileUp = function(target, amount) {
    target.children('.tile-content')
      .stop() // prevent animation queuing so it animates only while being hovered
      .animate({
        'top': '0'
      }, 500, function(){});
  };
  sp.moveTileDown = function(target, amount) {
    target.children('.tile-content')
      .stop() // prevent animation queuing so it animates only while being hovered
      .animate({
        'top': amount
      }, 500, function(){});
  };

})(this.sharepointTile = {});

