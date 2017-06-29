require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Adapt":[function(require,module,exports){
var Adapt, Picker, base, getUrlVars, handler, key, makeOption, makeUrlString, readOnlyPropeties, value,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getUrlVars = function() {
  var parts, vars;
  vars = {};
  parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    return vars[key] = value;
  });
  return vars;
};

makeUrlString = function(obj) {
  var key, string, value;
  string = "?";
  for (key in obj) {
    value = obj[key];
    string += key + "=" + value + "&";
  }
  string = string.slice(0, -1);
  return string;
};

makeOption = function(label, value) {
  var opt;
  if (value == null) {
    value = "none";
  }
  opt = document.createElement("option");
  opt.setAttribute("value", value);
  opt.innerHTML = label;
  return opt;
};

Picker = {};

Picker._deviceList = {
  "iPad": {
    "apple-ipad-air-2-silver": "iPadAir2BaseDevice",
    "apple-ipad-air-2-gold": "iPadAir2BaseDevice",
    "apple-ipad-air-2-space-gray": "iPadAir2BaseDevice",
    "apple-ipad-mini-4-silver": "iPadMini4BaseDevice",
    "apple-ipad-mini-4-gold": "iPadMini4BaseDevice",
    "apple-ipad-mini-4-space-gray": "iPadMini4BaseDevice",
    "apple-ipad-pro-silver": "iPadProBaseDevice",
    "apple-ipad-pro-gold": "iPadProBaseDevice",
    "apple-ipad-pro-space-gray": "iPadProBaseDevice"
  },
  "iPhone": {
    "apple-iphone-7-gold": "iPhone7BaseDevice",
    "apple-iphone-7-rose-gold": "iPhone7BaseDevice",
    "apple-iphone-7-silver": "iPhone7BaseDevice",
    "apple-iphone-7-black": "iPhone7BaseDevice",
    "apple-iphone-7-jet-black": "iPhone7BaseDevice",
    "apple-iphone-7-plus-gold": "iPhone7PlusBaseDevice",
    "apple-iphone-7-plus-rose-gold": "iPhone7PlusBaseDevice",
    "apple-iphone-7-plus-silver": "iPhone7PlusBaseDevice",
    "apple-iphone-7-plus-black": "iPhone7PlusBaseDevice",
    "apple-iphone-7-plus-jet-black": "iPhone7PlusBaseDevice",
    "apple-iphone-6s-gold": "iPhone6BaseDevice",
    "apple-iphone-6s-rose-gold": "iPhone6BaseDevice",
    "apple-iphone-6s-silver": "iPhone6BaseDevice",
    "apple-iphone-6s-space-gray": "iPhone6BaseDevice",
    "apple-iphone-6s-plus-gold": "iPhone6PlusBaseDevice",
    "apple-iphone-6s-plus-rose-gold": "iPhone6PlusBaseDevice",
    "apple-iphone-6s-plus-silver": "iPhone6PlusBaseDevice",
    "apple-iphone-6s-plus-space-gray": "iPhone6PlusBaseDevice",
    "apple-iphone-5s-gold": "iPhone5BaseDevice",
    "apple-iphone-5s-silver": "iPhone5BaseDevice",
    "apple-iphone-5s-space-gray": "iPhone5BaseDevice",
    "apple-iphone-5c-blue": "iPhone5CBaseDevice",
    "apple-iphone-5c-green": "iPhone5CBaseDevice",
    "apple-iphone-5c-red": "iPhone5CBaseDevice",
    "apple-iphone-5c-white": "iPhone5CBaseDevice",
    "apple-iphone-5c-yellow": "iPhone5CBaseDevice"
  },
  "Apple Watch": {
    "apple-watch-series-2-38mm-black-steel-black": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-edition": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-rose-gold-aluminum-midnight-blue": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-cocoa": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-concrete": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-ocean-blue": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-red": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-turquoise": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-white": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-silver-aluminum-yellow": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-space-gray-aluminum-black": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-sport-aluminum-walnut": "AppleWatchSeries238Device",
    "apple-watch-series-2-38mm-steel-white": "AppleWatchSeries238Device",
    "apple-watch-series-2-42mm-edition": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-gold-aluminum-cocoa": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-rose-gold-aluminum-midnight-blue": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-concrete": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-green": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-light-pink": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-ocean-blue": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-pink-sand": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-red": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-turquoise": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-white": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-silver-aluminum-yellow": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-space-black-steel-black": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-space-gray-aluminum-black": "AppleWatchSeries242Device",
    "apple-watch-series-2-42mm-steel-white": "AppleWatchSeries242Device",
    "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt": "AppleWatchSeries238Device",
    "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white": "AppleWatchSeries238Device",
    "apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray": "AppleWatchSeries238Device",
    "apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt": "AppleWatchSeries238Device",
    "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt": "AppleWatchSeries242Device",
    "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white": "AppleWatchSeries242Device",
    "apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray": "AppleWatchSeries242Device",
    "apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt": "AppleWatchSeries242Device",
    "apple-watch-38mm-gold-black-leather-closed": "AppleWatch38BlackLeatherDevice",
    "apple-watch-38mm-rose-gold-black-leather-closed": "AppleWatch38BlackLeatherDevice",
    "apple-watch-38mm-stainless-steel-black-leather-closed": "AppleWatch38BlackLeatherDevice",
    "apple-watch-38mm-black-steel-black-closed": "AppleWatch38Device",
    "apple-watch-38mm-gold-midnight-blue-closed": "AppleWatch38Device",
    "apple-watch-38mm-rose-gold-lavender-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-blue-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-fog-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-green-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-red-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-walnut-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-white-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-gold-antique-white-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-aluminum-rose-gold-stone-closed": "AppleWatch38Device",
    "apple-watch-38mm-sport-space-gray-black-closed": "AppleWatch38Device",
    "apple-watch-42mm-black-steel-black-closed": "AppleWatch42Device",
    "apple-watch-42mm-gold-black-leather-closed": "AppleWatch42Device",
    "apple-watch-42mm-gold-midnight-blue-closed": "AppleWatch42Device",
    "apple-watch-42mm-rose-gold-black-leather-closed": "AppleWatch42Device",
    "apple-watch-42mm-rose-gold-lavender-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-blue-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-fog-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-green-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-red-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-walnut-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-white-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-gold-antique-white-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-aluminum-rose-gold-stone-closed": "AppleWatch42Device",
    "apple-watch-42mm-sport-space-gray-black-closed": "AppleWatch42Device",
    "apple-watch-42mm-stainless-steel-black-leather-closed": "AppleWatch42Device"
  },
  "Google": {
    "google-nexus-4": "Nexus4BaseDevice",
    "google-nexus-5x": "Nexus5BaseDevice",
    "google-nexus-6p": "Nexus6BaseDevice",
    "google-nexus-9": "Nexus9BaseDevice",
    "google-pixel-quite-black": "PixelBaseDevice",
    "google-pixel-really-blue": "PixelBaseDevice",
    "google-pixel-very-silver": "PixelBaseDevice"
  },
  "Misc handheld": {
    "htc-one-a9-black": "HTCa9BaseDevice",
    "htc-one-a9-white": "HTCa9BaseDevice",
    "htc-one-m8-black": "HTCm8BaseDevice",
    "htc-one-m8-gold": "HTCm8BaseDevice",
    "htc-one-m8-silver": "HTCm8BaseDevice",
    "microsoft-lumia-950-black": "MSFTLumia950BaseDevice",
    "microsoft-lumia-950-white": "MSFTLumia950BaseDevice",
    "samsung-galaxy-note-5-black": "SamsungGalaxyNote5BaseDevice",
    "samsung-galaxy-note-5-gold": "SamsungGalaxyNote5BaseDevice",
    "samsung-galaxy-note-5-pink": "SamsungGalaxyNote5BaseDevice",
    "samsung-galaxy-note-5-silver-titanium": "SamsungGalaxyNote5BaseDevice",
    "samsung-galaxy-note-5-white": "SamsungGalaxyNote5BaseDevice"
  },
  "Other": {
    "apple-macbook": "AppleMacBook",
    "apple-macbook-air": "AppleMacBookAir",
    "apple-macbook-pro": "AppleMacBookPro",
    "dell-xps": "DellXPS",
    "apple-imac": "AppleIMac",
    "sony-w85Oc": "SonyW85OC",
    "fullscreen": true
  }
};

