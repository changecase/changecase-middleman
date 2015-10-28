CORE.create_module('sharepoint-tile-settings', function(sb) {
  var color, header, description;

  return {
    init : function () {
      color       = sb.find('#bgcolor')[0];
      header      = sb.find('#tileTitle')[0];
      description = sb.find('#tileDescription')[0];

      sb.addEvent(color,        'click', this.updateColor);
      sb.addEvent(header,       'click', this.updateHeader);
      sb.addEvent(description,  'click', this.updateDescription);
    },
    destroy : function () {
      sb.removeEvent(color,       'click', this.updateColor);
      sb.removeEvent(header,      'click', this.updateHeader);
      sb.removeEvent(description, 'click', this.updateDescription);

      color       = null;
      header      = null;
      description = null;
    },
    updateColor : function () {
      var colorValue = color.value;
      if (colorValue) {
        sb.notify({
          type : 'new-tile-color',
          data : colorValue
        });
      }
    },
    updateHeader : function () {
      var content = headerInput.value;
      if (content) {
        sb.notify({
          type : 'new-tile-header',
          data : content
        });
      }
    },
    updateDescription : function () {
      var content = descriptionInput.value;
      if (content) {
        sb.notify({
          type : 'new-tile-description',
          data : content
        });
      }
    }
  }
});

CORE.create_module('sharepoint-tile', function(sb) {
  var tiles;

  function eachTile(fn) {
    for (i=0; tiles[i]; i++) {
      fn(tiles[i]);
    }
  }

  return {
    init : function () {
      tiles = sb.find('.tile-group');
      sb.listen({
        'new-tile-color' : this.change_color,
        'new-tile-header' : this.change_header,
        'new-tile-description' : this.change_description
      });
    },
    destroy : function () {
      sb.ignore(['new-tile-color', 'new-tile-header', 'new-tile-description']);
    },
    change_color : function (color) {
      color = color.toLowerCase();
      eachTile(function (tile) {
        tile.getElementsByTagName('img')[0].style.backgroundColor = color;
      });
    },
    change_header : function (header) {
      eachTile(function (tile) {
        tile.getElementsByClassName('tile-title').innerHTML = header;
      });
    },
    change_description : function (description) {
      eachTile(function (tile) {
        tile.getElementsByClassName('tile-description').innerHTML = description;
      });
    }
  }
});

