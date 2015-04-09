(function (browserWidth) {
  var devices, breakpointDevice;

  devices = [
    {device: "default",    min_width: 0},
    {device: "smartphone", min_width: 480},
    {device: "tablet",     min_width: 768},
    {device: "desktop",    min_width: 1140}
  ];

  var test = function (browser, deviceWidth, device) {
    if (browser >= deviceWidth) {
      if (breakpointDevice !== device) {
        breakpointDevice = device;
        console.log(device + ' size (' + deviceWidth + 'px)')
      }
    }
  };
  browserWidth.broadcast = function(){
    for(i=0; i<devices.length; i++){
      var $_browserWidth = $(window).width();
      var thisWidth = devices[i].min_width;

      if (typeof(devices[i + 1]) !== 'undefined') {
        var nextWidth = devices[i + 1].min_width;

        if ($_browserWidth < nextWidth) {
          test($_browserWidth, thisWidth, devices[i].device);
        }
      } else {
        test($_browserWidth, thisWidth, devices[i].device);
      }
    }
    $( window ).resize(function(){
      browserWidth.broadcast();
    });
  };

})(browserWidth = {})
