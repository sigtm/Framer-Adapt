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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvRnJhbWVyLUFkYXB0L2FkYXB0LWV4YW1wbGUuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2lndXJkL1JlcG9zL01pbmUgLSBGcmFtZXIgbW9kdWxlcy9GcmFtZXItQWRhcHQvYWRhcHQtZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9BZGFwdC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIEhlbHBlcnNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBHZXQgdGhlIFVSTCB2YXJpYWJsZXMgYXMgYW4gb2JqZWN0XG5nZXRVcmxWYXJzID0gKCkgLT5cblxuXHR2YXJzID0ge31cblxuXHRwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UgL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgKG0sIGtleSwgdmFsdWUpIC0+XG5cdFx0dmFyc1trZXldID0gdmFsdWVcblxuXHRyZXR1cm4gdmFyc1xuXG5cbiMgTWFrZSBwYXJhbWV0ZXIgc3RyaW5nIGZyb20gb2JqZWN0XG5tYWtlVXJsU3RyaW5nID0gKG9iaikgLT5cblxuXHRzdHJpbmcgPSBcIj9cIlxuXG5cdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdHN0cmluZyArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCJcblxuXHRzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMCwgLTEpXG5cblx0cmV0dXJuIHN0cmluZ1xuXG5cbiMgTWFrZSBvcHRpb24gZWxlbWVudFxubWFrZU9wdGlvbiA9IChsYWJlbCwgdmFsdWUgPSBcIm5vbmVcIikgLT5cblxuXHRvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwib3B0aW9uXCJcblx0b3B0LnNldEF0dHJpYnV0ZSBcInZhbHVlXCIsIHZhbHVlXG5cdG9wdC5pbm5lckhUTUwgPSBsYWJlbFxuXG5cdHJldHVybiBvcHRcblxuXG5cbiMgRGV2aWNlIHBpY2tlclxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblBpY2tlciA9IHt9XG5cblxuIyBFdmVyeSBkZXZpY2UgZnJvbSBGcmFtZXIncyBEZXZpY2VDb21wb25lbnQsIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyBiYXNlIGNsYXNzXG5QaWNrZXIuX2RldmljZUxpc3QgPVxuXG5cdFwiaVBhZFwiOlxuXG5cdFx0IyBpUGFkIEFpclxuXHRcdFwiYXBwbGUtaXBhZC1haXItMi1zaWx2ZXJcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1haXItMi1nb2xkXCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItc3BhY2UtZ3JheVwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cblx0XHQjIGlQYWQgTWluaVxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtc2lsdmVyXCI6IFwiaVBhZE1pbmk0QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLW1pbmktNC1nb2xkXCI6IFwiaVBhZE1pbmk0QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLW1pbmktNC1zcGFjZS1ncmF5XCI6IFwiaVBhZE1pbmk0QmFzZURldmljZVwiXG5cblx0XHQjIGlQYWQgUHJvXG5cdFx0XCJhcHBsZS1pcGFkLXByby1zaWx2ZXJcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLXByby1nb2xkXCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1wcm8tc3BhY2UtZ3JheVwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblxuXHRcImlQaG9uZVwiOlxuXHRcdFxuXHRcdCMgaVBob25lIDdcblx0XHRcImFwcGxlLWlwaG9uZS03LWdvbGRcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1yb3NlLWdvbGRcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1zaWx2ZXJcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1ibGFja1wiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LWpldC1ibGFja1wiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDcgUGx1c1xuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1nb2xkXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtcm9zZS1nb2xkXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtc2lsdmVyXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtYmxhY2tcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1qZXQtYmxhY2tcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGhvbmUgNnNcblx0XHRcImFwcGxlLWlwaG9uZS02cy1nb2xkXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1zaWx2ZXJcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtc3BhY2UtZ3JheVwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDZzIFBsdXNcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLWdvbGRcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtcm9zZS1nb2xkXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXNpbHZlclwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zcGFjZS1ncmF5XCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDVTXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtZ29sZFwiOiBcImlQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01cy1zaWx2ZXJcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtc3BhY2UtZ3JheVwiOiBcImlQaG9uZTVCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDVDXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMtYmx1ZVwiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMtZ3JlZW5cIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLXJlZFwiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMtd2hpdGVcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLXllbGxvd1wiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cblx0XCJBcHBsZSBXYXRjaFwiOlxuXHRcdFxuXHRcdCMgQXBwbGUgV2F0Y2ggU2VyaWVzIDIgMzhtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1ibGFjay1zdGVlbC1ibGFja1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1lZGl0aW9uXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXJvc2UtZ29sZC1hbHVtaW51bS1taWRuaWdodC1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1jb2NvYVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tY29uY3JldGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLW9jZWFuLWJsdWVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXJlZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tdHVycXVvaXNlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0teWVsbG93XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc3BvcnQtYWx1bWludW0td2FsbnV0XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXN0ZWVsLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIFNlcmllcyAyIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tZWRpdGlvblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1nb2xkLWFsdW1pbnVtLWNvY29hXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXJvc2UtZ29sZC1hbHVtaW51bS1taWRuaWdodC1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1jb25jcmV0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tZ3JlZW5cIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWxpZ2h0LXBpbmtcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLW9jZWFuLWJsdWVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXBpbmstc2FuZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tcmVkXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS10dXJxdW9pc2VcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS15ZWxsb3dcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc3BhY2UtYmxhY2stc3RlZWwtYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFja1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zdGVlbC13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBOaWtlKyAzOG1tXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLWNvb2wtZ3JheVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIE5pa2UrIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy00Mm1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stY29vbC1ncmF5XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggMzhtbVxuXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1yb3NlLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zdGFpbmxlc3Mtc3RlZWwtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2VcIlxuXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLWJsYWNrLXN0ZWVsLWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLWdvbGQtbWlkbmlnaHQtYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1yb3NlLWdvbGQtbGF2ZW5kZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1mb2ctY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZ3JlZW4tY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tcmVkLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1nb2xkLWFudGlxdWUtd2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tcm9zZS1nb2xkLXN0b25lLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LXNwYWNlLWdyYXktYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggNDJtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1ibGFjay1zdGVlbC1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tZ29sZC1taWRuaWdodC1ibHVlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXJvc2UtZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXJvc2UtZ29sZC1sYXZlbmRlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1ibHVlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLWZvZy1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1ncmVlbi1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1yZWQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0td2FsbnV0LWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLWdvbGQtYW50aXF1ZS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1yb3NlLWdvbGQtc3RvbmUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtc3BhY2UtZ3JheS1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zdGFpbmxlc3Mtc3RlZWwtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXG5cdFwiR29vZ2xlXCI6XG5cdFx0XG5cdFx0IyBORVhVU1xuXHRcdFwiZ29vZ2xlLW5leHVzLTRcIjogXCJOZXh1czRCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy01eFwiOiBcIk5leHVzNUJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTZwXCI6IFwiTmV4dXM2QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtOVwiOiBcIk5leHVzOUJhc2VEZXZpY2VcIlxuXG5cdFx0IyBQaXhlbFxuXHRcdFwiZ29vZ2xlLXBpeGVsLXF1aXRlLWJsYWNrXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1waXhlbC1yZWFsbHktYmx1ZVwiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtcGl4ZWwtdmVyeS1zaWx2ZXJcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcblx0XCJNaXNjIGhhbmRoZWxkXCI6XG5cblx0XHQjIEhUQyBPTkUgQTlcblx0XHRcImh0Yy1vbmUtYTktYmxhY2tcIjogXCJIVENhOUJhc2VEZXZpY2VcIlxuXHRcdFwiaHRjLW9uZS1hOS13aGl0ZVwiOiBcIkhUQ2E5QmFzZURldmljZVwiXG5cblx0XHQjIEhUQyBPTkUgTThcblx0XHRcImh0Yy1vbmUtbTgtYmxhY2tcIjogXCJIVENtOEJhc2VEZXZpY2VcIlxuXHRcdFwiaHRjLW9uZS1tOC1nb2xkXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtbTgtc2lsdmVyXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblxuXHRcdCMgTUlDUk9TT0ZUIExVTUlBIDk1MFxuXHRcdFwibWljcm9zb2Z0LWx1bWlhLTk1MC1ibGFja1wiOiBcIk1TRlRMdW1pYTk1MEJhc2VEZXZpY2VcIlxuXHRcdFwibWljcm9zb2Z0LWx1bWlhLTk1MC13aGl0ZVwiOiBcIk1TRlRMdW1pYTk1MEJhc2VEZXZpY2VcIlxuXG5cdFx0IyBTQU1TVU5HIE5PVEUgNVxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LWJsYWNrXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtZ29sZFwiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LXBpbmtcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1zaWx2ZXItdGl0YW5pdW1cIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS13aGl0ZVwiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcblx0XCJPdGhlclwiOlxuXG5cdFx0IyBOb3RlYm9va3Ncblx0XHRcImFwcGxlLW1hY2Jvb2tcIjogXCJBcHBsZU1hY0Jvb2tcIlxuXHRcdFwiYXBwbGUtbWFjYm9vay1haXJcIjogXCJBcHBsZU1hY0Jvb2tBaXJcIlxuXHRcdFwiYXBwbGUtbWFjYm9vay1wcm9cIjogXCJBcHBsZU1hY0Jvb2tQcm9cIlxuXHRcdFwiZGVsbC14cHNcIjogXCJEZWxsWFBTXCJcblxuXHRcdCMgRGVza3RvcHNcblx0XHRcImFwcGxlLWltYWNcIjogXCJBcHBsZUlNYWNcIlxuXG5cdFx0IyBUVlxuXHRcdFwic29ueS13ODVPY1wiOiBcIlNvbnlXODVPQ1wiXG5cblx0XHQjIEZ1bGxzY3JlZW5cblx0XHRcImZ1bGxzY3JlZW5cIjogdHJ1ZVxuXG5cblxuIyBFeGNsdWRlIGRldmljZSBncm91cCBmcm9tIGxpc3RcblBpY2tlci5leGNsdWRlID0gKGdyb3VwKSAtPlxuXG5cdGlmIFBpY2tlci5fZGV2aWNlTGlzdFtncm91cF1cblxuXHRcdFBpY2tlci5fZGV2aWNlTGlzdFtncm91cF0uX2V4Y2x1ZGVGcm9tTGlzdCA9IHRydWVcblx0XHRQaWNrZXIuZW5hYmxlKClcblxuXHRlbHNlXG5cdFx0Y29uc29sZS5sb2cgXCJQaWNrZXI6IENhbid0IGV4Y2x1ZGUgJyN7Z3JvdXB9Jywgbm8gZ3JvdXAgYnkgdGhhdCBuYW1lXCJcblxuXG4jIFJlaW5jbHVkZSBhbiBleGNsdWRlZCBkZXZpY2UgZ3JvdXAgaW4gbGlzdFxuUGlja2VyLmluY2x1ZGUgPSAoZ3JvdXApIC0+XG5cblx0aWYgUGlja2VyLl9kZXZpY2VMaXN0W2dyb3VwXVxuXG5cdFx0UGlja2VyLl9kZXZpY2VMaXN0W2dyb3VwXS5fZXhjbHVkZUZyb21MaXN0ID0gZmFsc2Vcblx0XHRQaWNrZXIuZW5hYmxlKClcblxuXHRlbHNlXG5cdFx0Y29uc29sZS5sb2cgXCJQaWNrZXI6IENhbid0IGluY2x1ZGUgJyN7Z3JvdXB9Jywgbm8gZ3JvdXAgYnkgdGhhdCBuYW1lXCJcblxuXG4jIEFkZCBkcm9wZG93biBmb3Igc2VsZWN0aW5nIGEgZGlmZmVyZW50IGRldmljZVxuUGlja2VyLmVuYWJsZSA9IC0+XG5cblx0cmV0dXJuIGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgb3IgVXRpbHMuaXNNb2JpbGUoKVxuXG5cdGlmIG5vdCBQaWNrZXIuX2NvbnRyb2xEaXZcblxuXHRcdCMgRElWIHRvIGNvbnRhaW4gdGhlIGRldmljZSBjb250cm9sc1xuXHRcdFBpY2tlci5fY29udHJvbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJkaXZcIlxuXHRcdFBpY2tlci5fY29udHJvbERpdi5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMHB4OyByaWdodDogMTBweDsgei1pbmRleDogOTk5OTsgdGV4dC1hbGlnbjogcmlnaHRcIlxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHQjIERldmljZSBsaXN0IGRyb3Bkb3duXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzZWxlY3RcIlxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3Iuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJkaXNwbGF5OiBibG9ja1wiXG5cdFx0UGlja2VyLl9jb250cm9sRGl2LmFwcGVuZENoaWxkIFBpY2tlci5fZGV2aWNlU2VsZWN0b3JcblxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3Iub25jaGFuZ2UgPSAtPlxuXG5cdFx0XHRyZXR1cm4gaWYgQHZhbHVlIGlzIFwibm9uZVwiXG5cblx0XHRcdHZhcnMgPSBnZXRVcmxWYXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuXHRcdFx0dmFycy5kZXZpY2VUeXBlID0gQHZhbHVlXG5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgbWFrZVVybFN0cmluZyh2YXJzKVxuXG5cdFx0IyBEZXZpY2Ugcm90YXRpb24gdG9nZ2xlXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYnV0dG9uXCJcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5zZXRBdHRyaWJ1dGUgXCJ0eXBlXCIsIFwiYnV0dG9uXCJcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBjb2xvcjogIzMzMzsgcGFkZGluZzogMC41ZW0gMWVtOyBib3JkZXItcmFkaXVzOiAzcHhcIlxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlLmlubmVySFRNTCA9IFwiUm90YXRlXCJcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYuYXBwZW5kQ2hpbGQgUGlja2VyLl9yb3RhdGVUb2dnbGVcblxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlLm9uY2xpY2sgPSAtPlxuXG5cdFx0XHR2YXJzID0gZ2V0VXJsVmFycygpXG5cblx0XHRcdGlmICF2YXJzLm9yaWVudGF0aW9uIG9yIHZhcnMub3JpZW50YXRpb24gaXMgXCIwXCJcblx0XHRcdFx0dmFycy5vcmllbnRhdGlvbiA9IFwiOTBcIlxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHZhcnMub3JpZW50YXRpb24gPSBcIjBcIlxuXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIG1ha2VVcmxTdHJpbmcodmFycylcblxuXG5cdCMgQ2xlYXIgZGV2aWNlIGxpc3QgYmVmb3JlIHBvcHVsYXRpbmcgaW4gY2FzZSBpdCBhbHJlYWR5IGV4aXN0c1xuXHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmlubmVySFRNTCA9IFwiXCJcblxuXHQjIExpc3QgaGVhZGVyXG5cdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIlBpY2sgZGV2aWNlXCIpXG5cblx0IyBHZW5lcmF0ZSBsaXN0XG5cdGZvciBncm91cCwgZGV2aWNlcyBvZiBQaWNrZXIuX2RldmljZUxpc3Qgd2hlbiBkZXZpY2VzLl9leGNsdWRlRnJvbUxpc3QgaXNudCB0cnVlXG5cblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCIgXCIpXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiIyBcIiArIGdyb3VwKVxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIiBcIilcblxuXHRcdGZvciBkZXZpY2UsIGJhc2Ugb2YgZGV2aWNlcyB3aGVuIGRldmljZSBpc250IFwiX2V4Y2x1ZGVGcm9tTGlzdFwiXG5cdFx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oZGV2aWNlLCBkZXZpY2UpXG5cblxuXG4jIERzdHJveSBkcm9wZG93biBpZiBpdCBleGlzdHNcblBpY2tlci5kaXNhYmxlID0gLT5cblxuXHRpZiBQaWNrZXIuX2NvbnRyb2xEaXZcblxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYgPSBudWxsXG5cblxuXG4jIEJhc2Ugb2JqZWN0IHdoaWNoIEFkYXB0IHByb3hpZXNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbmJhc2UgPSB7fVxuXG5cblxuXG4jIFRoaXMgaXMgdGhlIGV2YWx1YXRvciBmdW5jdGlvbiB1c2VkIGJ5IEFkYXB0LmNoZWNrKCkgdG8gc2VlIHdoaWNoIGJyZWFrcG9pbnRcbiMgdG8gYXBwbHkuIElmIGl0IGRvZXNuJ3QgcmV0dXJuIGEgc3RyaW5nLCBBZGFwdC5jaGVjaygpIHdpbGwgcmV0dXJuIFwib3RoZXJcIi5cbiNcbiMgQWRhcHQuc2V0QnJlYWtwb2ludHMoKSBvdmVyd3JpdGVzIHRoaXMgdG8gcmV0dXJuIGEgYnJlYWtwb2ludCBiYXNlZCBvblxuIyBTY3JlZW4ud2lkdGguXG4jXG4jIFlvdSBjYW4gb3ZlcndyaXRlIGl0IHdpdGggeW91ciBvd24gZXZhbHVhdG9yIGZ1bmN0aW9uIHdpdGggeW91ciBvd24gY3VzdG9tXG4jIGNyaXRlcmlhIGlmIHlvdSBsaWtlLlxuI1xuYmFzZS5ldmFsdWF0b3IgPSAtPlxuXHRyZXR1cm4gbnVsbFxuXG5cblxuIyBTZXQgYnJlYWtwb2ludHMgYmFzZWQgb24gbWF4IHNjcmVlbiB3aWR0aDpcbiNcbiMgQWRhcHQuc2V0QnJlYWtwb2ludHNcbiNcdHNtYWxsOiA0MDBcbiNcdG1lZGl1bTogNjAwXG4jXHRsYXJnZTogMTAwMFxuI1xuIyBZb3UgY2FuIG5vdyBzYXZlIGFueSB2YXJpYWJsZSB5b3Ugd2FudCBhcyBhIHNldCBvZiB2YWx1ZXMsIG9uZSBwZXIgYnJlYWtwb2ludDpcbiNcbiMgQWRhcHQuY29sdW1ucyA9XG4jXHRzbWFsbDogMVxuI1x0bWVkaXVtOiAyXG4jXHRsYXJnZTogNFxuI1x0b3RoZXI6IDVcbiNcbiMgTm93IHdoZW4geW91IHVzZSBBZGFwdC5jb2x1bW5zIGluIHlvdXIgcHJvdG90eXBlLCBpdCB3aWxsIG9ubHkgcmV0dXJuIHRoZVxuIyBjb3JyZWN0IHZhbHVlIGJhc2VkIG9uIHRoZSBzY3JlZW4gd2lkdGg6XG4jXG4jIHByaW50IEFkYXB0LmNvbHVtbnNcbiNcbiMgVGhpcyBwcmludHMgXCIxXCIgb24gYW4gaVBob25lIDcsIGZvciBleGFtcGxlXG4jIFxuYmFzZS5zZXRCcmVha3BvaW50cyA9IChicmVha3BvaW50cyA9IHt9KSAtPlxuXHRcblx0YnBBcnJheSA9IFtdXG5cdFxuXHRmb3IgbmFtZSwgdmFsdWUgb2YgYnJlYWtwb2ludHNcblx0XG5cdFx0YnBBcnJheS5wdXNoXG5cdFx0XHRuYW1lOiBuYW1lXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XG5cdCMgU29ydCBpbiBkZXNjZW5kaW5nIG9yZGVyXG5cdGJwQXJyYXkuc29ydCAoYSwgYikgLT4gYi52YWx1ZSAtIGEudmFsdWVcblx0XG5cdCMgV3JpdGUgYSBmdW5jdGlvbiBmb3IgQWRhcHQuZXZhbHVhdG9yKCkgdGhhdCBjaGVja3MgYWdhaW5zdCBTY3JlZW4ud2lkdGhcblx0YmFzZS5ldmFsdWF0b3IgPSAtPlxuXHRcdFxuXHRcdHJlc3VsdCA9IG51bGxcblx0XHRcblx0XHRmb3IgYnAgaW4gYnBBcnJheVxuXHRcdFxuXHRcdFx0aWYgU2NyZWVuLndpZHRoIDw9IGJwLnZhbHVlXG5cdFx0XHRcdHJlc3VsdCA9IGJwLm5hbWVcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XG5cblx0XHRcbiMgVGhpcyByZXR1cm5zIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQsIG9yIFwib3RoZXJcIiBpZiB0aGUgZXZhbHVhdG9yXG4jIGRvZXNuJ3QgcmV0dXJuIGEgYnJlYWtwb2ludCBuYW1lLlxuI1xuYmFzZS5jaGVjayA9IC0+XG5cdFxuXHRrZXkgPSBiYXNlLmV2YWx1YXRvcigpXG5cdFxuXHRpZiBub3Qga2V5IG9yIHR5cGVvZiBrZXkgaXNudCBcInN0cmluZ1wiXG5cdFx0a2V5ID0gXCJvdGhlclwiXG5cdFxuXHRyZXR1cm4ga2V5XG5cblxuXG4jIEFkZCBkZXZpY2UgcGlja2VyXG4jXG5iYXNlLnBpY2tlciA9IFBpY2tlclxuXG5cblxuIyBQcm9wZXJ0eSB0byBob2xkIGFsbCB1c2VyIGRlZmluZWQgdmFsdWVzXG5iYXNlLl92YWx1ZXMgPSB7fVxuXG5cblxuIyBJbml0IGZ1bmN0aW9uXG4jXG5iYXNlLmluaXQgPSAtPlxuXG5cdGlmIFV0aWxzLmlzRGVza3RvcCgpXG5cblx0XHR1cmxWYXJzID0gZ2V0VXJsVmFycygpXG5cblx0XHRpZiB1cmxWYXJzLmRldmljZVR5cGU/XG5cdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSB1cmxWYXJzLmRldmljZVR5cGVcblxuXHRcdGlmIHVybFZhcnMub3JpZW50YXRpb24/XG5cdFx0XHRGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uID0gcGFyc2VJbnQodXJsVmFycy5vcmllbnRhdGlvbilcblxuXG5cdGVsc2VcblxuXHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG5cblxuXG4jIENyZWF0ZSBBZGFwdCBwcm94eVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuIyBTdG9yZSBhbGwgZXhpc3RpbmcgcHJvcGVydHkga2V5cyBvZiBiYXNlIG9iamVjdCwgdG8gY2F0Y2ggdGhlbSBpbiB0aGUgc2V0dGVyLlxuIyBFeGNlcHQgdGhlIGV2YWx1YXRvciBmdW5jdGlvbiwgYXMgeW91IG1heSBvdmVyd3JpdGUgaXRcbiNcbnJlYWRPbmx5UHJvcGV0aWVzID0gW11cblxuZm9yIGtleSwgdmFsdWUgb2YgYmFzZSB3aGVuIGtleSBpc250IFwiZXZhbHVhdG9yXCJcblx0cmVhZE9ubHlQcm9wZXRpZXMucHVzaCBrZXlcblxuXG5cbiMgUHJveHkgaGFuZGxlciBvYmplY3RcblxuaGFuZGxlciA9XG5cdFxuXHRzZXQ6ICh0YXJnZXQsIHByb3AsIHZhbHVlKSAtPlxuXG5cdFx0IyBUaGUgZXZhbHVhdG9yIGlzIHRoZSBvbmx5IGV4aXN0aW5nIHByb3BlcnR5IHlvdSBjYW4gb3ZlcndyaXRlXG5cdFx0aWYgcHJvcCBpcyBcImV2YWx1YXRvclwiXG5cblx0XHRcdCMgLi4uYnV0IG9ubHkgd2l0aCBhbm90aGVyIGZ1bmN0aW9uXG5cdFx0XHRpZiBub3QgXy5pc0Z1bmN0aW9uKHZhbHVlKVxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkFkYXB0LmV2YWx1YXRvciBoYXMgdG8gYmUgYSBmdW5jdGlvblwiXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dGFyZ2V0W3Byb3BdID0gdmFsdWVcblxuXG5cdFx0IyBSZWFkLW9ubHkgcHJvcGVydGllc1xuXHRcdGVsc2UgaWYgcHJvcCBpbiByZWFkT25seVByb3BldGllc1xuXHRcdFx0Y29uc29sZS5sb2cgXCJDYW4ndCBvdmVyd3JpdGUgQWRhcHQuXCIgKyBwcm9wXG5cblx0XHRlbHNlXG5cblx0XHRcdHRhcmdldC5fdmFsdWVzW3Byb3BdID0gdmFsdWVcblxuXHRcblx0Z2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgLT5cblx0XHRcblx0XHRpZiB0YXJnZXQuX3ZhbHVlcz9bcHJvcF1cblx0XHRcdHJldHVybiB0YXJnZXQuX3ZhbHVlc1twcm9wXVt0YXJnZXQuY2hlY2soKV1cblx0XHRcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGFyZ2V0W3Byb3BdXG5cblxuXG4jIENyZWF0ZSBwcm94eVxuQWRhcHQgPSBuZXcgUHJveHkoYmFzZSwgaGFuZGxlcilcblxuXG5cbiMgSW5pdGlhbGl6ZVxuQWRhcHQuaW5pdCgpXG5cblxuZXhwb3J0cy5BZGFwdCA9IEFkYXB0IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURJQSxJQUFBLGtHQUFBO0VBQUE7O0FBQUEsVUFBQSxHQUFhLFNBQUE7QUFFWixNQUFBO0VBQUEsSUFBQSxHQUFPO0VBRVAsS0FBQSxHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQXJCLENBQTZCLHlCQUE3QixFQUF3RCxTQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsS0FBVDtXQUMvRCxJQUFLLENBQUEsR0FBQSxDQUFMLEdBQVk7RUFEbUQsQ0FBeEQ7QUFHUixTQUFPO0FBUEs7O0FBV2IsYUFBQSxHQUFnQixTQUFDLEdBQUQ7QUFFZixNQUFBO0VBQUEsTUFBQSxHQUFTO0FBRVQsT0FBQSxVQUFBOztJQUNDLE1BQUEsSUFBVSxHQUFBLEdBQU0sR0FBTixHQUFZLEtBQVosR0FBb0I7QUFEL0I7RUFHQSxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakI7QUFFVCxTQUFPO0FBVFE7O0FBYWhCLFVBQUEsR0FBYSxTQUFDLEtBQUQsRUFBUSxLQUFSO0FBRVosTUFBQTs7SUFGb0IsUUFBUTs7RUFFNUIsR0FBQSxHQUFNLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0VBQ04sR0FBRyxDQUFDLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsS0FBMUI7RUFDQSxHQUFHLENBQUMsU0FBSixHQUFnQjtBQUVoQixTQUFPO0FBTks7O0FBY2IsTUFBQSxHQUFTOztBQUlULE1BQU0sQ0FBQyxXQUFQLEdBRUM7RUFBQSxNQUFBLEVBR0M7SUFBQSx5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
