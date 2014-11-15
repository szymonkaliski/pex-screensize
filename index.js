/*global window */

var exec = require("child_process").exec;

function ScreenSize() {
  var isPlask = typeof window === "undefined" && typeof process === "object";
  var isBrowser = typeof window === "object" && typeof document === "object";

  if (isPlask) {
    this.type = "plask";
  }
  else {
    this.type = "browser";
  }
};

ScreenSize.prototype.screens = function(callback) {
  var typeMap = {
    browser: ScreenSizeBrowser,
    plask: ScreenSizeOSX
  };

  if (typeMap[this.type]) {
    typeMap[this.type](callback);
  }
  else {
    callback(new Error("Can't get screen size for this platform"));
  }
};

ScreenSize.prototype.fullscreenSettings = function(callback, num) {
  this.screens(function(error, screens) {
    if (error) { return callback(error); }

    if (!num) {
      num = 0;
    }
    else {
      num = Math.min(num, screens.length);
    }

    var screen = screens[num];

    var screenMap = {
      // fullscreen: true is enough for browser pex
      browser: {
        fullscreen: true
      },

      // plask requires not only width and height, but also position
      plask: {
        fullscreen: true,

        width: screen.width,
        height: screen.height,

        position: {
          x: 0,
          y: screen.height
        }
      }
    };

    callback(null, screenMap[this.type]);
  }.bind(this));
};

var ScreenSizeOSX = function(callback) {
  exec("system_profiler SPDisplaysDataType", function(error, stdout) {
    if (error) { return callback(error); }

    var resolutions = stdout.split("\n").filter(function(line) {
      return line.match("Resolution");
    });

    resolutions = resolutions.map(function(resolution) {
      var temp = resolution.replace(/[^0-9]+/, "").split(" ");
      return { width: temp[0], height: temp[2] };
    });

    return callback(null, resolutions);
  });
};

var ScreenSizeBrowser = function(callback) {
  var size = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  callback(null, [ size ]);
};

module.exports = ScreenSize;
