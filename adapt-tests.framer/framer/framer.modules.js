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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvRnJhbWVyLUFkYXB0L2FkYXB0LXRlc3RzLmZyYW1lci9tb2R1bGVzL0FkYXB0LmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBIZWxwZXJzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgR2V0IHRoZSBVUkwgdmFyaWFibGVzIGFzIGFuIG9iamVjdFxuZ2V0VXJsVmFycyA9ICgpIC0+XG5cblx0dmFycyA9IHt9XG5cblx0cGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlIC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIChtLCBrZXksIHZhbHVlKSAtPlxuXHRcdHZhcnNba2V5XSA9IHZhbHVlXG5cblx0cmV0dXJuIHZhcnNcblxuXG4jIE1ha2UgcGFyYW1ldGVyIHN0cmluZyBmcm9tIG9iamVjdFxubWFrZVVybFN0cmluZyA9IChvYmopIC0+XG5cblx0c3RyaW5nID0gXCI/XCJcblxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblx0XHRzdHJpbmcgKz0ga2V5ICsgXCI9XCIgKyB2YWx1ZSArIFwiJlwiXG5cblx0c3RyaW5nID0gc3RyaW5nLnNsaWNlKDAsIC0xKVxuXG5cdHJldHVybiBzdHJpbmdcblxuXG4jIE1ha2Ugb3B0aW9uIGVsZW1lbnRcbm1ha2VPcHRpb24gPSAobGFiZWwsIHZhbHVlID0gXCJub25lXCIpIC0+XG5cblx0b3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcIm9wdGlvblwiXG5cdG9wdC5zZXRBdHRyaWJ1dGUgXCJ2YWx1ZVwiLCB2YWx1ZVxuXHRvcHQuaW5uZXJIVE1MID0gbGFiZWxcblxuXHRyZXR1cm4gb3B0XG5cblxuIyBTaW5jZSBVdGlscy5pc0Rlc2t0b3AoKSBkb2Vzbid0IHNlZW0gdG8gcGljayB1cCBldmVyeXRoaW5nIChub3RhYmx5IHNvbWUgQW5kcm9pZCBkZXZpY2VzKVxuaXNEZXNrdG9wID0gLT5cblxuXHRpZiAvKHRhYmxldCl8KGlQYWQpfChOZXh1cyA5KXwobW9iaSl8KEFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdHJldHVybiB0cnVlXG5cblxuIyBEZXZpY2UgcGlja2VyXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuUGlja2VyID0ge31cblxuXG4jIEV2ZXJ5IGRldmljZSBmcm9tIEZyYW1lcidzIERldmljZUNvbXBvbmVudCwgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIGJhc2UgY2xhc3NcblBpY2tlci5fZGV2aWNlTGlzdCA9XG5cblx0XCJpUGFkXCI6XG5cblx0XHQjIGlQYWQgQWlyXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLXNpbHZlclwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLWdvbGRcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1haXItMi1zcGFjZS1ncmF5XCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBhZCBNaW5pXG5cdFx0XCJhcHBsZS1pcGFkLW1pbmktNC1zaWx2ZXJcIjogXCJpUGFkTWluaTRCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LWdvbGRcIjogXCJpUGFkTWluaTRCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LXNwYWNlLWdyYXlcIjogXCJpUGFkTWluaTRCYXNlRGV2aWNlXCJcblxuXHRcdCMgaVBhZCBQcm9cblx0XHRcImFwcGxlLWlwYWQtcHJvLXNpbHZlclwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtcHJvLWdvbGRcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLXByby1zcGFjZS1ncmF5XCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXG5cdFwiaVBob25lXCI6XG5cdFx0XG5cdFx0IyBpUGhvbmUgN1xuXHRcdFwiYXBwbGUtaXBob25lLTctZ29sZFwiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXJvc2UtZ29sZFwiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXNpbHZlclwiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LWJsYWNrXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctamV0LWJsYWNrXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGhvbmUgNyBQbHVzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLWdvbGRcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1zaWx2ZXJcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1ibGFja1wiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLWpldC1ibGFja1wiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cblx0XHQjIGlQaG9uZSA2c1xuXHRcdFwiYXBwbGUtaXBob25lLTZzLWdvbGRcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcm9zZS1nb2xkXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXNpbHZlclwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1zcGFjZS1ncmF5XCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGhvbmUgNnMgUGx1c1xuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtZ29sZFwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtc2lsdmVyXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGhvbmUgNVNcblx0XHRcImFwcGxlLWlwaG9uZS01cy1nb2xkXCI6IFwiaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVzLXNpbHZlclwiOiBcImlQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01cy1zcGFjZS1ncmF5XCI6IFwiaVBob25lNUJhc2VEZXZpY2VcIlxuXG5cdFx0IyBpUGhvbmUgNUNcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1ibHVlXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1ncmVlblwiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMtcmVkXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy13aGl0ZVwiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMteWVsbG93XCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblxuXHRcIkFwcGxlIFdhdGNoXCI6XG5cdFx0XG5cdFx0IyBBcHBsZSBXYXRjaCBTZXJpZXMgMiAzOG1tXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLWJsYWNrLXN0ZWVsLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLWVkaXRpb25cIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tcm9zZS1nb2xkLWFsdW1pbnVtLW1pZG5pZ2h0LWJsdWVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWNvY29hXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1jb25jcmV0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tb2NlYW4tYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tcmVkXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS10dXJxdW9pc2VcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS15ZWxsb3dcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFja1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zcG9ydC1hbHVtaW51bS13YWxudXRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc3RlZWwtd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggU2VyaWVzIDIgNDJtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1lZGl0aW9uXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLWdvbGQtYWx1bWludW0tY29jb2FcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tcm9zZS1nb2xkLWFsdW1pbnVtLW1pZG5pZ2h0LWJsdWVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWNvbmNyZXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1ncmVlblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tbGlnaHQtcGlua1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tb2NlYW4tYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tcGluay1zYW5kXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1yZWRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXR1cnF1b2lzZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0td2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXllbGxvd1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zcGFjZS1ibGFjay1zdGVlbC1ibGFja1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXN0ZWVsLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cblx0XHQjIEFwcGxlIFdhdGNoIE5pa2UrIDM4bW1cblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stY29vbC1ncmF5XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblxuXHRcdCMgQXBwbGUgV2F0Y2ggTmlrZSsgNDJtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy00Mm1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay1jb29sLWdyYXlcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCAzOG1tXG5cblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOEJsYWNrTGVhdGhlckRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXJvc2UtZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOEJsYWNrTGVhdGhlckRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXN0YWlubGVzcy1zdGVlbC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOEJsYWNrTGVhdGhlckRldmljZVwiXG5cblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tYmxhY2stc3RlZWwtYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tZ29sZC1taWRuaWdodC1ibHVlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXJvc2UtZ29sZC1sYXZlbmRlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1ibHVlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWZvZy1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1ncmVlbi1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1yZWQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0td2FsbnV0LWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWdvbGQtYW50aXF1ZS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1yb3NlLWdvbGQtc3RvbmUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtc3BhY2UtZ3JheS1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXG5cdFx0IyBBcHBsZSBXYXRjaCA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWJsYWNrLXN0ZWVsLWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1nb2xkLW1pZG5pZ2h0LWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tcm9zZS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tcm9zZS1nb2xkLWxhdmVuZGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZm9nLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLWdyZWVuLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXJlZC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS13YWxudXQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0td2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZ29sZC1hbnRpcXVlLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXJvc2UtZ29sZC1zdG9uZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1zcGFjZS1ncmF5LWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXN0YWlubGVzcy1zdGVlbC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cblx0XCJHb29nbGVcIjpcblx0XHRcblx0XHQjIE5FWFVTXG5cdFx0XCJnb29nbGUtbmV4dXMtNFwiOiBcIk5leHVzNEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTV4XCI6IFwiTmV4dXM1QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtNnBcIjogXCJOZXh1czZCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy05XCI6IFwiTmV4dXM5QmFzZURldmljZVwiXG5cblx0XHQjIFBpeGVsXG5cdFx0XCJnb29nbGUtcGl4ZWwtcXVpdGUtYmxhY2tcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLXBpeGVsLXJlYWxseS1ibHVlXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1waXhlbC12ZXJ5LXNpbHZlclwiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFxuXHRcIk1pc2MgaGFuZGhlbGRcIjpcblxuXHRcdCMgSFRDIE9ORSBBOVxuXHRcdFwiaHRjLW9uZS1hOS1ibGFja1wiOiBcIkhUQ2E5QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLWE5LXdoaXRlXCI6IFwiSFRDYTlCYXNlRGV2aWNlXCJcblxuXHRcdCMgSFRDIE9ORSBNOFxuXHRcdFwiaHRjLW9uZS1tOC1ibGFja1wiOiBcIkhUQ204QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLW04LWdvbGRcIjogXCJIVENtOEJhc2VEZXZpY2VcIlxuXHRcdFwiaHRjLW9uZS1tOC1zaWx2ZXJcIjogXCJIVENtOEJhc2VEZXZpY2VcIlxuXG5cdFx0IyBNSUNST1NPRlQgTFVNSUEgOTUwXG5cdFx0XCJtaWNyb3NvZnQtbHVtaWEtOTUwLWJsYWNrXCI6IFwiTVNGVEx1bWlhOTUwQmFzZURldmljZVwiXG5cdFx0XCJtaWNyb3NvZnQtbHVtaWEtOTUwLXdoaXRlXCI6IFwiTVNGVEx1bWlhOTUwQmFzZURldmljZVwiXG5cblx0XHQjIFNBTVNVTkcgTk9URSA1XG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtYmxhY2tcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1nb2xkXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtcGlua1wiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LXNpbHZlci10aXRhbml1bVwiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LXdoaXRlXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFxuXHRcIk90aGVyXCI6XG5cblx0XHQjIE5vdGVib29rc1xuXHRcdFwiYXBwbGUtbWFjYm9va1wiOiBcIkFwcGxlTWFjQm9va1wiXG5cdFx0XCJhcHBsZS1tYWNib29rLWFpclwiOiBcIkFwcGxlTWFjQm9va0FpclwiXG5cdFx0XCJhcHBsZS1tYWNib29rLXByb1wiOiBcIkFwcGxlTWFjQm9va1Byb1wiXG5cdFx0XCJkZWxsLXhwc1wiOiBcIkRlbGxYUFNcIlxuXG5cdFx0IyBEZXNrdG9wc1xuXHRcdFwiYXBwbGUtaW1hY1wiOiBcIkFwcGxlSU1hY1wiXG5cblx0XHQjIFRWXG5cdFx0XCJzb255LXc4NU9jXCI6IFwiU29ueVc4NU9DXCJcblxuXHRcdCMgRnVsbHNjcmVlblxuXHRcdFwiZnVsbHNjcmVlblwiOiB0cnVlXG5cblxuXG4jIEV4Y2x1ZGUgZGV2aWNlIGdyb3VwIGZyb20gbGlzdFxuUGlja2VyLmV4Y2x1ZGUgPSAoZ3JvdXAgPSBcIlwiKSAtPlxuXG5cdGZvciBrZXksIHZhbHVlIG9mIFBpY2tlci5fZGV2aWNlTGlzdFxuXG5cdFx0aWYgZ3JvdXAudG9Mb3dlckNhc2UoKSBpcyBrZXkudG9Mb3dlckNhc2UoKVxuXG5cdFx0XHR2YWx1ZS5fZXhjbHVkZUZyb21MaXN0ID0gdHJ1ZVxuXG5cdFBpY2tlci5lbmFibGUoKVxuXG5cblxuIyBSZWluY2x1ZGUgYW4gZXhjbHVkZWQgZGV2aWNlIGdyb3VwIGluIGxpc3RcblBpY2tlci5pbmNsdWRlID0gKGdyb3VwID0gXCJcIikgLT5cblxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBQaWNrZXIuX2RldmljZUxpc3RcblxuXHRcdGlmIGdyb3VwLnRvTG93ZXJDYXNlKCkgaXMga2V5LnRvTG93ZXJDYXNlKClcblxuXHRcdFx0bWF0Y2ggPSB2YWx1ZS5fZXhjbHVkZUZyb21MaXN0ID0gZmFsc2VcblxuXHRQaWNrZXIuZW5hYmxlKClcblxuXG5cbiMgQWRkIGRyb3Bkb3duIGZvciBzZWxlY3RpbmcgYSBkaWZmZXJlbnQgZGV2aWNlXG5QaWNrZXIuZW5hYmxlID0gLT5cblxuXHRyZXR1cm4gaWYgbm90IGlzRGVza3RvcCgpXG5cblx0aWYgbm90IFBpY2tlci5fY29udHJvbERpdlxuXG5cdFx0IyBESVYgdG8gY29udGFpbiB0aGUgZGV2aWNlIGNvbnRyb2xzXG5cdFx0UGlja2VyLl9jb250cm9sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImRpdlwiXG5cdFx0UGlja2VyLl9jb250cm9sRGl2LnNldEF0dHJpYnV0ZSBcInN0eWxlXCIsIFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEwcHg7IHJpZ2h0OiAxMHB4OyB6LWluZGV4OiA5OTk5OyB0ZXh0LWFsaWduOiByaWdodFwiXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBQaWNrZXIuX2NvbnRyb2xEaXZcblxuXHRcdCMgRGV2aWNlIGxpc3QgZHJvcGRvd25cblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInNlbGVjdFwiXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcImRpc3BsYXk6IGJsb2NrXCJcblx0XHRQaWNrZXIuX2NvbnRyb2xEaXYuYXBwZW5kQ2hpbGQgUGlja2VyLl9kZXZpY2VTZWxlY3RvclxuXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5vbmNoYW5nZSA9IC0+XG5cblx0XHRcdHJldHVybiBpZiBAdmFsdWUgaXMgXCJub25lXCJcblxuXHRcdFx0dmFycyA9IGdldFVybFZhcnMod2luZG93LmxvY2F0aW9uLmhyZWYpXG5cdFx0XHR2YXJzLmRldmljZVR5cGUgPSBAdmFsdWVcblxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBtYWtlVXJsU3RyaW5nKHZhcnMpXG5cblx0XHQjIERldmljZSByb3RhdGlvbiB0b2dnbGVcblx0XHRQaWNrZXIuX3JvdGF0ZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJidXR0b25cIlxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlLnNldEF0dHJpYnV0ZSBcInR5cGVcIiwgXCJidXR0b25cIlxuXHRcdFBpY2tlci5fcm90YXRlVG9nZ2xlLnNldEF0dHJpYnV0ZSBcInN0eWxlXCIsIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGNvbG9yOiAjMzMzOyBwYWRkaW5nOiAwLjVlbSAxZW07IGJvcmRlci1yYWRpdXM6IDNweFwiXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUuaW5uZXJIVE1MID0gXCJSb3RhdGVcIlxuXHRcdFBpY2tlci5fY29udHJvbERpdi5hcHBlbmRDaGlsZCBQaWNrZXIuX3JvdGF0ZVRvZ2dsZVxuXG5cdFx0UGlja2VyLl9yb3RhdGVUb2dnbGUub25jbGljayA9IC0+XG5cblx0XHRcdHZhcnMgPSBnZXRVcmxWYXJzKClcblxuXHRcdFx0aWYgIXZhcnMub3JpZW50YXRpb24gb3IgdmFycy5vcmllbnRhdGlvbiBpcyBcIjBcIlxuXHRcdFx0XHR2YXJzLm9yaWVudGF0aW9uID0gXCI5MFwiXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dmFycy5vcmllbnRhdGlvbiA9IFwiMFwiXG5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgbWFrZVVybFN0cmluZyh2YXJzKVxuXG5cblx0IyBDbGVhciBkZXZpY2UgbGlzdCBiZWZvcmUgcG9wdWxhdGluZyBpbiBjYXNlIGl0IGFscmVhZHkgZXhpc3RzXG5cdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuaW5uZXJIVE1MID0gXCJcIlxuXG5cdCMgTGlzdCBoZWFkZXJcblx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiUGljayBkZXZpY2VcIilcblxuXHQjIEdlbmVyYXRlIGxpc3Rcblx0Zm9yIGdyb3VwLCBkZXZpY2VzIG9mIFBpY2tlci5fZGV2aWNlTGlzdCB3aGVuIGRldmljZXMuX2V4Y2x1ZGVGcm9tTGlzdCBpc250IHRydWVcblxuXHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIiBcIilcblx0XHRQaWNrZXIuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCIjIFwiICsgZ3JvdXApXG5cdFx0UGlja2VyLl9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiIFwiKVxuXG5cdFx0Zm9yIGRldmljZSwgYmFzZSBvZiBkZXZpY2VzIHdoZW4gZGV2aWNlIGlzbnQgXCJfZXhjbHVkZUZyb21MaXN0XCJcblx0XHRcdFBpY2tlci5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihkZXZpY2UsIGRldmljZSlcblxuXG5cbiMgRHN0cm95IGRyb3Bkb3duIGlmIGl0IGV4aXN0c1xuUGlja2VyLmRpc2FibGUgPSAtPlxuXG5cdGlmIFBpY2tlci5fY29udHJvbERpdlxuXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCBQaWNrZXIuX2NvbnRyb2xEaXZcblxuXHRcdFBpY2tlci5fY29udHJvbERpdiA9IG51bGxcblxuXG5cbiMgQmFzZSBvYmplY3Qgd2hpY2ggQWRhcHQgcHJveGllc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuYmFzZSA9IHt9XG5cblxuXG5cbiMgVGhpcyBpcyB0aGUgZXZhbHVhdG9yIGZ1bmN0aW9uIHVzZWQgYnkgQWRhcHQuY2hlY2soKSB0byBzZWUgd2hpY2ggYnJlYWtwb2ludFxuIyB0byBhcHBseS4gSWYgaXQgZG9lc24ndCByZXR1cm4gYSBzdHJpbmcsIEFkYXB0LmNoZWNrKCkgd2lsbCByZXR1cm4gXCJvdGhlclwiLlxuI1xuIyBBZGFwdC5zZXRCcmVha3BvaW50cygpIG92ZXJ3cml0ZXMgdGhpcyB0byByZXR1cm4gYSBicmVha3BvaW50IGJhc2VkIG9uXG4jIFNjcmVlbi53aWR0aC5cbiNcbiMgWW91IGNhbiBvdmVyd3JpdGUgaXQgd2l0aCB5b3VyIG93biBldmFsdWF0b3IgZnVuY3Rpb24gd2l0aCB5b3VyIG93biBjdXN0b21cbiMgY3JpdGVyaWEgaWYgeW91IGxpa2UuXG4jXG5iYXNlLmV2YWx1YXRvciA9IC0+XG5cdHJldHVybiBudWxsXG5cblxuXG4jIFNldCBicmVha3BvaW50cyBiYXNlZCBvbiBtYXggc2NyZWVuIHdpZHRoOlxuI1xuIyBBZGFwdC5zZXRCcmVha3BvaW50c1xuI1x0c21hbGw6IDQwMFxuI1x0bWVkaXVtOiA2MDBcbiNcdGxhcmdlOiAxMDAwXG4jXG4jIFlvdSBjYW4gbm93IHNhdmUgYW55IHZhcmlhYmxlIHlvdSB3YW50IGFzIGEgc2V0IG9mIHZhbHVlcywgb25lIHBlciBicmVha3BvaW50OlxuI1xuIyBBZGFwdC5jb2x1bW5zID1cbiNcdHNtYWxsOiAxXG4jXHRtZWRpdW06IDJcbiNcdGxhcmdlOiA0XG4jXHRvdGhlcjogNVxuI1xuIyBOb3cgd2hlbiB5b3UgdXNlIEFkYXB0LmNvbHVtbnMgaW4geW91ciBwcm90b3R5cGUsIGl0IHdpbGwgb25seSByZXR1cm4gdGhlXG4jIGNvcnJlY3QgdmFsdWUgYmFzZWQgb24gdGhlIHNjcmVlbiB3aWR0aDpcbiNcbiMgcHJpbnQgQWRhcHQuY29sdW1uc1xuI1xuIyBUaGlzIHByaW50cyBcIjFcIiBvbiBhbiBpUGhvbmUgNywgZm9yIGV4YW1wbGVcbiMgXG5iYXNlLnNldEJyZWFrcG9pbnRzID0gKGJyZWFrcG9pbnRzID0ge30pIC0+XG5cdFxuXHRicEFycmF5ID0gW11cblx0XG5cdGZvciBuYW1lLCB2YWx1ZSBvZiBicmVha3BvaW50c1xuXHRcblx0XHRicEFycmF5LnB1c2hcblx0XHRcdG5hbWU6IG5hbWVcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcblx0IyBTb3J0IGluIGRlc2NlbmRpbmcgb3JkZXJcblx0YnBBcnJheS5zb3J0IChhLCBiKSAtPiBiLnZhbHVlIC0gYS52YWx1ZVxuXHRcblx0IyBXcml0ZSBhIGZ1bmN0aW9uIGZvciBBZGFwdC5ldmFsdWF0b3IoKSB0aGF0IGNoZWNrcyBhZ2FpbnN0IFNjcmVlbi53aWR0aFxuXHRiYXNlLmV2YWx1YXRvciA9IC0+XG5cdFx0XG5cdFx0cmVzdWx0ID0gbnVsbFxuXHRcdFxuXHRcdGZvciBicCBpbiBicEFycmF5XG5cdFx0XG5cdFx0XHRpZiBTY3JlZW4ud2lkdGggPD0gYnAudmFsdWVcblx0XHRcdFx0cmVzdWx0ID0gYnAubmFtZVxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XHRcblxuXHRcdFxuIyBUaGlzIHJldHVybnMgdGhlIGN1cnJlbnQgYnJlYWtwb2ludCwgb3IgXCJvdGhlclwiIGlmIHRoZSBldmFsdWF0b3JcbiMgZG9lc24ndCByZXR1cm4gYSBicmVha3BvaW50IG5hbWUuXG4jXG5iYXNlLmNoZWNrID0gLT5cblx0XG5cdGtleSA9IGJhc2UuZXZhbHVhdG9yKClcblx0XG5cdGlmIG5vdCBrZXkgb3IgdHlwZW9mIGtleSBpc250IFwic3RyaW5nXCJcblx0XHRrZXkgPSBcIm90aGVyXCJcblx0XG5cdHJldHVybiBrZXlcblxuXG5cbiMgQWRkIGRldmljZSBwaWNrZXJcbiNcbmJhc2UucGlja2VyID0gUGlja2VyXG5cblxuXG4jIFByb3BlcnR5IHRvIGhvbGQgYWxsIHVzZXIgZGVmaW5lZCB2YWx1ZXNcbmJhc2UuX3ZhbHVlcyA9IHt9XG5cblxuXG4jIEluaXQgZnVuY3Rpb25cbiNcbmJhc2UuaW5pdCA9IC0+XG5cblx0aWYgaXNEZXNrdG9wKClcblxuXHRcdHVybFZhcnMgPSBnZXRVcmxWYXJzKClcblxuXHRcdGlmIHVybFZhcnMuZGV2aWNlVHlwZT9cblx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IHVybFZhcnMuZGV2aWNlVHlwZVxuXG5cdFx0aWYgdXJsVmFycy5vcmllbnRhdGlvbj9cblx0XHRcdEZyYW1lci5EZXZpY2Uub3JpZW50YXRpb24gPSBwYXJzZUludCh1cmxWYXJzLm9yaWVudGF0aW9uKVxuXG5cblx0ZWxzZVxuXG5cdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcblxuXG5cblxuIyBDcmVhdGUgQWRhcHQgcHJveHlcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiMgU3RvcmUgYWxsIGV4aXN0aW5nIHByb3BlcnR5IGtleXMgb2YgYmFzZSBvYmplY3QsIHRvIGNhdGNoIHRoZW0gaW4gdGhlIHNldHRlci5cbiMgRXhjZXB0IHRoZSBldmFsdWF0b3IgZnVuY3Rpb24sIGFzIHlvdSBtYXkgb3ZlcndyaXRlIGl0XG4jXG5yZWFkT25seVByb3BldGllcyA9IFtdXG5cbmZvciBrZXksIHZhbHVlIG9mIGJhc2Ugd2hlbiBrZXkgaXNudCBcImV2YWx1YXRvclwiXG5cdHJlYWRPbmx5UHJvcGV0aWVzLnB1c2gga2V5XG5cblxuXG4jIFByb3h5IGhhbmRsZXIgb2JqZWN0XG5cbmhhbmRsZXIgPVxuXHRcblx0c2V0OiAodGFyZ2V0LCBwcm9wLCB2YWx1ZSkgLT5cblxuXHRcdCMgVGhlIGV2YWx1YXRvciBpcyB0aGUgb25seSBleGlzdGluZyBwcm9wZXJ0eSB5b3UgY2FuIG92ZXJ3cml0ZVxuXHRcdGlmIHByb3AgaXMgXCJldmFsdWF0b3JcIlxuXG5cdFx0XHQjIC4uLmJ1dCBvbmx5IHdpdGggYW5vdGhlciBmdW5jdGlvblxuXHRcdFx0aWYgbm90IF8uaXNGdW5jdGlvbih2YWx1ZSlcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJBZGFwdC5ldmFsdWF0b3IgaGFzIHRvIGJlIGEgZnVuY3Rpb25cIlxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRhcmdldFtwcm9wXSA9IHZhbHVlXG5cblxuXHRcdCMgUmVhZC1vbmx5IHByb3BlcnRpZXNcblx0XHRlbHNlIGlmIHByb3AgaW4gcmVhZE9ubHlQcm9wZXRpZXNcblx0XHRcdGNvbnNvbGUubG9nIFwiQ2FuJ3Qgb3ZlcndyaXRlIEFkYXB0LlwiICsgcHJvcFxuXG5cdFx0ZWxzZVxuXG5cdFx0XHR0YXJnZXQuX3ZhbHVlc1twcm9wXSA9IHZhbHVlXG5cblx0XG5cdGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIC0+XG5cdFx0XG5cdFx0aWYgdGFyZ2V0Ll92YWx1ZXM/W3Byb3BdXG5cblx0XHRcdHJldHVybiB0YXJnZXQuX3ZhbHVlc1twcm9wXVt0YXJnZXQuY2hlY2soKV0gb3IgdGFyZ2V0Ll92YWx1ZXNbcHJvcF1cblx0XHRcblx0XHRlbHNlXG5cdFx0XHRcblx0XHRcdHJldHVybiB0YXJnZXRbcHJvcF1cblxuXG5cbiMgQ3JlYXRlIHByb3h5XG5BZGFwdCA9IG5ldyBQcm94eShiYXNlLCBoYW5kbGVyKVxuXG5cblxuIyBJbml0aWFsaXplXG5BZGFwdC5pbml0KClcblxuXG5leHBvcnRzLkFkYXB0ID0gQWRhcHQiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRElBLElBQUEsNkdBQUE7RUFBQTs7QUFBQSxV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
