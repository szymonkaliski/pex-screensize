# pex-screensize

Screen size module for pex library. Works in browser and with Plask on OSX.

In OSX returns dimmensions of all attached displays, in browser returns current window width and height.

## Example

Works both in browser and in Plask on OSX.

```javascript
var Window = require("pex-sys").Window;

var ScreenSize = require("pex-screensize");
var screenSize = new ScreenSize();
var screenNumber = 1; // optional settings for multiple monitors on OSX/Plask

screenSize.fullscreenSettings(function(error, settings) {
  if (error) { console.error(error); }

  Window.create({
    settings: settings,

    init: function() {
      console.log("init with size", this.width, this.height);
    },

    draw: function() {
    }
  });
}, screenNumber);
```

## Methods

### screens(callback)

Callbacks with array of detected screens, arguments:

* `callback(error, screens)` - `screens` is array of available screens filled with object containing `width` and `height` fields

### fullscreenSettings(callback, [ screenNumber ])

Callbacks with settings required to run application in fullscreen, arguments:

* `callback(error, settings)` - `settings` is object containing all needed settings to run Pex application in fullscreen
* `screenNumber` - optional integer for OSX to select different display, automatically defaults to 0

