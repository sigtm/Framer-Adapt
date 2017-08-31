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
    "sony-w85Oc": "SonyW85OC"
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
  if (window.FramerStudio || !isDesktop() || Framer.Device.deviceType === "fullscreen") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvRnJhbWVyLUFkYXB0L2FkYXB0LWV4YW1wbGUuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2lndXJkL1JlcG9zL01pbmUgLSBGcmFtZXIgbW9kdWxlcy9GcmFtZXItQWRhcHQvYWRhcHQtZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9BZGFwdC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIEhlbHBlcnNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBHZXQgdGhlIFVSTCB2YXJpYWJsZXMgYXMgYW4gb2JqZWN0XG5nZXRVcmxWYXJzID0gKCkgLT5cblxuXHR2YXJzID0ge31cblxuXHRwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UgL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgKG0sIGtleSwgdmFsdWUpIC0+XG5cdFx0dmFyc1trZXldID0gdmFsdWVcblxuXHRyZXR1cm4gdmFyc1xuXG5cbiMgTWFrZSBwYXJhbWV0ZXIgc3RyaW5nIGZyb20gb2JqZWN0XG5tYWtlVXJsU3RyaW5nID0gKG9iaikgLT5cblxuXHRzdHJpbmcgPSBcIj9cIlxuXG5cdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdHN0cmluZyArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCJcblxuXHRzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMCwgLTEpXG5cblx0cmV0dXJuIHN0cmluZ1xuXG5cbiMgTWFrZSBvcHRpb24gZWxlbWVudFxubWFrZU9wdGlvbiA9IChsYWJlbCwgdmFsdWUgPSBcIm5vbmVcIikgLT5cblxuXHRvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwib3B0aW9uXCJcblx0b3B0LnNldEF0dHJpYnV0ZSBcInZhbHVlXCIsIHZhbHVlXG5cdG9wdC5pbm5lckhUTUwgPSBsYWJlbFxuXG5cdHJldHVybiBvcHRcblxuXG4jIFNpbmNlIFV0aWxzLmlzRGVza3RvcCgpIGRvZXNuJ3Qgc2VlbSB0byBwaWNrIHVwIGV2ZXJ5dGhpbmcgKG5vdGFibHkgc29tZSBBbmRyb2lkIGRldmljZXMpXG5pc0Rlc2t0b3AgPSAtPlxuXG5cdGlmIC8odGFibGV0KXwoaVBhZCl8KE5leHVzIDkpfChtb2JpKXwoQW5kcm9pZCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0cmV0dXJuIHRydWVcblxuXG4jIERldmljZSBwaWNrZXJcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5QaWNrZXIgPSB7fVxuXG5cbiMgRXZlcnkgZGV2aWNlIGZyb20gRnJhbWVyJ3MgRGV2aWNlQ29tcG9uZW50LCB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgYmFzZSBjbGFzc1xuUGlja2VyLl9kZXZpY2VMaXN0ID1cblxuXHRcImlQYWRcIjpcblxuXHRcdCMgaVBhZCBBaXJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItc2lsdmVyXCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItZ29sZFwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLXNwYWNlLWdyYXlcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGFkIE1pbmlcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LXNpbHZlclwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtZ29sZFwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtc3BhY2UtZ3JheVwiOiBcImlQYWRNaW5pNEJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGFkIFByb1xuXHRcdFwiYXBwbGUtaXBhZC1wcm8tc2lsdmVyXCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1wcm8tZ29sZFwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtcHJvLXNwYWNlLWdyYXlcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cblx0XCJpUGhvbmVcIjpcblx0XHRcblx0XHQjIGlQaG9uZSA3XG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1nb2xkXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcm9zZS1nb2xkXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctc2lsdmVyXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctYmxhY2tcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1qZXQtYmxhY2tcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA3IFBsdXNcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXNpbHZlclwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtamV0LWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBob25lIDZzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtZ29sZFwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtc2lsdmVyXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA2cyBQbHVzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1nb2xkXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zaWx2ZXJcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtc3BhY2UtZ3JheVwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA1U1xuXHRcdFwiYXBwbGUtaXBob25lLTVzLWdvbGRcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtc2lsdmVyXCI6IFwiaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA1Q1xuXHRcdFwiYXBwbGUtaXBob25lLTVjLWJsdWVcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLWdyZWVuXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1yZWRcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLXdoaXRlXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy15ZWxsb3dcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXG5cdFwiQXBwbGUgV2F0Y2hcIjpcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIFNlcmllcyAyIDM4bW1cblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tYmxhY2stc3RlZWwtYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tZWRpdGlvblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tY29jb2FcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWNvbmNyZXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1yZWRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXR1cnF1b2lzZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0td2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXllbGxvd1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zdGVlbC13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBTZXJpZXMgMiA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLWVkaXRpb25cIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tZ29sZC1hbHVtaW51bS1jb2NvYVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tY29uY3JldGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWdyZWVuXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1saWdodC1waW5rXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1waW5rLXNhbmRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXJlZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tdHVycXVvaXNlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0teWVsbG93XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWJsYWNrLXN0ZWVsLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc3RlZWwtd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggTmlrZSsgMzhtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay1jb29sLWdyYXlcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCBOaWtlKyA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLWNvb2wtZ3JheVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIDM4bW1cblxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlXCJcblxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1ibGFjay1zdGVlbC1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLW1pZG5pZ2h0LWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWxhdmVuZGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZm9nLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWdyZWVuLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJlZC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS13YWxudXQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0td2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZ29sZC1hbnRpcXVlLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJvc2UtZ29sZC1zdG9uZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1zcGFjZS1ncmF5LWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLTQybW0tYmxhY2stc3RlZWwtYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWdvbGQtbWlkbmlnaHQtYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtbGF2ZW5kZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1mb2ctY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZ3JlZW4tY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcmVkLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1nb2xkLWFudGlxdWUtd2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcm9zZS1nb2xkLXN0b25lLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LXNwYWNlLWdyYXktYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblxuXHRcIkdvb2dsZVwiOlxuXHRcdFxuXHRcdCMgTkVYVVNcblx0XHRcImdvb2dsZS1uZXh1cy00XCI6IFwiTmV4dXM0QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtNXhcIjogXCJOZXh1czVCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy02cFwiOiBcIk5leHVzNkJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTlcIjogXCJOZXh1czlCYXNlRGV2aWNlXCJcblxuXHRcdCMgUGl4ZWxcblx0XHRcImdvb2dsZS1waXhlbC1xdWl0ZS1ibGFja1wiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtcGl4ZWwtcmVhbGx5LWJsdWVcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLXBpeGVsLXZlcnktc2lsdmVyXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XG5cdFwiTWlzYyBoYW5kaGVsZFwiOlxuXG5cdFx0IyBIVEMgT05FIEE5XG5cdFx0XCJodGMtb25lLWE5LWJsYWNrXCI6IFwiSFRDYTlCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtYTktd2hpdGVcIjogXCJIVENhOUJhc2VEZXZpY2VcIlxuXG5cdFx0IyBIVEMgT05FIE04XG5cdFx0XCJodGMtb25lLW04LWJsYWNrXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtbTgtZ29sZFwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLW04LXNpbHZlclwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cblx0XHQjIE1JQ1JPU09GVCBMVU1JQSA5NTBcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtYmxhY2tcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtd2hpdGVcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblxuXHRcdCMgU0FNU1VORyBOT1RFIDVcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1ibGFja1wiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LWdvbGRcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1waW5rXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtc2lsdmVyLXRpdGFuaXVtXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtd2hpdGVcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XG5cdFwiT3RoZXJcIjpcblxuXHRcdCMgTm90ZWJvb2tzXG5cdFx0XCJhcHBsZS1tYWNib29rXCI6IFwiQXBwbGVNYWNCb29rXCJcblx0XHRcImFwcGxlLW1hY2Jvb2stYWlyXCI6IFwiQXBwbGVNYWNCb29rQWlyXCJcblx0XHRcImFwcGxlLW1hY2Jvb2stcHJvXCI6IFwiQXBwbGVNYWNCb29rUHJvXCJcblx0XHRcImRlbGwteHBzXCI6IFwiRGVsbFhQU1wiXG5cblx0XHQjIERlc2t0b3BzXG5cdFx0XCJhcHBsZS1pbWFjXCI6IFwiQXBwbGVJTWFjXCJcblxuXHRcdCMgVFZcblx0XHRcInNvbnktdzg1T2NcIjogXCJTb255Vzg1T0NcIlxuXG5cdFx0IyBGdWxsc2NyZWVuXG5cdFx0IyBcImZ1bGxzY3JlZW5cIjogdHJ1ZVxuXG5cblxuIyBFeGNsdWRlIGRldmljZSBncm91cCBmcm9tIGxpc3RcblBpY2tlci5leGNsdWRlID0gKGdyb3VwID0gXCJcIikgLT5cblxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBQaWNrZXIuX2RldmljZUxpc3RcblxuXHRcdGlmIGdyb3VwLnRvTG93ZXJDYXNlKCkgaXMga2V5LnRvTG93ZXJDYXNlKClcblxuXHRcdFx0dmFsdWUuX2V4Y2x1ZGVGcm9tTGlzdCA9IHRydWVcblxuXHRQaWNrZXIuZW5hYmxlKClcblxuXG5cbiMgUmVpbmNsdWRlIGFuIGV4Y2x1ZGVkIGRldmljZSBncm91cCBpbiBsaXN0XG5QaWNrZXIuaW5jbHVkZSA9IChncm91cCA9IFwiXCIpIC0+XG5cblx0Zm9yIGtleSwgdmFsdWUgb2YgUGlja2VyLl9kZXZpY2VMaXN0XG5cblx0XHRpZiBncm91cC50b0xvd2VyQ2FzZSgpIGlzIGtleS50b0xvd2VyQ2FzZSgpXG5cblx0XHRcdG1hdGNoID0gdmFsdWUuX2V4Y2x1ZGVGcm9tTGlzdCA9IGZhbHNlXG5cblx0UGlja2VyLmVuYWJsZSgpXG5cblxuXG4jIEFkZCBkcm9wZG93biBmb3Igc2VsZWN0aW5nIGEgZGlmZmVyZW50IGRldmljZVxuUGlja2VyLmVuYWJsZSA9IC0+XG5cblx0cmV0dXJuIGlmIHdpbmRvdy5GcmFtZXJTdHVkaW8gb3Igbm90IGlzRGVza3RvcCgpIG9yIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImZ1bGxzY3JlZW5cIlxuXG5cdGlmIG5vdCBQaWNrZXIuX2NvbnRyb2xEaXZcblxuXHRcdCMgRElWIHRvIGNvbnRhaW4gdGhlIGRldmljZSBjb250cm9sc1xuXHRcdFBpY2tlci5fY29udHJvbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJkaXZcIlxuXHRcdFBpY2tlci5fY29udHJvbERpdi5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMHB4OyByaWdodDogMTBweDsgei1pbmRleDogOTk5OTsgdGV4dC1hbGlnbjogcmlnaHRcIlxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHQjIERldmljZSBsaXN0IGRyb3Bkb3duXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzZWxlY3RcIlxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3Iuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJkaXNwbGF5OiBibG9ja1wiXG5cdFx0UGlja2VyLl9jb250cm9sRGl2LmFwcGVuZENoaWxkIFBpY2tlci5fZGV2aWNlU2VsZWN0b3JcblxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3Iub25jaGFuZ2UgPSAtPlxuXG5cdFx0XHRyZXR1cm4gaWYgQHZhbHVlIGlzIFwibm9uZVwiXG5cblx0XHRcdHZhcnMgPSBnZXRVcmxWYXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuXHRcdFx0dmFycy5kZXZpY2VUeXBlID0gQHZhbHVlXG5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgbWFrZVVybFN0cmluZyh2YXJzKVxuXG5cdFx0IyBEZXZpY2Ugcm90YXRpb24gdG9nZ2xlXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYnV0dG9uXCJcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5zZXRBdHRyaWJ1dGUgXCJ0eXBlXCIsIFwiYnV0dG9uXCJcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZS5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBjb2xvcjogIzMzMzsgcGFkZGluZzogMC41ZW0gMWVtOyBib3JkZXItcmFkaXVzOiAzcHhcIlxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlLmlubmVySFRNTCA9IFwiUm90YXRlXCJcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYuYXBwZW5kQ2hpbGQgUGlja2VyLl9yb3RhdGVUb2dnbGVcblxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlLm9uY2xpY2sgPSAtPlxuXG5cdFx0XHR2YXJzID0gZ2V0VXJsVmFycygpXG5cblx0XHRcdGlmICF2YXJzLm9yaWVudGF0aW9uIG9yIHZhcnMub3JpZW50YXRpb24gaXMgXCIwXCJcblx0XHRcdFx0dmFycy5vcmllbnRhdGlvbiA9IFwiOTBcIlxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHZhcnMub3JpZW50YXRpb24gPSBcIjBcIlxuXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIG1ha2VVcmxTdHJpbmcodmFycylcblxuXG5cdCMgQ2xlYXIgZGV2aWNlIGxpc3QgYmVmb3JlIHBvcHVsYXRpbmcgaW4gY2FzZSBpdCBhbHJlYWR5IGV4aXN0c1xuXHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmlubmVySFRNTCA9IFwiXCJcblxuXHQjIExpc3QgaGVhZGVyXG5cdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIlBpY2sgZGV2aWNlXCIpXG5cblx0IyBHZW5lcmF0ZSBsaXN0XG5cdGZvciBncm91cCwgZGV2aWNlcyBvZiBQaWNrZXIuX2RldmljZUxpc3Qgd2hlbiBkZXZpY2VzLl9leGNsdWRlRnJvbUxpc3QgaXNudCB0cnVlXG5cblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCIgXCIpXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiIyBcIiArIGdyb3VwKVxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIiBcIilcblxuXHRcdGZvciBkZXZpY2UsIGJhc2Ugb2YgZGV2aWNlcyB3aGVuIGRldmljZSBpc250IFwiX2V4Y2x1ZGVGcm9tTGlzdFwiXG5cdFx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oZGV2aWNlLCBkZXZpY2UpXG5cblxuXG4jIERzdHJveSBkcm9wZG93biBpZiBpdCBleGlzdHNcblBpY2tlci5kaXNhYmxlID0gLT5cblxuXHRpZiBQaWNrZXIuX2NvbnRyb2xEaXZcblxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQgUGlja2VyLl9jb250cm9sRGl2XG5cblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYgPSBudWxsXG5cblxuXG4jIEJhc2Ugb2JqZWN0IHdoaWNoIEFkYXB0IHByb3hpZXNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbmJhc2UgPSB7fVxuXG5cblxuXG4jIFRoaXMgaXMgdGhlIGV2YWx1YXRvciBmdW5jdGlvbiB1c2VkIGJ5IEFkYXB0LmNoZWNrKCkgdG8gc2VlIHdoaWNoIGJyZWFrcG9pbnRcbiMgdG8gYXBwbHkuIElmIGl0IGRvZXNuJ3QgcmV0dXJuIGEgc3RyaW5nLCBBZGFwdC5jaGVjaygpIHdpbGwgcmV0dXJuIFwib3RoZXJcIi5cbiNcbiMgQWRhcHQuc2V0QnJlYWtwb2ludHMoKSBvdmVyd3JpdGVzIHRoaXMgdG8gcmV0dXJuIGEgYnJlYWtwb2ludCBiYXNlZCBvblxuIyBTY3JlZW4ud2lkdGguXG4jXG4jIFlvdSBjYW4gb3ZlcndyaXRlIGl0IHdpdGggeW91ciBvd24gZXZhbHVhdG9yIGZ1bmN0aW9uIHdpdGggeW91ciBvd24gY3VzdG9tXG4jIGNyaXRlcmlhIGlmIHlvdSBsaWtlLlxuI1xuYmFzZS5ldmFsdWF0b3IgPSAtPlxuXHRyZXR1cm4gbnVsbFxuXG5cblxuIyBTZXQgYnJlYWtwb2ludHMgYmFzZWQgb24gbWF4IHNjcmVlbiB3aWR0aDpcbiNcbiMgQWRhcHQuc2V0QnJlYWtwb2ludHNcbiNcdHNtYWxsOiA0MDBcbiNcdG1lZGl1bTogNjAwXG4jXHRsYXJnZTogMTAwMFxuI1xuIyBZb3UgY2FuIG5vdyBzYXZlIGFueSB2YXJpYWJsZSB5b3Ugd2FudCBhcyBhIHNldCBvZiB2YWx1ZXMsIG9uZSBwZXIgYnJlYWtwb2ludDpcbiNcbiMgQWRhcHQuY29sdW1ucyA9XG4jXHRzbWFsbDogMVxuI1x0bWVkaXVtOiAyXG4jXHRsYXJnZTogNFxuI1x0b3RoZXI6IDVcbiNcbiMgTm93IHdoZW4geW91IHVzZSBBZGFwdC5jb2x1bW5zIGluIHlvdXIgcHJvdG90eXBlLCBpdCB3aWxsIG9ubHkgcmV0dXJuIHRoZVxuIyBjb3JyZWN0IHZhbHVlIGJhc2VkIG9uIHRoZSBzY3JlZW4gd2lkdGg6XG4jXG4jIHByaW50IEFkYXB0LmNvbHVtbnNcbiNcbiMgVGhpcyBwcmludHMgXCIxXCIgb24gYW4gaVBob25lIDcsIGZvciBleGFtcGxlXG4jIFxuYmFzZS5zZXRCcmVha3BvaW50cyA9IChicmVha3BvaW50cyA9IHt9KSAtPlxuXHRcblx0YnBBcnJheSA9IFtdXG5cdFxuXHRmb3IgbmFtZSwgdmFsdWUgb2YgYnJlYWtwb2ludHNcblx0XG5cdFx0YnBBcnJheS5wdXNoXG5cdFx0XHRuYW1lOiBuYW1lXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XG5cdCMgU29ydCBpbiBkZXNjZW5kaW5nIG9yZGVyXG5cdGJwQXJyYXkuc29ydCAoYSwgYikgLT4gYi52YWx1ZSAtIGEudmFsdWVcblx0XG5cdCMgV3JpdGUgYSBmdW5jdGlvbiBmb3IgQWRhcHQuZXZhbHVhdG9yKCkgdGhhdCBjaGVja3MgYWdhaW5zdCBTY3JlZW4ud2lkdGhcblx0YmFzZS5ldmFsdWF0b3IgPSAtPlxuXHRcdFxuXHRcdHJlc3VsdCA9IG51bGxcblx0XHRcblx0XHRmb3IgYnAgaW4gYnBBcnJheVxuXHRcdFxuXHRcdFx0aWYgU2NyZWVuLndpZHRoIDw9IGJwLnZhbHVlXG5cdFx0XHRcdHJlc3VsdCA9IGJwLm5hbWVcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XG5cblx0XHRcbiMgVGhpcyByZXR1cm5zIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQsIG9yIFwib3RoZXJcIiBpZiB0aGUgZXZhbHVhdG9yXG4jIGRvZXNuJ3QgcmV0dXJuIGEgYnJlYWtwb2ludCBuYW1lLlxuI1xuYmFzZS5jaGVjayA9IC0+XG5cdFxuXHRrZXkgPSBiYXNlLmV2YWx1YXRvcigpXG5cdFxuXHRpZiBub3Qga2V5IG9yIHR5cGVvZiBrZXkgaXNudCBcInN0cmluZ1wiXG5cdFx0a2V5ID0gXCJvdGhlclwiXG5cdFxuXHRyZXR1cm4ga2V5XG5cblxuXG4jIEFkZCBkZXZpY2UgcGlja2VyXG4jXG5iYXNlLnBpY2tlciA9IFBpY2tlclxuXG5cblxuIyBQcm9wZXJ0eSB0byBob2xkIGFsbCB1c2VyIGRlZmluZWQgdmFsdWVzXG5iYXNlLl92YWx1ZXMgPSB7fVxuXG5cblxuIyBJbml0IGZ1bmN0aW9uXG4jXG5iYXNlLmluaXQgPSAtPlxuXG5cdGlmIGlzRGVza3RvcCgpXG5cblx0XHR1cmxWYXJzID0gZ2V0VXJsVmFycygpXG5cblx0XHRpZiB1cmxWYXJzLmRldmljZVR5cGU/XG5cdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSB1cmxWYXJzLmRldmljZVR5cGVcblxuXHRcdGlmIHVybFZhcnMub3JpZW50YXRpb24/XG5cdFx0XHRGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uID0gcGFyc2VJbnQodXJsVmFycy5vcmllbnRhdGlvbilcblxuXG5cdGVsc2VcblxuXHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG5cblxuXG5cbiMgQ3JlYXRlIEFkYXB0IHByb3h5XG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4jIFN0b3JlIGFsbCBleGlzdGluZyBwcm9wZXJ0eSBrZXlzIG9mIGJhc2Ugb2JqZWN0LCB0byBjYXRjaCB0aGVtIGluIHRoZSBzZXR0ZXIuXG4jIEV4Y2VwdCB0aGUgZXZhbHVhdG9yIGZ1bmN0aW9uLCBhcyB5b3UgbWF5IG92ZXJ3cml0ZSBpdFxuI1xucmVhZE9ubHlQcm9wZXRpZXMgPSBbXVxuXG5mb3Iga2V5LCB2YWx1ZSBvZiBiYXNlIHdoZW4ga2V5IGlzbnQgXCJldmFsdWF0b3JcIlxuXHRyZWFkT25seVByb3BldGllcy5wdXNoIGtleVxuXG5cblxuIyBQcm94eSBoYW5kbGVyIG9iamVjdFxuXG5oYW5kbGVyID1cblx0XG5cdHNldDogKHRhcmdldCwgcHJvcCwgdmFsdWUpIC0+XG5cblx0XHQjIFRoZSBldmFsdWF0b3IgaXMgdGhlIG9ubHkgZXhpc3RpbmcgcHJvcGVydHkgeW91IGNhbiBvdmVyd3JpdGVcblx0XHRpZiBwcm9wIGlzIFwiZXZhbHVhdG9yXCJcblxuXHRcdFx0IyAuLi5idXQgb25seSB3aXRoIGFub3RoZXIgZnVuY3Rpb25cblx0XHRcdGlmIG5vdCBfLmlzRnVuY3Rpb24odmFsdWUpXG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQWRhcHQuZXZhbHVhdG9yIGhhcyB0byBiZSBhIGZ1bmN0aW9uXCJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0YXJnZXRbcHJvcF0gPSB2YWx1ZVxuXG5cblx0XHQjIFJlYWQtb25seSBwcm9wZXJ0aWVzXG5cdFx0ZWxzZSBpZiBwcm9wIGluIHJlYWRPbmx5UHJvcGV0aWVzXG5cdFx0XHRjb25zb2xlLmxvZyBcIkNhbid0IG92ZXJ3cml0ZSBBZGFwdC5cIiArIHByb3BcblxuXHRcdGVsc2VcblxuXHRcdFx0dGFyZ2V0Ll92YWx1ZXNbcHJvcF0gPSB2YWx1ZVxuXG5cdFxuXHRnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSAtPlxuXHRcdFxuXHRcdGlmIHRhcmdldC5fdmFsdWVzP1twcm9wXVxuXG5cdFx0XHRyZXR1cm4gdGFyZ2V0Ll92YWx1ZXNbcHJvcF1bdGFyZ2V0LmNoZWNrKCldIG9yIHRhcmdldC5fdmFsdWVzW3Byb3BdXG5cdFx0XG5cdFx0ZWxzZVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gdGFyZ2V0W3Byb3BdXG5cblxuXG4jIENyZWF0ZSBwcm94eVxuQWRhcHQgPSBuZXcgUHJveHkoYmFzZSwgaGFuZGxlcilcblxuXG5cbiMgSW5pdGlhbGl6ZVxuQWRhcHQuaW5pdCgpXG5cblxuZXhwb3J0cy5BZGFwdCA9IEFkYXB0IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURJQSxJQUFBLDZHQUFBO0VBQUE7O0FBQUEsVUFBQSxHQUFhLFNBQUE7QUFFWixNQUFBO0VBQUEsSUFBQSxHQUFPO0VBRVAsS0FBQSxHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQXJCLENBQTZCLHlCQUE3QixFQUF3RCxTQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsS0FBVDtXQUMvRCxJQUFLLENBQUEsR0FBQSxDQUFMLEdBQVk7RUFEbUQsQ0FBeEQ7QUFHUixTQUFPO0FBUEs7O0FBV2IsYUFBQSxHQUFnQixTQUFDLEdBQUQ7QUFFZixNQUFBO0VBQUEsTUFBQSxHQUFTO0FBRVQsT0FBQSxVQUFBOztJQUNDLE1BQUEsSUFBVSxHQUFBLEdBQU0sR0FBTixHQUFZLEtBQVosR0FBb0I7QUFEL0I7RUFHQSxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakI7QUFFVCxTQUFPO0FBVFE7O0FBYWhCLFVBQUEsR0FBYSxT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
