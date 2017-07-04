require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Adapt":[function(require,module,exports){
var Adapt, Picker, base, getUrlVars, handler, isDesktop, key, makeOption, makeUrlString, readOnlyPropeties, value,
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

isDesktop = function() {
  if (/(tablet)|(iPad)|(Nexus 9)|(mobi)|(Android)/i.test(navigator.userAgent)) {
    return false;
  }
  return true;
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
  var key, ref, value;
  if (group == null) {
    group = "";
  }
  ref = Picker._deviceList;
  for (key in ref) {
    value = ref[key];
    if (group.toLowerCase() === key.toLowerCase()) {
      value._excludeFromList = true;
    }
  }
  return Picker.enable();
};

Picker.include = function(group) {
  var key, match, ref, value;
  if (group == null) {
    group = "";
  }
  ref = Picker._deviceList;
  for (key in ref) {
    value = ref[key];
    if (group.toLowerCase() === key.toLowerCase()) {
      match = value._excludeFromList = false;
    }
  }
  return Picker.enable();
};

Picker.enable = function() {
  var base, device, devices, group, ref, results;
  if (!isDesktop()) {
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
  if (isDesktop()) {
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
      return target._values[prop][target.check()] || target._values[prop];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvRnJhbWVyLUFkYXB0L2FkYXB0LWV4YW1wbGUuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2lndXJkL1JlcG9zL01pbmUgLSBGcmFtZXIgbW9kdWxlcy9GcmFtZXItQWRhcHQvYWRhcHQtZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9BZGFwdC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIEhlbHBlcnNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBHZXQgdGhlIFVSTCB2YXJpYWJsZXMgYXMgYW4gb2JqZWN0XG5nZXRVcmxWYXJzID0gKCkgLT5cblxuXHR2YXJzID0ge31cblxuXHRwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UgL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgKG0sIGtleSwgdmFsdWUpIC0+XG5cdFx0dmFyc1trZXldID0gdmFsdWVcblxuXHRyZXR1cm4gdmFyc1xuXG5cbiMgTWFrZSBwYXJhbWV0ZXIgc3RyaW5nIGZyb20gb2JqZWN0XG5tYWtlVXJsU3RyaW5nID0gKG9iaikgLT5cblxuXHRzdHJpbmcgPSBcIj9cIlxuXG5cdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdHN0cmluZyArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCJcblxuXHRzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMCwgLTEpXG5cblx0cmV0dXJuIHN0cmluZ1xuXG5cbiMgTWFrZSBvcHRpb24gZWxlbWVudFxubWFrZU9wdGlvbiA9IChsYWJlbCwgdmFsdWUgPSBcIm5vbmVcIikgLT5cblxuXHRvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwib3B0aW9uXCJcblx0b3B0LnNldEF0dHJpYnV0ZSBcInZhbHVlXCIsIHZhbHVlXG5cdG9wdC5pbm5lckhUTUwgPSBsYWJlbFxuXG5cdHJldHVybiBvcHRcblxuXG4jIFNpbmNlIFV0aWxzLmlzRGVza3RvcCgpIGRvZXNuJ3Qgc2VlbSB0byBwaWNrIHVwIGV2ZXJ5dGhpbmcgKG5vdGFibHkgc29tZSBBbmRyb2lkIGRldmljZXMpXG5pc0Rlc2t0b3AgPSAtPlxuXG5cdGlmIC8odGFibGV0KXwoaVBhZCl8KE5leHVzIDkpfChtb2JpKXwoQW5kcm9pZCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0cmV0dXJuIHRydWVcblxuXG4jIERldmljZSBwaWNrZXJcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5QaWNrZXIgPSB7fVxuXG5cbiMgRXZlcnkgZGV2aWNlIGZyb20gRnJhbWVyJ3MgRGV2aWNlQ29tcG9uZW50LCB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgYmFzZSBjbGFzc1xuUGlja2VyLl9kZXZpY2VMaXN0ID1cblxuXHRcImlQYWRcIjpcblxuXHRcdCMgaVBhZCBBaXJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItc2lsdmVyXCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItZ29sZFwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLXNwYWNlLWdyYXlcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGFkIE1pbmlcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LXNpbHZlclwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtZ29sZFwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtc3BhY2UtZ3JheVwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGFkIFByb1xuXHRcdFwiYXBwbGUtaXBhZC1wcm8tc2lsdmVyXCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1wcm8tZ29sZFwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtcHJvLXNwYWNlLWdyYXlcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cblx0XCJpUGhvbmVcIjpcblx0XHRcblx0XHQjIGlQaG9uZSA3XG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1nb2xkXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcm9zZS1nb2xkXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctc2lsdmVyXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctYmxhY2tcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1qZXQtYmxhY2tcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA3IFBsdXNcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXNpbHZlclwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtamV0LWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDZzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtZ29sZFwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtc2lsdmVyXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA2cyBQbHVzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1nb2xkXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zaWx2ZXJcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtc3BhY2UtZ3JheVwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA1U1xuXHRcdFwiYXBwbGUtaXBob25lLTVzLWdvbGRcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtc2lsdmVyXCI6IFwiaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA1Q1xuXHRcdFwiYXBwbGUtaXBob25lLTVjLWJsdWVcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLWdyZWVuXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1yZWRcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLXdoaXRlXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy15ZWxsb3dcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXG5cdFwiQXBwbGUgV2F0Y2hcIjpcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIFNlcmllcyAyIDM4bW1cblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tYmxhY2stc3RlZWwtYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tZWRpdGlvblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tY29jb2FcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWNvbmNyZXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1yZWRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXR1cnF1b2lzZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0td2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXllbGxvd1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zdGVlbC13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBTZXJpZXMgMiA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLWVkaXRpb25cIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tZ29sZC1hbHVtaW51bS1jb2NvYVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tY29uY3JldGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWdyZWVuXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1saWdodC1waW5rXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1waW5rLXNhbmRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXJlZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tdHVycXVvaXNlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0teWVsbG93XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWJsYWNrLXN0ZWVsLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc3RlZWwtd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggTmlrZSsgMzhtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay1jb29sLWdyYXlcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBOaWtlKyA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLWNvb2wtZ3JheVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIDM4bW1cblxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1ibGFjay1zdGVlbC1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLW1pZG5pZ2h0LWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWxhdmVuZGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZm9nLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWdyZWVuLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJlZC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS13YWxudXQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0td2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZ29sZC1hbnRpcXVlLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJvc2UtZ29sZC1zdG9uZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1zcGFjZS1ncmF5LWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLTQybW0tYmxhY2stc3RlZWwtYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWdvbGQtbWlkbmlnaHQtYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtbGF2ZW5kZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1mb2ctY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZ3JlZW4tY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcmVkLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1nb2xkLWFudGlxdWUtd2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcm9zZS1nb2xkLXN0b25lLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LXNwYWNlLWdyYXktYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblxuXHRcIkdvb2dsZVwiOlxuXHRcdFxuXHRcdCMgTkVYVVNcblx0XHRcImdvb2dsZS1uZXh1cy00XCI6IFwiTmV4dXM0QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtNXhcIjogXCJOZXh1czVCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy02cFwiOiBcIk5leHVzNkJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTlcIjogXCJOZXh1czlCYXNlRGV2aWNlXCJcblxuXHRcdCMgUGl4ZWxcblx0XHRcImdvb2dsZS1waXhlbC1xdWl0ZS1ibGFja1wiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtcGl4ZWwtcmVhbGx5LWJsdWVcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLXBpeGVsLXZlcnktc2lsdmVyXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XG5cdFwiTWlzYyBoYW5kaGVsZFwiOlxuXG5cdFx0IyBIVEMgT05FIEE5XG5cdFx0XCJodGMtb25lLWE5LWJsYWNrXCI6IFwiSFRDYTlCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtYTktd2hpdGVcIjogXCJIVENhOUJhc2VEZXZpY2VcIlxuXG5cdFx0IyBIVEMgT05FIE04XG5cdFx0XCJodGMtb25lLW04LWJsYWNrXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtbTgtZ29sZFwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLW04LXNpbHZlclwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cblx0XHQjIE1JQ1JPU09GVCBMVU1JQSA5NTBcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtYmxhY2tcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtd2hpdGVcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblxuXHRcdCMgU0FNU1VORyBOT1RFIDVcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1ibGFja1wiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LWdvbGRcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1waW5rXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtc2lsdmVyLXRpdGFuaXVtXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtd2hpdGVcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XG5cdFwiT3RoZXJcIjpcblxuXHRcdCMgTm90ZWJvb2tzXG5cdFx0XCJhcHBsZS1tYWNib29rXCI6IFwiQXBwbGVNYWNCb29rXCJcblx0XHRcImFwcGxlLW1hY2Jvb2stYWlyXCI6IFwiQXBwbGVNYWNCb29rQWlyXCJcblx0XHRcImFwcGxlLW1hY2Jvb2stcHJvXCI6IFwiQXBwbGVNYWNCb29rUHJvXCJcblx0XHRcImRlbGwteHBzXCI6IFwiRGVsbFhQU1wiXG5cblx0XHQjIERlc2t0b3BzXG5cdFx0XCJhcHBsZS1pbWFjXCI6IFwiQXBwbGVJTWFjXCJcblxuXHRcdCMgVFZcblx0XHRcInNvbnktdzg1T2NcIjogXCJTb255Vzg1T0NcIlxuXG5cdFx0IyBGdWxsc2NyZWVuXG5cdFx0XCJmdWxsc2NyZWVuXCI6IHRydWVcblxuXG5cbiMgRXhjbHVkZSBkZXZpY2UgZ3JvdXAgZnJvbSBsaXN0XG5QaWNrZXIuZXhjbHVkZSA9IChncm91cCA9IFwiXCIpIC0+XG5cblx0Zm9yIGtleSwgdmFsdWUgb2YgUGlja2VyLl9kZXZpY2VMaXN0XG5cblx0XHRpZiBncm91cC50b0xvd2VyQ2FzZSgpIGlzIGtleS50b0xvd2VyQ2FzZSgpXG5cblx0XHRcdHZhbHVlLl9leGNsdWRlRnJvbUxpc3QgPSB0cnVlXG5cblx0UGlja2VyLmVuYWJsZSgpXG5cblxuXG4jIFJlaW5jbHVkZSBhbiBleGNsdWRlZCBkZXZpY2UgZ3JvdXAgaW4gbGlzdFxuUGlja2VyLmluY2x1ZGUgPSAoZ3JvdXAgPSBcIlwiKSAtPlxuXG5cdGZvciBrZXksIHZhbHVlIG9mIFBpY2tlci5fZGV2aWNlTGlzdFxuXG5cdFx0aWYgZ3JvdXAudG9Mb3dlckNhc2UoKSBpcyBrZXkudG9Mb3dlckNhc2UoKVxuXG5cdFx0XHRtYXRjaCA9IHZhbHVlLl9leGNsdWRlRnJvbUxpc3QgPSBmYWxzZVxuXG5cdFBpY2tlci5lbmFibGUoKVxuXG5cblxuIyBBZGQgZHJvcGRvd24gZm9yIHNlbGVjdGluZyBhIGRpZmZlcmVudCBkZXZpY2VcblBpY2tlci5lbmFibGUgPSAtPlxuXG5cdHJldHVybiBpZiBub3QgaXNEZXNrdG9wKClcblxuXHRpZiBub3QgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHQjIERJViB0byBjb250YWluIHRoZSBkZXZpY2UgY29udHJvbHNcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTBweDsgcmlnaHQ6IDEwcHg7IHotaW5kZXg6IDk5OTk7IHRleHQtYWxpZ246IHJpZ2h0XCJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIFBpY2tlci5fY29udHJvbERpdlxuXG5cdFx0IyBEZXZpY2UgbGlzdCBkcm9wZG93blxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic2VsZWN0XCJcblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLnNldEF0dHJpYnV0ZSBcInN0eWxlXCIsIFwiZGlzcGxheTogYmxvY2tcIlxuXHRcdFBpY2tlci5fY29udHJvbERpdi5hcHBlbmRDaGlsZCBQaWNrZXIuX2RldmljZVNlbGVjdG9yXG5cblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLm9uY2hhbmdlID0gLT5cblxuXHRcdFx0cmV0dXJuIGlmIEB2YWx1ZSBpcyBcIm5vbmVcIlxuXG5cdFx0XHR2YXJzID0gZ2V0VXJsVmFycyh3aW5kb3cubG9jYXRpb24uaHJlZilcblx0XHRcdHZhcnMuZGV2aWNlVHlwZSA9IEB2YWx1ZVxuXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIG1ha2VVcmxTdHJpbmcodmFycylcblxuXHRcdCMgRGV2aWNlIHJvdGF0aW9uIHRvZ2dsZVxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImJ1dHRvblwiXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUuc2V0QXR0cmlidXRlIFwidHlwZVwiLCBcImJ1dHRvblwiXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgY29sb3I6ICMzMzM7IHBhZGRpbmc6IDAuNWVtIDFlbTsgYm9yZGVyLXJhZGl1czogM3B4XCJcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5pbm5lckhUTUwgPSBcIlJvdGF0ZVwiXG5cdFx0UGlja2VyLl9jb250cm9sRGl2LmFwcGVuZENoaWxkIFBpY2tlci5fcm90YXRlVG9nZ2xlXG5cblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5vbmNsaWNrID0gLT5cblxuXHRcdFx0dmFycyA9IGdldFVybFZhcnMoKVxuXG5cdFx0XHRpZiAhdmFycy5vcmllbnRhdGlvbiBvciB2YXJzLm9yaWVudGF0aW9uIGlzIFwiMFwiXG5cdFx0XHRcdHZhcnMub3JpZW50YXRpb24gPSBcIjkwXCJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR2YXJzLm9yaWVudGF0aW9uID0gXCIwXCJcblxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBtYWtlVXJsU3RyaW5nKHZhcnMpXG5cblxuXHQjIENsZWFyIGRldmljZSBsaXN0IGJlZm9yZSBwb3B1bGF0aW5nIGluIGNhc2UgaXQgYWxyZWFkeSBleGlzdHNcblx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5pbm5lckhUTUwgPSBcIlwiXG5cblx0IyBMaXN0IGhlYWRlclxuXHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCJQaWNrIGRldmljZVwiKVxuXG5cdCMgR2VuZXJhdGUgbGlzdFxuXHRmb3IgZ3JvdXAsIGRldmljZXMgb2YgUGlja2VyLl9kZXZpY2VMaXN0IHdoZW4gZGV2aWNlcy5fZXhjbHVkZUZyb21MaXN0IGlzbnQgdHJ1ZVxuXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiIFwiKVxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIiMgXCIgKyBncm91cClcblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCIgXCIpXG5cblx0XHRmb3IgZGV2aWNlLCBiYXNlIG9mIGRldmljZXMgd2hlbiBkZXZpY2UgaXNudCBcIl9leGNsdWRlRnJvbUxpc3RcIlxuXHRcdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKGRldmljZSwgZGV2aWNlKVxuXG5cblxuIyBEc3Ryb3kgZHJvcGRvd24gaWYgaXQgZXhpc3RzXG5QaWNrZXIuZGlzYWJsZSA9IC0+XG5cblx0aWYgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkIFBpY2tlci5fY29udHJvbERpdlxuXG5cdFx0UGlja2VyLl9jb250cm9sRGl2ID0gbnVsbFxuXG5cblxuIyBCYXNlIG9iamVjdCB3aGljaCBBZGFwdCBwcm94aWVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG5iYXNlID0ge31cblxuXG5cblxuIyBUaGlzIGlzIHRoZSBldmFsdWF0b3IgZnVuY3Rpb24gdXNlZCBieSBBZGFwdC5jaGVjaygpIHRvIHNlZSB3aGljaCBicmVha3BvaW50XG4jIHRvIGFwcGx5LiBJZiBpdCBkb2Vzbid0IHJldHVybiBhIHN0cmluZywgQWRhcHQuY2hlY2soKSB3aWxsIHJldHVybiBcIm90aGVyXCIuXG4jXG4jIEFkYXB0LnNldEJyZWFrcG9pbnRzKCkgb3ZlcndyaXRlcyB0aGlzIHRvIHJldHVybiBhIGJyZWFrcG9pbnQgYmFzZWQgb25cbiMgU2NyZWVuLndpZHRoLlxuI1xuIyBZb3UgY2FuIG92ZXJ3cml0ZSBpdCB3aXRoIHlvdXIgb3duIGV2YWx1YXRvciBmdW5jdGlvbiB3aXRoIHlvdXIgb3duIGN1c3RvbVxuIyBjcml0ZXJpYSBpZiB5b3UgbGlrZS5cbiNcbmJhc2UuZXZhbHVhdG9yID0gLT5cblx0cmV0dXJuIG51bGxcblxuXG5cbiMgU2V0IGJyZWFrcG9pbnRzIGJhc2VkIG9uIG1heCBzY3JlZW4gd2lkdGg6XG4jXG4jIEFkYXB0LnNldEJyZWFrcG9pbnRzXG4jXHRzbWFsbDogNDAwXG4jXHRtZWRpdW06IDYwMFxuI1x0bGFyZ2U6IDEwMDBcbiNcbiMgWW91IGNhbiBub3cgc2F2ZSBhbnkgdmFyaWFibGUgeW91IHdhbnQgYXMgYSBzZXQgb2YgdmFsdWVzLCBvbmUgcGVyIGJyZWFrcG9pbnQ6XG4jXG4jIEFkYXB0LmNvbHVtbnMgPVxuI1x0c21hbGw6IDFcbiNcdG1lZGl1bTogMlxuI1x0bGFyZ2U6IDRcbiNcdG90aGVyOiA1XG4jXG4jIE5vdyB3aGVuIHlvdSB1c2UgQWRhcHQuY29sdW1ucyBpbiB5b3VyIHByb3RvdHlwZSwgaXQgd2lsbCBvbmx5IHJldHVybiB0aGVcbiMgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgc2NyZWVuIHdpZHRoOlxuI1xuIyBwcmludCBBZGFwdC5jb2x1bW5zXG4jXG4jIFRoaXMgcHJpbnRzIFwiMVwiIG9uIGFuIGlQaG9uZSA3LCBmb3IgZXhhbXBsZVxuIyBcbmJhc2Uuc2V0QnJlYWtwb2ludHMgPSAoYnJlYWtwb2ludHMgPSB7fSkgLT5cblx0XG5cdGJwQXJyYXkgPSBbXVxuXHRcblx0Zm9yIG5hbWUsIHZhbHVlIG9mIGJyZWFrcG9pbnRzXG5cdFxuXHRcdGJwQXJyYXkucHVzaFxuXHRcdFx0bmFtZTogbmFtZVxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFxuXHQjIFNvcnQgaW4gZGVzY2VuZGluZyBvcmRlclxuXHRicEFycmF5LnNvcnQgKGEsIGIpIC0+IGIudmFsdWUgLSBhLnZhbHVlXG5cdFxuXHQjIFdyaXRlIGEgZnVuY3Rpb24gZm9yIEFkYXB0LmV2YWx1YXRvcigpIHRoYXQgY2hlY2tzIGFnYWluc3QgU2NyZWVuLndpZHRoXG5cdGJhc2UuZXZhbHVhdG9yID0gLT5cblx0XHRcblx0XHRyZXN1bHQgPSBudWxsXG5cdFx0XG5cdFx0Zm9yIGJwIGluIGJwQXJyYXlcblx0XHRcblx0XHRcdGlmIFNjcmVlbi53aWR0aCA8PSBicC52YWx1ZVxuXHRcdFx0XHRyZXN1bHQgPSBicC5uYW1lXG5cdFx0XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHRcdFxuXG5cdFx0XG4jIFRoaXMgcmV0dXJucyB0aGUgY3VycmVudCBicmVha3BvaW50LCBvciBcIm90aGVyXCIgaWYgdGhlIGV2YWx1YXRvclxuIyBkb2Vzbid0IHJldHVybiBhIGJyZWFrcG9pbnQgbmFtZS5cbiNcbmJhc2UuY2hlY2sgPSAtPlxuXHRcblx0a2V5ID0gYmFzZS5ldmFsdWF0b3IoKVxuXHRcblx0aWYgbm90IGtleSBvciB0eXBlb2Yga2V5IGlzbnQgXCJzdHJpbmdcIlxuXHRcdGtleSA9IFwib3RoZXJcIlxuXHRcblx0cmV0dXJuIGtleVxuXG5cblxuIyBBZGQgZGV2aWNlIHBpY2tlclxuI1xuYmFzZS5waWNrZXIgPSBQaWNrZXJcblxuXG5cbiMgUHJvcGVydHkgdG8gaG9sZCBhbGwgdXNlciBkZWZpbmVkIHZhbHVlc1xuYmFzZS5fdmFsdWVzID0ge31cblxuXG5cbiMgSW5pdCBmdW5jdGlvblxuI1xuYmFzZS5pbml0ID0gLT5cblxuXHRpZiBpc0Rlc2t0b3AoKVxuXG5cdFx0dXJsVmFycyA9IGdldFVybFZhcnMoKVxuXG5cdFx0aWYgdXJsVmFycy5kZXZpY2VUeXBlP1xuXHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gdXJsVmFycy5kZXZpY2VUeXBlXG5cblx0XHRpZiB1cmxWYXJzLm9yaWVudGF0aW9uP1xuXHRcdFx0RnJhbWVyLkRldmljZS5vcmllbnRhdGlvbiA9IHBhcnNlSW50KHVybFZhcnMub3JpZW50YXRpb24pXG5cblxuXHRlbHNlXG5cblx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuXG5cblxuXG4jIENyZWF0ZSBBZGFwdCBwcm94eVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuIyBTdG9yZSBhbGwgZXhpc3RpbmcgcHJvcGVydHkga2V5cyBvZiBiYXNlIG9iamVjdCwgdG8gY2F0Y2ggdGhlbSBpbiB0aGUgc2V0dGVyLlxuIyBFeGNlcHQgdGhlIGV2YWx1YXRvciBmdW5jdGlvbiwgYXMgeW91IG1heSBvdmVyd3JpdGUgaXRcbiNcbnJlYWRPbmx5UHJvcGV0aWVzID0gW11cblxuZm9yIGtleSwgdmFsdWUgb2YgYmFzZSB3aGVuIGtleSBpc250IFwiZXZhbHVhdG9yXCJcblx0cmVhZE9ubHlQcm9wZXRpZXMucHVzaCBrZXlcblxuXG5cbiMgUHJveHkgaGFuZGxlciBvYmplY3RcblxuaGFuZGxlciA9XG5cdFxuXHRzZXQ6ICh0YXJnZXQsIHByb3AsIHZhbHVlKSAtPlxuXG5cdFx0IyBUaGUgZXZhbHVhdG9yIGlzIHRoZSBvbmx5IGV4aXN0aW5nIHByb3BlcnR5IHlvdSBjYW4gb3ZlcndyaXRlXG5cdFx0aWYgcHJvcCBpcyBcImV2YWx1YXRvclwiXG5cblx0XHRcdCMgLi4uYnV0IG9ubHkgd2l0aCBhbm90aGVyIGZ1bmN0aW9uXG5cdFx0XHRpZiBub3QgXy5pc0Z1bmN0aW9uKHZhbHVlKVxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkFkYXB0LmV2YWx1YXRvciBoYXMgdG8gYmUgYSBmdW5jdGlvblwiXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dGFyZ2V0W3Byb3BdID0gdmFsdWVcblxuXG5cdFx0IyBSZWFkLW9ubHkgcHJvcGVydGllc1xuXHRcdGVsc2UgaWYgcHJvcCBpbiByZWFkT25seVByb3BldGllc1xuXHRcdFx0Y29uc29sZS5sb2cgXCJDYW4ndCBvdmVyd3JpdGUgQWRhcHQuXCIgKyBwcm9wXG5cblx0XHRlbHNlXG5cblx0XHRcdHRhcmdldC5fdmFsdWVzW3Byb3BdID0gdmFsdWVcblxuXHRcblx0Z2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgLT5cblx0XHRcblx0XHRpZiB0YXJnZXQuX3ZhbHVlcz9bcHJvcF1cblxuXHRcdFx0cmV0dXJuIHRhcmdldC5fdmFsdWVzW3Byb3BdW3RhcmdldC5jaGVjaygpXSBvciB0YXJnZXQuX3ZhbHVlc1twcm9wXVxuXHRcdFxuXHRcdGVsc2Vcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHRhcmdldFtwcm9wXVxuXG5cblxuIyBDcmVhdGUgcHJveHlcbkFkYXB0ID0gbmV3IFByb3h5KGJhc2UsIGhhbmRsZXIpXG5cblxuXG4jIEluaXRpYWxpemVcbkFkYXB0LmluaXQoKVxuXG5cbmV4cG9ydHMuQWRhcHQgPSBBZGFwdCIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FESUEsSUFBQSw2R0FBQTtFQUFBOztBQUFBLFVBQUEsR0FBYSxTQUFBO0FBRVosTUFBQTtFQUFBLElBQUEsR0FBTztFQUVQLEtBQUEsR0FBUSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFyQixDQUE2Qix5QkFBN0IsRUFBd0QsU0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEtBQVQ7V0FDL0QsSUFBSyxDQUFBLEdBQUEsQ0FBTCxHQUFZO0VBRG1ELENBQXhEO0FBR1IsU0FBTztBQVBLOztBQVdiLGFBQUEsR0FBZ0IsU0FBQyxHQUFEO0FBRWYsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUVULE9BQUEsVUFBQTs7SUFDQyxNQUFBLElBQVUsR0FBQSxHQUFNLEdBQU4sR0FBWSxLQUFaLEdBQW9CO0FBRC9CO0VBR0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYixFQUFnQixDQUFDLENBQWpCO0FBRVQsU0FBTztBQVRROztBQWFoQixVQUFBLEdBQWEsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUVaLE1BQUE7O0lBRm9CLFFBQVE7O0VBRTVCLEdBQUEsR0FBTSxRQUFRLENBQUMsYUFB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