Picker.exclude = function(group) {
  if (Picker._deviceList[group]) {
    Picker._deviceList[group]._excludeFromList = true;
    return Picker.enable();
  } else {
    return console.log("Picker: Can't exclude '" + group + "', no group by that name");
  }
};

Picker.include = function(group) {
  if (Picker._deviceList[group]) {
    Picker._deviceList[group]._excludeFromList = false;
    return Picker.enable();
  } else {
    return console.log("Picker: Can't include '" + group + "', no group by that name");
  }
};

Picker.enable = function() {
  var base, device, devices, group, ref, results;
  if (Utils.isFramerStudio() || Utils.isMobile()) {
    return;
  }
  if (!Picker._controlDiv) {
    Picker._controlDiv = document.createElement("div");
    Picker._controlDiv.setAttribute("style", "position: absolute; top: 10px; right: 10px; z-index: 9999; text-align: right");
    document.body.appendChild(Picker._controlDiv);
    Picker._deviceSelector = document.createElement("select");
    Picker._deviceSelector.setAttribute("style", "display: block");
    Picker._controlDiv.appendChild(Picker._deviceSelector);
    Picker._deviceSelector.onchange = function() {
      var vars;
      if (this.value === "none") {
        return;
      }
      vars = getUrlVars(window.location.href);
      vars.deviceType = this.value;
      return window.location.href = window.location.href.split("?")[0] + makeUrlString(vars);
    };
    Picker._rotateToggle = document.createElement("button");
    Picker._rotateToggle.setAttribute("type", "button");
    Picker._rotateToggle.setAttribute("style", "background-color: white; color: #333; padding: 0.5em 1em; border-radius: 3px");
    Picker._rotateToggle.innerHTML = "Rotate";
    Picker._controlDiv.appendChild(Picker._rotateToggle);
    Picker._rotateToggle.onclick = function() {
      var vars;
      vars = getUrlVars();
      if (!vars.orientation || vars.orientation === "0") {
        vars.orientation = "90";
      } else {
        vars.orientation = "0";
      }
      return window.location.href = window.location.href.split("?")[0] + makeUrlString(vars);
    };
  }
  Picker._deviceSelector.innerHTML = "";
  Picker._deviceSelector.appendChild(makeOption("Pick device"));
  ref = Picker._deviceList;
  results = [];
  for (group in ref) {
    devices = ref[group];
    if (!(devices._excludeFromList !== true)) {
      continue;
    }
    Picker._deviceSelector.appendChild(makeOption(" "));
    Picker._deviceSelector.appendChild(makeOption("# " + group));
    Picker._deviceSelector.appendChild(makeOption(" "));
    results.push((function() {
      var results1;
      results1 = [];
      for (device in devices) {
        base = devices[device];
        if (device !== "_excludeFromList") {
          results1.push(Picker._deviceSelector.appendChild(makeOption(device, device)));
        }
      }
      return results1;
    })());
  }
  return results;
};

Picker.disable = function() {
  if (Picker._controlDiv) {
    document.body.removeChild(Picker._controlDiv);
    return Picker._controlDiv = null;
  }
};

base = {};

base.evaluator = function() {
  return null;
};

base.setBreakpoints = function(breakpoints) {
  var bpArray, name, value;
  if (breakpoints == null) {
    breakpoints = {};
  }
  bpArray = [];
  for (name in breakpoints) {
    value = breakpoints[name];
    bpArray.push({
      name: name,
      value: value
    });
  }
  bpArray.sort(function(a, b) {
    return b.value - a.value;
  });
  return base.evaluator = function() {
    var bp, i, len, result;
    result = null;
    for (i = 0, len = bpArray.length; i < len; i++) {
      bp = bpArray[i];
      if (Screen.width <= bp.value) {
        result = bp.name;
      }
    }
    return result;
  };
};

base.check = function() {
  var key;
  key = base.evaluator();
  if (!key || typeof key !== "string") {
    key = "other";
  }
  return key;
};

base.picker = Picker;

base._values = {};

base.init = function() {
  var urlVars;
  if (Utils.isDesktop()) {
    urlVars = getUrlVars();
    if (urlVars.deviceType != null) {
      Framer.Device.deviceType = urlVars.deviceType;
    }
    if (urlVars.orientation != null) {
      return Framer.Device.orientation = parseInt(urlVars.orientation);
    }
  } else {
    return Framer.Device.deviceType = "fullscreen";
  }
};

readOnlyPropeties = [];

for (key in base) {
  value = base[key];
  if (key !== "evaluator") {
    readOnlyPropeties.push(key);
  }
}

handler = {
  set: function(target, prop, value) {
    if (prop === "evaluator") {
      if (!_.isFunction(value)) {
        return console.log("Adapt.evaluator has to be a function");
      } else {
        return target[prop] = value;
      }
    } else if (indexOf.call(readOnlyPropeties, prop) >= 0) {
      return console.log("Can't overwrite Adapt." + prop);
    } else {
      return target._values[prop] = value;
    }
  },
  get: function(target, prop, receiver) {
    var ref;
    if ((ref = target._values) != null ? ref[prop] : void 0) {
      return target._values[prop][target.check()];
    } else {
      return target[prop];
    }
  }
};

Adapt = new Proxy(base, handler);

Adapt.init();

exports.Adapt = Adapt;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvQWRhcHQvYWRhcHQtZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaWd1cmQvUmVwb3MvTWluZSAtIEZyYW1lciBtb2R1bGVzL0FkYXB0L2FkYXB0LWV4YW1wbGUuZnJhbWVyL21vZHVsZXMvQWRhcHQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyBIZWxwZXJzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgR2V0IHRoZSBVUkwgdmFyaWFibGVzIGFzIGFuIG9iamVjdFxuZ2V0VXJsVmFycyA9ICgpIC0+XG5cblx0dmFycyA9IHt9XG5cblx0cGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlIC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIChtLCBrZXksIHZhbHVlKSAtPlxuXHRcdHZhcnNba2V5XSA9IHZhbHVlXG5cblx0cmV0dXJuIHZhcnNcblxuXG4jIE1ha2UgcGFyYW1ldGVyIHN0cmluZyBmcm9tIG9iamVjdFxubWFrZVVybFN0cmluZyA9IChvYmopIC0+XG5cblx0c3RyaW5nID0gXCI/XCJcblxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblx0XHRzdHJpbmcgKz0ga2V5ICsgXCI9XCIgKyB2YWx1ZSArIFwiJlwiXG5cblx0c3RyaW5nID0gc3RyaW5nLnNsaWNlKDAsIC0xKVxuXG5cdHJldHVybiBzdHJpbmdcblxuXG4jIE1ha2Ugb3B0aW9uIGVsZW1lbnRcbm1ha2VPcHRpb24gPSAobGFiZWwsIHZhbHVlID0gXCJub25lXCIpIC0+XG5cblx0b3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcIm9wdGlvblwiXG5cdG9wdC5zZXRBdHRyaWJ1dGUgXCJ2YWx1ZVwiLCB2YWx1ZVxuXHRvcHQuaW5uZXJIVE1MID0gbGFiZWxcblxuXHRyZXR1cm4gb3B0XG5cblxuXG4jIERldmljZSBwaWNrZXJcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5QaWNrZXIgPSB7fVxuXG5cbiMgRXZlcnkgZGV2aWNlIGZyb20gRnJhbWVyJ3MgRGV2aWNlQ29tcG9uZW50LCB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgYmFzZSBjbGFzc1xuUGlja2VyLl9kZXZpY2VMaXN0ID1cblxuXHRcImlQYWRcIjpcblxuXHRcdCMgaVBhZCBBaXJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItc2lsdmVyXCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItZ29sZFwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLXNwYWNlLWdyYXlcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGFkIE1pbmlcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LXNpbHZlclwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtZ29sZFwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtc3BhY2UtZ3JheVwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGFkIFByb1xuXHRcdFwiYXBwbGUtaXBhZC1wcm8tc2lsdmVyXCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1wcm8tZ29sZFwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtcHJvLXNwYWNlLWdyYXlcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cblx0XCJpUGhvbmVcIjpcblx0XHRcblx0XHQjIGlQaG9uZSA3XG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1nb2xkXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcm9zZS1nb2xkXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctc2lsdmVyXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctYmxhY2tcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1qZXQtYmxhY2tcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA3IFBsdXNcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXNpbHZlclwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtamV0LWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDZzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtZ29sZFwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtc2lsdmVyXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA2cyBQbHVzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1nb2xkXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zaWx2ZXJcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtc3BhY2UtZ3JheVwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA1U1xuXHRcdFwiYXBwbGUtaXBob25lLTVzLWdvbGRcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtc2lsdmVyXCI6IFwiaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA1Q1xuXHRcdFwiYXBwbGUtaXBob25lLTVjLWJsdWVcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLWdyZWVuXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1yZWRcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLXdoaXRlXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy15ZWxsb3dcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXG5cdFwiQXBwbGUgV2F0Y2hcIjpcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIFNlcmllcyAyIDM4bW1cblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tYmxhY2stc3RlZWwtYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tZWRpdGlvblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tY29jb2FcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWNvbmNyZXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1yZWRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXR1cnF1b2lzZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0td2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXllbGxvd1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zdGVlbC13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBTZXJpZXMgMiA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLWVkaXRpb25cIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tZ29sZC1hbHVtaW51bS1jb2NvYVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tY29uY3JldGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWdyZWVuXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1saWdodC1waW5rXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1waW5rLXNhbmRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXJlZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tdHVycXVvaXNlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0teWVsbG93XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWJsYWNrLXN0ZWVsLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc3RlZWwtd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggTmlrZSsgMzhtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay1jb29sLWdyYXlcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBOaWtlKyA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLWNvb2wtZ3JheVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIDM4bW1cblxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1ibGFjay1zdGVlbC1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLW1pZG5pZ2h0LWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWxhdmVuZGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZm9nLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWdyZWVuLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJlZC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS13YWxudXQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0td2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZ29sZC1hbnRpcXVlLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJvc2UtZ29sZC1zdG9uZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1zcGFjZS1ncmF5LWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLTQybW0tYmxhY2stc3RlZWwtYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWdvbGQtbWlkbmlnaHQtYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtbGF2ZW5kZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1mb2ctY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZ3JlZW4tY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcmVkLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1nb2xkLWFudGlxdWUtd2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcm9zZS1nb2xkLXN0b25lLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LXNwYWNlLWdyYXktYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblxuXHRcIkdvb2dsZVwiOlxuXHRcdFxuXHRcdCMgTkVYVVNcblx0XHRcImdvb2dsZS1uZXh1cy00XCI6IFwiTmV4dXM0QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtNXhcIjogXCJOZXh1czVCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy02cFwiOiBcIk5leHVzNkJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTlcIjogXCJOZXh1czlCYXNlRGV2aWNlXCJcblxuXHRcdCMgUGl4ZWxcblx0XHRcImdvb2dsZS1waXhlbC1xdWl0ZS1ibGFja1wiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtcGl4ZWwtcmVhbGx5LWJsdWVcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLXBpeGVsLXZlcnktc2lsdmVyXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XG5cdFwiTWlzYyBoYW5kaGVsZFwiOlxuXG5cdFx0IyBIVEMgT05FIEE5XG5cdFx0XCJodGMtb25lLWE5LWJsYWNrXCI6IFwiSFRDYTlCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtYTktd2hpdGVcIjogXCJIVENhOUJhc2VEZXZpY2VcIlxuXG5cdFx0IyBIVEMgT05FIE04XG5cdFx0XCJodGMtb25lLW04LWJsYWNrXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtbTgtZ29sZFwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLW04LXNpbHZlclwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cblx0XHQjIE1JQ1JPU09GVCBMVU1JQSA5NTBcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtYmxhY2tcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtd2hpdGVcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblxuXHRcdCMgU0FNU1VORyBOT1RFIDVcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1ibGFja1wiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LWdvbGRcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1waW5rXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtc2lsdmVyLXRpdGFuaXVtXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtd2hpdGVcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XG5cdFwiT3RoZXJcIjpcblxuXHRcdCMgTm90ZWJvb2tzXG5cdFx0XCJhcHBsZS1tYWNib29rXCI6IFwiQXBwbGVNYWNCb29rXCJcblx0XHRcImFwcGxlLW1hY2Jvb2stYWlyXCI6IFwiQXBwbGVNYWNCb29rQWlyXCJcblx0XHRcImFwcGxlLW1hY2Jvb2stcHJvXCI6IFwiQXBwbGVNYWNCb29rUHJvXCJcblx0XHRcImRlbGwteHBzXCI6IFwiRGVsbFhQU1wiXG5cblx0XHQjIERlc2t0b3BzXG5cdFx0XCJhcHBsZS1pbWFjXCI6IFwiQXBwbGVJTWFjXCJcblxuXHRcdCMgVFZcblx0XHRcInNvbnktdzg1T2NcIjogXCJTb255Vzg1T0NcIlxuXG5cdFx0IyBGdWxsc2NyZWVuXG5cdFx0XCJmdWxsc2NyZWVuXCI6IHRydWVcblxuXG5cbiMgRXhjbHVkZSBkZXZpY2UgZ3JvdXAgZnJvbSBsaXN0XG5QaWNrZXIuZXhjbHVkZSA9IChncm91cCkgLT5cblxuXHRpZiBQaWNrZXIuX2RldmljZUxpc3RbZ3JvdXBdXG5cblx0XHRQaWNrZXIuX2RldmljZUxpc3RbZ3JvdXBdLl9leGNsdWRlRnJvbUxpc3QgPSB0cnVlXG5cdFx0UGlja2VyLmVuYWJsZSgpXG5cblx0ZWxzZVxuXHRcdGNvbnNvbGUubG9nIFwiUGlja2VyOiBDYW4ndCBleGNsdWRlICcje2dyb3VwfScsIG5vIGdyb3VwIGJ5IHRoYXQgbmFtZVwiXG5cblxuIyBSZWluY2x1ZGUgYW4gZXhjbHVkZWQgZGV2aWNlIGdyb3VwIGluIGxpc3RcblBpY2tlci5pbmNsdWRlID0gKGdyb3VwKSAtPlxuXG5cdGlmIFBpY2tlci5fZGV2aWNlTGlzdFtncm91cF1cblxuXHRcdFBpY2tlci5fZGV2aWNlTGlzdFtncm91cF0uX2V4Y2x1ZGVGcm9tTGlzdCA9IGZhbHNlXG5cdFx0UGlja2VyLmVuYWJsZSgpXG5cblx0ZWxzZVxuXHRcdGNvbnNvbGUubG9nIFwiUGlja2VyOiBDYW4ndCBpbmNsdWRlICcje2dyb3VwfScsIG5vIGdyb3VwIGJ5IHRoYXQgbmFtZVwiXG5cblxuIyBBZGQgZHJvcGRvd24gZm9yIHNlbGVjdGluZyBhIGRpZmZlcmVudCBkZXZpY2VcblBpY2tlci5lbmFibGUgPSAtPlxuXG5cdHJldHVybiBpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIG9yIFV0aWxzLmlzTW9iaWxlKClcblxuXHRpZiBub3QgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHQjIERJViB0byBjb250YWluIHRoZSBkZXZpY2UgY29udHJvbHNcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTBweDsgcmlnaHQ6IDEwcHg7IHotaW5kZXg6IDk5OTk7IHRleHQtYWxpZ246IHJpZ2h0XCJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIFBpY2tlci5fY29udHJvbERpdlxuXG5cdFx0IyBEZXZpY2UgbGlzdCBkcm9wZG93blxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic2VsZWN0XCJcblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLnNldEF0dHJpYnV0ZSBcInN0eWxlXCIsIFwiZGlzcGxheTogYmxvY2tcIlxuXHRcdFBpY2tlci5fY29udHJvbERpdi5hcHBlbmRDaGlsZCBQaWNrZXIuX2RldmljZVNlbGVjdG9yXG5cblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLm9uY2hhbmdlID0gLT5cblxuXHRcdFx0cmV0dXJuIGlmIEB2YWx1ZSBpcyBcIm5vbmVcIlxuXG5cdFx0XHR2YXJzID0gZ2V0VXJsVmFycyh3aW5kb3cubG9jYXRpb24uaHJlZilcblx0XHRcdHZhcnMuZGV2aWNlVHlwZSA9IEB2YWx1ZVxuXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIG1ha2VVcmxTdHJpbmcodmFycylcblxuXHRcdCMgRGV2aWNlIHJvdGF0aW9uIHRvZ2dsZVxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImJ1dHRvblwiXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUuc2V0QXR0cmlidXRlIFwidHlwZVwiLCBcImJ1dHRvblwiXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgY29sb3I6ICMzMzM7IHBhZGRpbmc6IDAuNWVtIDFlbTsgYm9yZGVyLXJhZGl1czogM3B4XCJcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5pbm5lckhUTUwgPSBcIlJvdGF0ZVwiXG5cdFx0UGlja2VyLl9jb250cm9sRGl2LmFwcGVuZENoaWxkIFBpY2tlci5fcm90YXRlVG9nZ2xlXG5cblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5vbmNsaWNrID0gLT5cblxuXHRcdFx0dmFycyA9IGdldFVybFZhcnMoKVxuXG5cdFx0XHRpZiAhdmFycy5vcmllbnRhdGlvbiBvciB2YXJzLm9yaWVudGF0aW9uIGlzIFwiMFwiXG5cdFx0XHRcdHZhcnMub3JpZW50YXRpb24gPSBcIjkwXCJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR2YXJzLm9yaWVudGF0aW9uID0gXCIwXCJcblxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBtYWtlVXJsU3RyaW5nKHZhcnMpXG5cblxuXHQjIENsZWFyIGRldmljZSBsaXN0IGJlZm9yZSBwb3B1bGF0aW5nIGluIGNhc2UgaXQgYWxyZWFkeSBleGlzdHNcblx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5pbm5lckhUTUwgPSBcIlwiXG5cblx0IyBMaXN0IGhlYWRlclxuXHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCJQaWNrIGRldmljZVwiKVxuXG5cdCMgR2VuZXJhdGUgbGlzdFxuXHRmb3IgZ3JvdXAsIGRldmljZXMgb2YgUGlja2VyLl9kZXZpY2VMaXN0IHdoZW4gZGV2aWNlcy5fZXhjbHVkZUZyb21MaXN0IGlzbnQgdHJ1ZVxuXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiIFwiKVxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIiMgXCIgKyBncm91cClcblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCIgXCIpXG5cblx0XHRmb3IgZGV2aWNlLCBiYXNlIG9mIGRldmljZXMgd2hlbiBkZXZpY2UgaXNudCBcIl9leGNsdWRlRnJvbUxpc3RcIlxuXHRcdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKGRldmljZSwgZGV2aWNlKVxuXG5cblxuIyBEc3Ryb3kgZHJvcGRvd24gaWYgaXQgZXhpc3RzXG5QaWNrZXIuZGlzYWJsZSA9IC0+XG5cblx0aWYgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkIFBpY2tlci5fY29udHJvbERpdlxuXG5cdFx0UGlja2VyLl9jb250cm9sRGl2ID0gbnVsbFxuXG5cblxuIyBCYXNlIG9iamVjdCB3aGljaCBBZGFwdCBwcm94aWVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG5iYXNlID0ge31cblxuXG5cblxuIyBUaGlzIGlzIHRoZSBldmFsdWF0b3IgZnVuY3Rpb24gdXNlZCBieSBBZGFwdC5jaGVjaygpIHRvIHNlZSB3aGljaCBicmVha3BvaW50XG4jIHRvIGFwcGx5LiBJZiBpdCBkb2Vzbid0IHJldHVybiBhIHN0cmluZywgQWRhcHQuY2hlY2soKSB3aWxsIHJldHVybiBcIm90aGVyXCIuXG4jXG4jIEFkYXB0LnNldEJyZWFrcG9pbnRzKCkgb3ZlcndyaXRlcyB0aGlzIHRvIHJldHVybiBhIGJyZWFrcG9pbnQgYmFzZWQgb25cbiMgU2NyZWVuLndpZHRoLlxuI1xuIyBZb3UgY2FuIG92ZXJ3cml0ZSBpdCB3aXRoIHlvdXIgb3duIGV2YWx1YXRvciBmdW5jdGlvbiB3aXRoIHlvdXIgb3duIGN1c3RvbVxuIyBjcml0ZXJpYSBpZiB5b3UgbGlrZS5cbiNcbmJhc2UuZXZhbHVhdG9yID0gLT5cblx0cmV0dXJuIG51bGxcblxuXG5cbiMgU2V0IGJyZWFrcG9pbnRzIGJhc2VkIG9uIG1heCBzY3JlZW4gd2lkdGg6XG4jXG4jIEFkYXB0LnNldEJyZWFrcG9pbnRzXG4jXHRzbWFsbDogNDAwXG4jXHRtZWRpdW06IDYwMFxuI1x0bGFyZ2U6IDEwMDBcbiNcbiMgWW91IGNhbiBub3cgc2F2ZSBhbnkgdmFyaWFibGUgeW91IHdhbnQgYXMgYSBzZXQgb2YgdmFsdWVzLCBvbmUgcGVyIGJyZWFrcG9pbnQ6XG4jXG4jIEFkYXB0LmNvbHVtbnMgPVxuI1x0c21hbGw6IDFcbiNcdG1lZGl1bTogMlxuI1x0bGFyZ2U6IDRcbiNcdG90aGVyOiA1XG4jXG4jIE5vdyB3aGVuIHlvdSB1c2UgQWRhcHQuY29sdW1ucyBpbiB5b3VyIHByb3RvdHlwZSwgaXQgd2lsbCBvbmx5IHJldHVybiB0aGVcbiMgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgc2NyZWVuIHdpZHRoOlxuI1xuIyBwcmludCBBZGFwdC5jb2x1bW5zXG4jXG4jIFRoaXMgcHJpbnRzIFwiMVwiIG9uIGFuIGlQaG9uZSA3LCBmb3IgZXhhbXBsZVxuIyBcbmJhc2Uuc2V0QnJlYWtwb2ludHMgPSAoYnJlYWtwb2ludHMgPSB7fSkgLT5cblx0XG5cdGJwQXJyYXkgPSBbXVxuXHRcblx0Zm9yIG5hbWUsIHZhbHVlIG9mIGJyZWFrcG9pbnRzXG5cdFxuXHRcdGJwQXJyYXkucHVzaFxuXHRcdFx0bmFtZTogbmFtZVxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFxuXHQjIFNvcnQgaW4gZGVzY2VuZGluZyBvcmRlclxuXHRicEFycmF5LnNvcnQgKGEsIGIpIC0+IGIudmFsdWUgLSBhLnZhbHVlXG5cdFxuXHQjIFdyaXRlIGEgZnVuY3Rpb24gZm9yIEFkYXB0LmV2YWx1YXRvcigpIHRoYXQgY2hlY2tzIGFnYWluc3QgU2NyZWVuLndpZHRoXG5cdGJhc2UuZXZhbHVhdG9yID0gLT5cblx0XHRcblx0XHRyZXN1bHQgPSBudWxsXG5cdFx0XG5cdFx0Zm9yIGJwIGluIGJwQXJyYXlcblx0XHRcblx0XHRcdGlmIFNjcmVlbi53aWR0aCA8PSBicC52YWx1ZVxuXHRcdFx0XHRyZXN1bHQgPSBicC5uYW1lXG5cdFx0XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHRcdFxuXG5cdFx0XG4jIFRoaXMgcmV0dXJucyB0aGUgY3VycmVudCBicmVha3BvaW50LCBvciBcIm90aGVyXCIgaWYgdGhlIGV2YWx1YXRvclxuIyBkb2Vzbid0IHJldHVybiBhIGJyZWFrcG9pbnQgbmFtZS5cbiNcbmJhc2UuY2hlY2sgPSAtPlxuXHRcblx0a2V5ID0gYmFzZS5ldmFsdWF0b3IoKVxuXHRcblx0aWYgbm90IGtleSBvciB0eXBlb2Yga2V5IGlzbnQgXCJzdHJpbmdcIlxuXHRcdGtleSA9IFwib3RoZXJcIlxuXHRcblx0cmV0dXJuIGtleVxuXG5cblxuIyBBZGQgZGV2aWNlIHBpY2tlclxuI1xuYmFzZS5waWNrZXIgPSBQaWNrZXJcblxuXG5cbiMgUHJvcGVydHkgdG8gaG9sZCBhbGwgdXNlciBkZWZpbmVkIHZhbHVlc1xuYmFzZS5fdmFsdWVzID0ge31cblxuXG5cbiMgSW5pdCBmdW5jdGlvblxuI1xuYmFzZS5pbml0ID0gLT5cblxuXHRpZiBVdGlscy5pc0Rlc2t0b3AoKVxuXG5cdFx0dXJsVmFycyA9IGdldFVybFZhcnMoKVxuXG5cdFx0aWYgdXJsVmFycy5kZXZpY2VUeXBlP1xuXHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gdXJsVmFycy5kZXZpY2VUeXBlXG5cblx0XHRpZiB1cmxWYXJzLm9yaWVudGF0aW9uP1xuXHRcdFx0RnJhbWVyLkRldmljZS5vcmllbnRhdGlvbiA9IHBhcnNlSW50KHVybFZhcnMub3JpZW50YXRpb24pXG5cblxuXHRlbHNlXG5cblx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuXG5cblxuIyBDcmVhdGUgQWRhcHQgcHJveHlcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiMgU3RvcmUgYWxsIGV4aXN0aW5nIHByb3BlcnR5IGtleXMgb2YgYmFzZSBvYmplY3QsIHRvIGNhdGNoIHRoZW0gaW4gdGhlIHNldHRlci5cbiMgRXhjZXB0IHRoZSBldmFsdWF0b3IgZnVuY3Rpb24sIGFzIHlvdSBtYXkgb3ZlcndyaXRlIGl0XG4jXG5yZWFkT25seVByb3BldGllcyA9IFtdXG5cbmZvciBrZXksIHZhbHVlIG9mIGJhc2Ugd2hlbiBrZXkgaXNudCBcImV2YWx1YXRvclwiXG5cdHJlYWRPbmx5UHJvcGV0aWVzLnB1c2gga2V5XG5cblxuXG4jIFByb3h5IGhhbmRsZXIgb2JqZWN0XG5cbmhhbmRsZXIgPVxuXHRcblx0c2V0OiAodGFyZ2V0LCBwcm9wLCB2YWx1ZSkgLT5cblxuXHRcdCMgVGhlIGV2YWx1YXRvciBpcyB0aGUgb25seSBleGlzdGluZyBwcm9wZXJ0eSB5b3UgY2FuIG92ZXJ3cml0ZVxuXHRcdGlmIHByb3AgaXMgXCJldmFsdWF0b3JcIlxuXG5cdFx0XHQjIC4uLmJ1dCBvbmx5IHdpdGggYW5vdGhlciBmdW5jdGlvblxuXHRcdFx0aWYgbm90IF8uaXNGdW5jdGlvbih2YWx1ZSlcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJBZGFwdC5ldmFsdWF0b3IgaGFzIHRvIGJlIGEgZnVuY3Rpb25cIlxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRhcmdldFtwcm9wXSA9IHZhbHVlXG5cblxuXHRcdCMgUmVhZC1vbmx5IHByb3BlcnRpZXNcblx0XHRlbHNlIGlmIHByb3AgaW4gcmVhZE9ubHlQcm9wZXRpZXNcblx0XHRcdGNvbnNvbGUubG9nIFwiQ2FuJ3Qgb3ZlcndyaXRlIEFkYXB0LlwiICsgcHJvcFxuXG5cdFx0ZWxzZVxuXG5cdFx0XHR0YXJnZXQuX3ZhbHVlc1twcm9wXSA9IHZhbHVlXG5cblx0XG5cdGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIC0+XG5cdFx0XG5cdFx0aWYgdGFyZ2V0Ll92YWx1ZXM/W3Byb3BdXG5cdFx0XHRyZXR1cm4gdGFyZ2V0Ll92YWx1ZXNbcHJvcF1bdGFyZ2V0LmNoZWNrKCldXG5cdFx0XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRhcmdldFtwcm9wXVxuXG5cblxuIyBDcmVhdGUgcHJveHlcbkFkYXB0ID0gbmV3IFByb3h5KGJhc2UsIGhhbmRsZXIpXG5cblxuXG4jIEluaXRpYWxpemVcbkFkYXB0LmluaXQoKVxuXG5cbmV4cG9ydHMuQWRhcHQgPSBBZGFwdCIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FESUEsSUFBQSxrR0FBQTtFQUFBOztBQUFBLFVBQUEsR0FBYSxTQUFBO0FBRVosTUFBQTtFQUFBLElBQUEsR0FBTztFQUVQLEtBQUEsR0FBUSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFyQixDQUE2Qix5QkFBN0IsRUFBd0QsU0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEtBQVQ7V0FDL0QsSUFBSyxDQUFBLEdBQUEsQ0FBTCxHQUFZO0VBRG1ELENBQXhEO0FBR1IsU0FBTztBQVBLOztBQVdiLGFBQUEsR0FBZ0IsU0FBQyxHQUFEO0FBRWYsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUVULE9BQUEsVUFBQTs7SUFDQyxNQUFBLElBQVUsR0FBQSxHQUFNLEdBQU4sR0FBWSxLQUFaLEdBQW9CO0FBRC9CO0VBR0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYixFQUFnQixDQUFDLENBQWpCO0FBRVQsU0FBTztBQVRROztBQWFoQixVQUFBLEdBQWEsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUVaLE1BQUE7O0lBRm9CLFFBQVE7O0VBRTVCLEdBQUEsR0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QjtFQUNOLEdBQUcsQ0FBQyxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLEtBQTFCO0VBQ0EsR0FBRyxDQUFDLFNBQUosR0FBZ0I7QUFFaEIsU0FBTztBQU5LOztBQWNiLE1BQUEsR0FBUzs7QUFJVCxNQUFNLENBQUMsV0FBUCxHQUVDO0VBQUEsTUFBQSxFQUdDO0lBQUEseUJBQUEsRUFBMkIsb0JBQTNCO0lBQ0EsdUJBQUEsRUFBeUIsb0JBRHpCO0lBRUEsNkJBQUEsRUFBK0Isb0JBRi9CO0lBS0EsMEJBQUEsRUFBNEIscUJBTDVCO0lBTUEsd0JBQUEsRUFBMEIscUJBTjFCO0lBT0EsOEJBQUEsRUFBZ0MscUJBUGhDO0lBVUEsdUJBQUEsRUFBeUIsbUJBVnpCO0lBV0EscUJBQUEsRUFBdUIsbUJBWHZCO0lBWUEsMkJBQUEsRUFBNkIsbUJBWjdCO0dBSEQ7RUFpQkEsUUFBQSxFQUdDO0lBQUEscUJBQUEsRUFBdUIsbUJBQXZCO0lBQ0EsMEJBQUEsRUFBNEIsbUJBRDVCO0lBRUEsdUJBQUEsRUFBeUIsbUJBRnpCO0lBR0Esc0JBQUEsRUFBd0IsbUJBSHhCO0lBSUEsMEJBQUEsRUFBNEIsbUJBSjVCO0lBT0EsMEJBQUEsRUFBNEIsdUJBUDVCO0lBUUEsK0JBQUEsRUFBaUMsdUJBUmpDO0lBU0EsNEJBQUEsRUFBOEIsdUJBVDlCO0lBVUEsMkJBQUEsRUFBNkIsdUJBVjdCO0lBV0EsK0JBQUEsRUFBaUMsdUJBWGpDO0lBY0Esc0JBQUEsRUFBd0IsbUJBZHhCO0lBZUEsMkJBQUEsRUFBNkIsbUJBZjdCO0lBZ0JBLHdCQUFBLEVBQTBCLG1CQWhCMUI7SUFpQkEsNEJBQUEsRUFBOEIsbUJBakI5QjtJQW9CQSwyQkFBQSxFQUE2Qix1QkFwQjdCO0lBcUJBLGdDQUFBLEVBQWtDLHVCQXJCbEM7SUFzQkEsNkJBQUEsRUFBK0IsdUJBdEIvQjtJQXVCQSxpQ0FBQSxFQUFtQyx1QkF2Qm5DO0lBMEJBLHNCQUFBLEVBQXdCLG1CQTFCeEI7SUEyQkEsd0JBQUEsRUFBMEIsbUJBM0IxQjtJQTRCQSw0QkFBQSxFQUE4QixtQkE1QjlCO0lBK0JBLHNCQUFBLEVBQXdCLG9CQS9CeEI7SUFnQ0EsdUJBQUEsRUFBeUIsb0JBaEN6QjtJQWlDQSxxQkFBQSxFQUF1QixvQkFqQ3ZCO0lBa0NBLHVCQUFBLEVBQXlCLG9CQWxDekI7SUFtQ0Esd0JBQUEsRUFBMEIsb0JBbkMxQjtHQXBCRDtFQXlEQSxhQUFBLEVBR0M7SUFBQSw2Q0FBQSxFQUErQywyQkFBL0M7SUFDQSxtQ0FBQSxFQUFxQywyQkFEckM7SUFFQSw0REFBQSxFQUE4RCwyQkFGOUQ7SUFHQSxpREFBQSxFQUFtRCwyQkFIbkQ7SUFJQSxvREFBQSxFQUFzRCwyQkFKdEQ7SUFLQSxzREFBQSxFQUF3RCwyQkFMeEQ7SUFNQSwrQ0FBQSxFQUFpRCwyQkFOakQ7SUFPQSxxREFBQSxFQUF1RCwyQkFQdkQ7SUFRQSxpREFBQSxFQUFtRCwyQkFSbkQ7SUFTQSxrREFBQSxFQUFvRCwyQkFUcEQ7SUFVQSxxREFBQSxFQUF1RCwyQkFWdkQ7SUFXQSxpREFBQSxFQUFtRCwyQkFYbkQ7SUFZQSx1Q0FBQSxFQUF5QywyQkFaekM7SUFlQSxtQ0FBQSxFQUFxQywyQkFmckM7SUFnQkEsK0NBQUEsRUFBaUQsMkJBaEJqRDtJQWlCQSw0REFBQSxFQUE4RCwyQkFqQjlEO0lBa0JBLG9EQUFBLEVBQXNELDJCQWxCdEQ7SUFtQkEsaURBQUEsRUFBbUQsMkJBbkJuRDtJQW9CQSxzREFBQSxFQUF3RCwyQkFwQnhEO0lBcUJBLHNEQUFBLEVBQXdELDJCQXJCeEQ7SUFzQkEscURBQUEsRUFBdUQsMkJBdEJ2RDtJQXVCQSwrQ0FBQSxFQUFpRCwyQkF2QmpEO0lBd0JBLHFEQUFBLEVBQXVELDJCQXhCdkQ7SUF5QkEsaURBQUEsRUFBbUQsMkJBekJuRDtJQTBCQSxrREFBQSxFQUFvRCwyQkExQnBEO0lBMkJBLG1EQUFBLEVBQXFELDJCQTNCckQ7SUE0QkEscURBQUEsRUFBdUQsMkJBNUJ2RDtJQTZCQSx1Q0FBQSxFQUF5QywyQkE3QnpDO0lBZ0NBLDZEQUFBLEVBQStELDJCQWhDL0Q7SUFpQ0EsOERBQUEsRUFBZ0UsMkJBakNoRTtJQWtDQSxnRUFBQSxFQUFrRSwyQkFsQ2xFO0lBbUNBLDJEQUFBLEVBQTZELDJCQW5DN0Q7SUFzQ0EsNkRBQUEsRUFBK0QsMkJBdEMvRDtJQXVDQSw4REFBQSxFQUFnRSwyQkF2Q2hFO0lBd0NBLGdFQUFBLEVBQWtFLDJCQXhDbEU7SUF5Q0EsMkRBQUEsRUFBNkQsMkJBekM3RDtJQTZDQSw0Q0FBQSxFQUE4QyxnQ0E3QzlDO0lBOENBLGlEQUFBLEVBQW1ELGdDQTlDbkQ7SUErQ0EsdURBQUEsRUFBeUQsZ0NBL0N6RDtJQWlEQSwyQ0FBQSxFQUE2QyxvQkFqRDdDO0lBa0RBLDRDQUFBLEVBQThDLG9CQWxEOUM7SUFtREEsNENBQUEsRUFBOEMsb0JBbkQ5QztJQW9EQSw2Q0FBQSxFQUErQyxvQkFwRC9DO0lBcURBLDRDQUFBLEVBQThDLG9CQXJEOUM7SUFzREEsOENBQUEsRUFBZ0Qsb0JBdERoRDtJQXVEQSw0Q0FBQSxFQUE4QyxvQkF2RDlDO0lBd0RBLCtDQUFBLEVBQWlELG9CQXhEakQ7SUF5REEsOENBQUEsRUFBZ0Qsb0JBekRoRDtJQTBEQSwyREFBQSxFQUE2RCxvQkExRDdEO0lBMkRBLHdEQUFBLEVBQTBELG9CQTNEMUQ7SUE0REEsZ0RBQUEsRUFBa0Qsb0JBNURsRDtJQStEQSwyQ0FBQSxFQUE2QyxvQkEvRDdDO0lBZ0VBLDRDQUFBLEVBQThDLG9CQWhFOUM7SUFpRUEsNENBQUEsRUFBOEMsb0JBakU5QztJQWtFQSxpREFBQSxFQUFtRCxvQkFsRW5EO0lBbUVBLDRDQUFBLEVBQThDLG9CQW5FOUM7SUFvRUEsNkNBQUEsRUFBK0Msb0JBcEUvQztJQXFFQSw0Q0FBQSxFQUE4QyxvQkFyRTlDO0lBc0VBLDhDQUFBLEVBQWdELG9CQXRFaEQ7SUF1RUEsNENBQUEsRUFBOEMsb0JBdkU5QztJQXdFQSwrQ0FBQSxFQUFpRCxvQkF4RWpEO0lBeUVBLDhDQUFBLEVBQWdELG9CQXpFaEQ7SUEwRUEsMkRBQUEsRUFBNkQsb0JBMUU3RDtJQTJFQSx3REFBQSxFQUEwRCxvQkEzRTFEO0lBNEVBLGdEQUFBLEVBQWtELG9CQTVFbEQ7SUE2RUEsdURBQUEsRUFBeUQsb0JBN0V6RDtHQTVERDtFQTJJQSxRQUFBLEVBR0M7SUFBQSxnQkFBQSxFQUFrQixrQkFBbEI7SUFDQSxpQkFBQSxFQUFtQixrQkFEbkI7SUFFQSxpQkFBQSxFQUFtQixrQkFGbkI7SUFHQSxnQkFBQSxFQUFrQixrQkFIbEI7SUFNQSwwQkFBQSxFQUE0QixpQkFONUI7SUFPQSwwQkFBQSxFQUE0QixpQkFQNUI7SUFRQSwwQkFBQSxFQUE0QixpQkFSNUI7R0E5SUQ7RUF3SkEsZUFBQSxFQUdDO0lBQUEsa0JBQUEsRUFBb0IsaUJBQXBCO0lBQ0Esa0JBQUEsRUFBb0IsaUJBRHBCO0lBSUEsa0JBQUEsRUFBb0IsaUJBSnBCO0lBS0EsaUJBQUEsRUFBbUIsaUJBTG5CO0lBTUEsbUJBQUEsRUFBcUIsaUJBTnJCO0lBU0EsMkJBQUEsRUFBNkIsd0JBVDdCO0lBVUEsMkJBQUEsRUFBNkIsd0JBVjdCO0lBYUEsNkJBQUEsRUFBK0IsOEJBYi9CO0lBY0EsNEJBQUEsRUFBOEIsOEJBZDlCO0lBZUEsNEJBQUEsRUFBOEIsOEJBZjlCO0lBZ0JBLHVDQUFBLEVBQXlDLDhCQWhCekM7SUFpQkEsNkJBQUEsRUFBK0IsOEJBakIvQjtHQTNKRDtFQThLQSxPQUFBLEVBR0M7SUFBQSxlQUFBLEVBQWlCLGNBQWpCO0lBQ0EsbUJBQUEsRUFBcUIsaUJBRHJCO0lBRUEsbUJBQUEsRUFBcUIsaUJBRnJCO0lBR0EsVUFBQSxFQUFZLFNBSFo7SUFNQSxZQUFBLEVBQWMsV0FOZDtJQVNBLFlBQUEsRUFBYyxXQVRkO0lBWUEsWUFBQSxFQUFjLElBWmQ7R0FqTEQ7OztBQWtNRCxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLEtBQUQ7RUFFaEIsSUFBRyxNQUFNLENBQUMsV0FBWSxDQUFBLEtBQUEsQ0FBdEI7SUFFQyxNQUFNLENBQUMsV0FBWSxDQUFBLEtBQUEsQ0FBTSxDQUFDLGdCQUExQixHQUE2QztXQUM3QyxNQUFNLENBQUMsTUFBUCxDQUFBLEVBSEQ7R0FBQSxNQUFBO1dBTUMsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBQSxHQUEwQixLQUExQixHQUFnQywwQkFBNUMsRUFORDs7QUFGZ0I7O0FBWWpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsS0FBRDtFQUVoQixJQUFHLE1BQU0sQ0FBQyxXQUFZLENBQUEsS0FBQSxDQUF0QjtJQUVDLE1BQU0sQ0FBQyxXQUFZLENBQUEsS0FBQSxDQUFNLENBQUMsZ0JBQTFCLEdBQTZDO1dBQzdDLE1BQU0sQ0FBQyxNQUFQLENBQUEsRUFIRDtHQUFBLE1BQUE7V0FNQyxPQUFPLENBQUMsR0FBUixDQUFZLHlCQUFBLEdBQTBCLEtBQTFCLEdBQWdDLDBCQUE1QyxFQU5EOztBQUZnQjs7QUFZakIsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsU0FBQTtBQUVmLE1BQUE7RUFBQSxJQUFVLEtBQUssQ0FBQyxjQUFOLENBQUEsQ0FBQSxJQUEwQixLQUFLLENBQUMsUUFBTixDQUFBLENBQXBDO0FBQUEsV0FBQTs7RUFFQSxJQUFHLENBQUksTUFBTSxDQUFDLFdBQWQ7SUFHQyxNQUFNLENBQUMsV0FBUCxHQUFxQixRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QjtJQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQW5CLENBQWdDLE9BQWhDLEVBQXlDLDhFQUF6QztJQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixNQUFNLENBQUMsV0FBakM7SUFHQSxNQUFNLENBQUMsZUFBUCxHQUF5QixRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QjtJQUN6QixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQXZCLENBQW9DLE9BQXBDLEVBQTZDLGdCQUE3QztJQUNBLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBbkIsQ0FBK0IsTUFBTSxDQUFDLGVBQXRDO0lBRUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUF2QixHQUFrQyxTQUFBO0FBRWpDLFVBQUE7TUFBQSxJQUFVLElBQUMsQ0FBQSxLQUFELEtBQVUsTUFBcEI7QUFBQSxlQUFBOztNQUVBLElBQUEsR0FBTyxVQUFBLENBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUEzQjtNQUNQLElBQUksQ0FBQyxVQUFMLEdBQWtCLElBQUMsQ0FBQTthQUVuQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEdBQXVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQXJCLENBQTJCLEdBQTNCLENBQWdDLENBQUEsQ0FBQSxDQUFoQyxHQUFxQyxhQUFBLENBQWMsSUFBZDtJQVAzQjtJQVVsQyxNQUFNLENBQUMsYUFBUCxHQUF1QixRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QjtJQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFlBQXJCLENBQWtDLE1BQWxDLEVBQTBDLFFBQTFDO0lBQ0EsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFyQixDQUFrQyxPQUFsQyxFQUEyQyw4RUFBM0M7SUFDQSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQXJCLEdBQWlDO0lBQ2pDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBbkIsQ0FBK0IsTUFBTSxDQUFDLGFBQXRDO0lBRUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFyQixHQUErQixTQUFBO0FBRTlCLFVBQUE7TUFBQSxJQUFBLEdBQU8sVUFBQSxDQUFBO01BRVAsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFOLElBQXFCLElBQUksQ0FBQyxXQUFMLEtBQW9CLEdBQTVDO1FBQ0MsSUFBSSxDQUFDLFdBQUwsR0FBbUIsS0FEcEI7T0FBQSxNQUFBO1FBSUMsSUFBSSxDQUFDLFdBQUwsR0FBbUIsSUFKcEI7O2FBTUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQixHQUF1QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFyQixDQUEyQixHQUEzQixDQUFnQyxDQUFBLENBQUEsQ0FBaEMsR0FBcUMsYUFBQSxDQUFjLElBQWQ7SUFWOUIsRUE1QmhDOztFQTBDQSxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQXZCLEdBQW1DO0VBR25DLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBdkIsQ0FBbUMsVUFBQSxDQUFXLGFBQVgsQ0FBbkM7QUFHQTtBQUFBO09BQUEsWUFBQTs7VUFBOEMsT0FBTyxDQUFDLGdCQUFSLEtBQThCOzs7SUFFM0UsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUF2QixDQUFtQyxVQUFBLENBQVcsR0FBWCxDQUFuQztJQUNBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBdkIsQ0FBbUMsVUFBQSxDQUFXLElBQUEsR0FBTyxLQUFsQixDQUFuQztJQUNBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBdkIsQ0FBbUMsVUFBQSxDQUFXLEdBQVgsQ0FBbkM7OztBQUVBO1dBQUEsaUJBQUE7O1lBQWlDLE1BQUEsS0FBWTt3QkFDNUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUF2QixDQUFtQyxVQUFBLENBQVcsTUFBWCxFQUFtQixNQUFuQixDQUFuQzs7QUFERDs7O0FBTkQ7O0FBcERlOztBQWdFaEIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQTtFQUVoQixJQUFHLE1BQU0sQ0FBQyxXQUFWO0lBRUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLE1BQU0sQ0FBQyxXQUFqQztXQUVBLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLEtBSnRCOztBQUZnQjs7QUFlakIsSUFBQSxHQUFPOztBQWNQLElBQUksQ0FBQyxTQUFMLEdBQWlCLFNBQUE7QUFDaEIsU0FBTztBQURTOztBQTJCakIsSUFBSSxDQUFDLGNBQUwsR0FBc0IsU0FBQyxXQUFEO0FBRXJCLE1BQUE7O0lBRnNCLGNBQWM7O0VBRXBDLE9BQUEsR0FBVTtBQUVWLE9BQUEsbUJBQUE7O0lBRUMsT0FBTyxDQUFDLElBQVIsQ0FDQztNQUFBLElBQUEsRUFBTSxJQUFOO01BQ0EsS0FBQSxFQUFPLEtBRFA7S0FERDtBQUZEO0VBT0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxTQUFDLENBQUQsRUFBSSxDQUFKO1dBQVUsQ0FBQyxDQUFDLEtBQUYsR0FBVSxDQUFDLENBQUM7RUFBdEIsQ0FBYjtTQUdBLElBQUksQ0FBQyxTQUFMLEdBQWlCLFNBQUE7QUFFaEIsUUFBQTtJQUFBLE1BQUEsR0FBUztBQUVULFNBQUEseUNBQUE7O01BRUMsSUFBRyxNQUFNLENBQUMsS0FBUCxJQUFnQixFQUFFLENBQUMsS0FBdEI7UUFDQyxNQUFBLEdBQVMsRUFBRSxDQUFDLEtBRGI7O0FBRkQ7QUFLQSxXQUFPO0VBVFM7QUFkSTs7QUE4QnRCLElBQUksQ0FBQyxLQUFMLEdBQWEsU0FBQTtBQUVaLE1BQUE7RUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLFNBQUwsQ0FBQTtFQUVOLElBQUcsQ0FBSSxHQUFKLElBQVcsT0FBTyxHQUFQLEtBQWdCLFFBQTlCO0lBQ0MsR0FBQSxHQUFNLFFBRFA7O0FBR0EsU0FBTztBQVBLOztBQWFiLElBQUksQ0FBQyxNQUFMLEdBQWM7O0FBS2QsSUFBSSxDQUFDLE9BQUwsR0FBZTs7QUFNZixJQUFJLENBQUMsSUFBTCxHQUFZLFNBQUE7QUFFWCxNQUFBO0VBQUEsSUFBRyxLQUFLLENBQUMsU0FBTixDQUFBLENBQUg7SUFFQyxPQUFBLEdBQVUsVUFBQSxDQUFBO0lBRVYsSUFBRywwQkFBSDtNQUNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQixPQUFPLENBQUMsV0FEcEM7O0lBR0EsSUFBRywyQkFBSDthQUNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBZCxHQUE0QixRQUFBLENBQVMsT0FBTyxDQUFDLFdBQWpCLEVBRDdCO0tBUEQ7R0FBQSxNQUFBO1dBYUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFkLEdBQTJCLGFBYjVCOztBQUZXOztBQTJCWixpQkFBQSxHQUFvQjs7QUFFcEIsS0FBQSxXQUFBOztNQUE0QixHQUFBLEtBQVM7SUFDcEMsaUJBQWlCLENBQUMsSUFBbEIsQ0FBdUIsR0FBdkI7O0FBREQ7O0FBT0EsT0FBQSxHQUVDO0VBQUEsR0FBQSxFQUFLLFNBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxLQUFmO0lBR0osSUFBRyxJQUFBLEtBQVEsV0FBWDtNQUdDLElBQUcsQ0FBSSxDQUFDLENBQUMsVUFBRixDQUFhLEtBQWIsQ0FBUDtlQUNDLE9BQU8sQ0FBQyxHQUFSLENBQVksc0NBQVosRUFERDtPQUFBLE1BQUE7ZUFJQyxNQUFPLENBQUEsSUFBQSxDQUFQLEdBQWUsTUFKaEI7T0FIRDtLQUFBLE1BV0ssSUFBRyxhQUFRLGlCQUFSLEVBQUEsSUFBQSxNQUFIO2FBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBQSxHQUEyQixJQUF2QyxFQURJO0tBQUEsTUFBQTthQUtKLE1BQU0sQ0FBQyxPQUFRLENBQUEsSUFBQSxDQUFmLEdBQXVCLE1BTG5COztFQWRELENBQUw7RUFzQkEsR0FBQSxFQUFLLFNBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxRQUFmO0FBRUosUUFBQTtJQUFBLHdDQUFtQixDQUFBLElBQUEsVUFBbkI7QUFDQyxhQUFPLE1BQU0sQ0FBQyxPQUFRLENBQUEsSUFBQSxDQUFNLENBQUEsTUFBTSxDQUFDLEtBQVAsQ0FBQSxDQUFBLEVBRDdCO0tBQUEsTUFBQTtBQUlDLGFBQU8sTUFBTyxDQUFBLElBQUEsRUFKZjs7RUFGSSxDQXRCTDs7O0FBaUNELEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FBTSxJQUFOLEVBQVksT0FBWjs7QUFLWixLQUFLLENBQUMsSUFBTixDQUFBOztBQUdBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOzs7O0FEbmdCaEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCJ9
