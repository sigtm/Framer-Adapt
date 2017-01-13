require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Adapt":[function(require,module,exports){
var Adapt, flattenObject, getUrlVars, makeOption, makeUrlString;

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

flattenObject = function(obj) {
  var flat, key, subkey, subvalue, value;
  flat = {};
  for (key in obj) {
    value = obj[key];
    if (_.isPlainObject(value)) {
      for (subkey in value) {
        subvalue = value[subkey];
        flat[subkey] = subvalue;
      }
    } else {
      flat[key] = value;
    }
  }
  return flat;
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

Adapt = {};

Adapt.dpr = null;

Adapt.width = null;

Adapt.height = null;

Adapt._deviceList = {
  "Apple - iPad": {
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
  "Apple - iPhone": {
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
  "Apple - Watch": {
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
  "Other - Handheld": {
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
  "Other - Desktop & TV": {
    "apple-macbook": "AppleMacBook",
    "apple-macbook-air": "AppleMacBookAir",
    "apple-macbook-pro": "AppleMacBookPro",
    "dell-xps": "DellXPS",
    "apple-imac": "AppleIMac",
    "sony-w85Oc": "SonyW85OC"
  }
};

Adapt._dprList = {
  AppleIMac: 1,
  AppleMacBook: 2,
  AppleMacBookPro: 2,
  AppleMacBookAir: 1,
  AppleWatch38BlackLeatherDevice: 2,
  AppleWatch38Device: 2,
  AppleWatch42Device: 2,
  AppleWatchSeries238Device: 2,
  AppleWatchSeries242Device: 2,
  DellXPS: 3,
  HTCa9BaseDevice: 3,
  HTCm8BaseDevice: 3,
  MSFTLumia950BaseDevice: 3.5,
  Nexus4BaseDevice: 2,
  Nexus5BaseDevice: 1080 / 411,
  Nexus6BaseDevice: 1440 / 411,
  Nexus9BaseDevice: 2,
  PixelBaseDevice: 1080 / 411,
  SamsungGalaxyNote5BaseDevice: 3,
  SonyW85OC: 1,
  iPadAir2BaseDevice: 2,
  iPadMini4BaseDevice: 2,
  iPadProBaseDevice: 2,
  iPhone5BaseDevice: 2,
  iPhone5CBaseDevice: 2,
  iPhone6BaseDevice: 2,
  iPhone6PlusBaseDevice: 3,
  iPhone7BaseDevice: 2,
  iPhone7PlusBaseDevice: 3
};

Adapt._getFlatDeviceList = function() {
  var flat;
  flat = flattenObject(Adapt._deviceList);
  delete flat._excludeFromList;
  return flat;
};

Adapt._getDpr = function() {
  var base, deviceList, dprList, dt;
  deviceList = Adapt._getFlatDeviceList();
  dprList = Adapt._dprList;
  if (Utils.isDesktop()) {
    dt = Framer.Device.deviceType;
    if (deviceList[dt]) {
      base = deviceList[dt].replace(/Hand$/g, "");
      if (dprList[base]) {
        return dprList[base];
      } else {
        console.log("Adapt: No dpr specified for base device");
        return 1;
      }
    } else {
      console.log("Adapt: deviceType not in deviceList");
      return 1;
    }
  } else {
    return window.devicePixelRatio;
  }
};

Adapt.exclude = function(group) {
  if (Adapt._deviceList[group]) {
    Adapt._deviceList[group]._excludeFromList = true;
    return Adapt.addDeviceSelector();
  } else {
    return console.log("Adapt: Can't exclude '" + group + "', no group by that name");
  }
};

Adapt.unexclude = function(group) {
  if (Adapt._deviceList[group]) {
    Adapt._deviceList[group]._excludeFromList = false;
    return Adapt.addDeviceSelector();
  } else {
    return console.log("Adapt: Can't unexclude '" + group + "', no group by that name");
  }
};

Adapt.addDeviceSelector = function() {
  var base, device, devices, group, ref, results;
  if (!Utils.isDesktop()) {
    return;
  }
  if (!Adapt._controlDiv) {
    Adapt._controlDiv = document.createElement("div");
    Adapt._controlDiv.setAttribute("style", "position: absolute; top: 10px; right: 10px; z-index: 9999; text-align: right");
    document.body.appendChild(Adapt._controlDiv);
    Adapt._deviceSelector = document.createElement("select");
    Adapt._deviceSelector.setAttribute("style", "display: block");
    Adapt._controlDiv.appendChild(Adapt._deviceSelector);
    Adapt._deviceSelector.onchange = function() {
      var vars;
      if (this.value === "none") {
        return;
      }
      vars = getUrlVars(window.location.href);
      vars.deviceType = this.value;
      return window.location.href = window.location.href.split("?")[0] + makeUrlString(vars);
    };
    Adapt._rotateToggle = document.createElement("button");
    Adapt._rotateToggle.setAttribute("type", "button");
    Adapt._rotateToggle.setAttribute("style", "background-color: white; color: #333; padding: 0.5em 1em; border-radius: 3px");
    Adapt._rotateToggle.innerHTML = "Rotate";
    Adapt._controlDiv.appendChild(Adapt._rotateToggle);
    Adapt._rotateToggle.onclick = function() {
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
  Adapt._deviceSelector.innerHTML = "";
  Adapt._deviceSelector.appendChild(makeOption("Pick device"));
  ref = Adapt._deviceList;
  results = [];
  for (group in ref) {
    devices = ref[group];
    if (!(devices._excludeFromList !== true)) {
      continue;
    }
    Adapt._deviceSelector.appendChild(makeOption("------------------------"));
    Adapt._deviceSelector.appendChild(makeOption(group));
    Adapt._deviceSelector.appendChild(makeOption("------------------------"));
    results.push((function() {
      var results1;
      results1 = [];
      for (device in devices) {
        base = devices[device];
        if (device !== "_excludeFromList") {
          results1.push(Adapt._deviceSelector.appendChild(makeOption(device, device)));
        }
      }
      return results1;
    })());
  }
  return results;
};

Adapt.init = function() {
  var urlVars;
  if (Utils.isDesktop()) {
    Adapt.addDeviceSelector();
    urlVars = getUrlVars();
    if (urlVars.deviceType != null) {
      Framer.Device.deviceType = urlVars.deviceType;
    }
    if (urlVars.orientation != null) {
      Framer.Device.orientation = parseInt(urlVars.orientation);
    }
  } else {
    Framer.Device.deviceType = "fullscreen";
  }
  Adapt.dpr = Adapt._getDpr();
  Adapt.width = Screen.width / Adapt.dpr;
  Adapt.height = Screen.height / Adapt.dpr;
  return window.dp != null ? window.dp : window.dp = Adapt.dp;
};

Adapt.dp = function(value) {
  return value * Adapt.dpr;
};

Adapt.init();

exports.Adapt = Adapt;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvQWRhcHQvZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaWd1cmQvUmVwb3MvTWluZSAtIEZyYW1lciBtb2R1bGVzL0FkYXB0L2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvQWRhcHQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyBIZWxwZXJzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgR2V0IHRoZSBVUkwgdmFyaWFibGVzIGFzIGFuIG9iamVjdFxuZ2V0VXJsVmFycyA9ICgpIC0+XG5cblx0dmFycyA9IHt9XG5cblx0cGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlIC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIChtLCBrZXksIHZhbHVlKSAtPlxuXHRcdHZhcnNba2V5XSA9IHZhbHVlXG5cblx0cmV0dXJuIHZhcnNcblxuXG4jIEdldCB0aGUgVVJMIHZhcmlhYmxlcyBhcyBhbiBvYmplY3Rcbm1ha2VVcmxTdHJpbmcgPSAob2JqKSAtPlxuXG5cdHN0cmluZyA9IFwiP1wiXG5cblx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0c3RyaW5nICs9IGtleSArIFwiPVwiICsgdmFsdWUgKyBcIiZcIlxuXG5cdHN0cmluZyA9IHN0cmluZy5zbGljZSgwLCAtMSlcblxuXHRyZXR1cm4gc3RyaW5nXG5cbiMgRmxhdHRlbiBvYmplY3QgKHJldHVybnMgY2xvbmUpXG5mbGF0dGVuT2JqZWN0ID0gKG9iaikgLT5cblxuXHRmbGF0ID0ge31cblxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblxuXHRcdGlmIF8uaXNQbGFpbk9iamVjdCh2YWx1ZSlcblxuXHRcdFx0Zm9yIHN1YmtleSwgc3VidmFsdWUgb2YgdmFsdWVcblxuXHRcdFx0XHRmbGF0W3N1YmtleV0gPSBzdWJ2YWx1ZVxuXG5cdFx0ZWxzZVxuXG5cdFx0XHRmbGF0W2tleV0gPSB2YWx1ZVxuXG5cdHJldHVybiBmbGF0XG5cbiMgTWFrZSBvcHRpb24gZWxlbWVudFxubWFrZU9wdGlvbiA9IChsYWJlbCwgdmFsdWUgPSBcIm5vbmVcIikgLT5cblxuXHRvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwib3B0aW9uXCJcblx0b3B0LnNldEF0dHJpYnV0ZSBcInZhbHVlXCIsIHZhbHVlXG5cdG9wdC5pbm5lckhUTUwgPSBsYWJlbFxuXG5cdHJldHVybiBvcHRcblxuXG5cbiMgQWRhcHRcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5BZGFwdCA9IHt9XG5BZGFwdC5kcHIgPSBudWxsXG5BZGFwdC53aWR0aCA9IG51bGxcbkFkYXB0LmhlaWdodCA9IG51bGxcblxuXG4jIEV2ZXJ5IGRldmljZSBmcm9tIEZyYW1lcidzIERldmljZUNvbXBvbmVudCwgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIGJhc2UgY2xhc3NcbkFkYXB0Ll9kZXZpY2VMaXN0ID1cblx0XG5cdFwiQXBwbGUgLSBpUGFkXCI6XG5cblx0XHQjIGlQYWQgQWlyXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLXNpbHZlclwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLWdvbGRcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1haXItMi1zcGFjZS1ncmF5XCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIGlQYWQgTWluaVxuXHRcdFwiYXBwbGUtaXBhZC1taW5pLTQtc2lsdmVyXCI6IFwiaVBhZE1pbmk0QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLW1pbmktNC1nb2xkXCI6IFwiaVBhZE1pbmk0QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLW1pbmktNC1zcGFjZS1ncmF5XCI6IFwiaVBhZE1pbmk0QmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBpUGFkIFByb1xuXHRcdFwiYXBwbGUtaXBhZC1wcm8tc2lsdmVyXCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1wcm8tZ29sZFwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtcHJvLXNwYWNlLWdyYXlcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cblx0XCJBcHBsZSAtIGlQaG9uZVwiOlxuXHRcdFxuXHRcdCMgaVBob25lIDdcblx0XHRcImFwcGxlLWlwaG9uZS03LWdvbGRcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1yb3NlLWdvbGRcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1zaWx2ZXJcIjogXCJpUGhvbmU3QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1ibGFja1wiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LWpldC1ibGFja1wiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIGlQaG9uZSA3IFBsdXNcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXJvc2UtZ29sZFwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLXNpbHZlclwiOiBcImlQaG9uZTdQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNy1wbHVzLWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtamV0LWJsYWNrXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIGlQaG9uZSA2c1xuXHRcdFwiYXBwbGUtaXBob25lLTZzLWdvbGRcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcm9zZS1nb2xkXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXNpbHZlclwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1zcGFjZS1ncmF5XCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFxuXHRcdCMgaVBob25lIDZzIFBsdXNcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLWdvbGRcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtcm9zZS1nb2xkXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXNpbHZlclwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zcGFjZS1ncmF5XCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIGlQaG9uZSA1U1xuXHRcdFwiYXBwbGUtaXBob25lLTVzLWdvbGRcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtc2lsdmVyXCI6IFwiaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBpUGhvbmUgNUNcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1ibHVlXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1ncmVlblwiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMtcmVkXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy13aGl0ZVwiOiBcImlQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNWMteWVsbG93XCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblxuXHRcIkFwcGxlIC0gV2F0Y2hcIjpcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIFNlcmllcyAyIDM4bW1cblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tYmxhY2stc3RlZWwtYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tZWRpdGlvblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tY29jb2FcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWNvbmNyZXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1yZWRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXR1cnF1b2lzZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0td2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXllbGxvd1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zdGVlbC13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFxuXHRcdCMgQXBwbGUgV2F0Y2ggU2VyaWVzIDIgNDJtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1lZGl0aW9uXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLWdvbGQtYWx1bWludW0tY29jb2FcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tcm9zZS1nb2xkLWFsdW1pbnVtLW1pZG5pZ2h0LWJsdWVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWNvbmNyZXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1ncmVlblwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tbGlnaHQtcGlua1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tb2NlYW4tYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tcGluay1zYW5kXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1yZWRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXR1cnF1b2lzZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0td2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXllbGxvd1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zcGFjZS1ibGFjay1zdGVlbC1ibGFja1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXN0ZWVsLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XG5cdFx0IyBBcHBsZSBXYXRjaCBOaWtlKyAzOG1tXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLWNvb2wtZ3JheVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTM4bW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XG5cdFx0IyBBcHBsZSBXYXRjaCBOaWtlKyA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItdm9sdFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc2lsdmVyLWFsdW1pbnVtLWZsYXQtc2lsdmVyLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLWNvb2wtZ3JheVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtbmlrZS1wbHVzLTQybW0tc3BhY2UtZ3JheS1hbHVtaW51bS1ibGFjay12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XG5cdFx0IyBBcHBsZSBXYXRjaCAzOG1tXG5cdFx0XG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1yb3NlLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zdGFpbmxlc3Mtc3RlZWwtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2VcIlxuXHRcdFxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1ibGFjay1zdGVlbC1ibGFjay1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1nb2xkLW1pZG5pZ2h0LWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tcm9zZS1nb2xkLWxhdmVuZGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZm9nLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLWdyZWVuLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJlZC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS13YWxudXQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0td2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZ29sZC1hbnRpcXVlLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXJvc2UtZ29sZC1zdG9uZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1zcGFjZS1ncmF5LWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XG5cdFx0IyBBcHBsZSBXYXRjaCA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWJsYWNrLXN0ZWVsLWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1nb2xkLW1pZG5pZ2h0LWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tcm9zZS1nb2xkLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tcm9zZS1nb2xkLWxhdmVuZGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLWJsdWUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZm9nLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLWdyZWVuLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXJlZC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS13YWxudXQtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0td2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZ29sZC1hbnRpcXVlLXdoaXRlLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXJvc2UtZ29sZC1zdG9uZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1zcGFjZS1ncmF5LWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXN0YWlubGVzcy1zdGVlbC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cblx0XCJHb29nbGVcIjpcblx0XHRcblx0XHQjIE5FWFVTXG5cdFx0XCJnb29nbGUtbmV4dXMtNFwiOiBcIk5leHVzNEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTV4XCI6IFwiTmV4dXM1QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtNnBcIjogXCJOZXh1czZCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy05XCI6IFwiTmV4dXM5QmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBQaXhlbFxuXHRcdFwiZ29vZ2xlLXBpeGVsLXF1aXRlLWJsYWNrXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1waXhlbC1yZWFsbHktYmx1ZVwiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtcGl4ZWwtdmVyeS1zaWx2ZXJcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcblx0XCJPdGhlciAtIEhhbmRoZWxkXCI6XG5cblx0XHQjIEhUQyBPTkUgQTlcblx0XHRcImh0Yy1vbmUtYTktYmxhY2tcIjogXCJIVENhOUJhc2VEZXZpY2VcIlxuXHRcdFwiaHRjLW9uZS1hOS13aGl0ZVwiOiBcIkhUQ2E5QmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBIVEMgT05FIE04XG5cdFx0XCJodGMtb25lLW04LWJsYWNrXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtbTgtZ29sZFwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLW04LXNpbHZlclwiOiBcIkhUQ204QmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBNSUNST1NPRlQgTFVNSUEgOTUwXG5cdFx0XCJtaWNyb3NvZnQtbHVtaWEtOTUwLWJsYWNrXCI6IFwiTVNGVEx1bWlhOTUwQmFzZURldmljZVwiXG5cdFx0XCJtaWNyb3NvZnQtbHVtaWEtOTUwLXdoaXRlXCI6IFwiTVNGVEx1bWlhOTUwQmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBTQU1TVU5HIE5PVEUgNVxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LWJsYWNrXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtZ29sZFwiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LXBpbmtcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1zaWx2ZXItdGl0YW5pdW1cIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS13aGl0ZVwiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcblx0XCJPdGhlciAtIERlc2t0b3AgJiBUVlwiOlxuXG5cdFx0IyBOb3RlYm9va3Ncblx0XHRcImFwcGxlLW1hY2Jvb2tcIjogXCJBcHBsZU1hY0Jvb2tcIlxuXHRcdFwiYXBwbGUtbWFjYm9vay1haXJcIjogXCJBcHBsZU1hY0Jvb2tBaXJcIlxuXHRcdFwiYXBwbGUtbWFjYm9vay1wcm9cIjogXCJBcHBsZU1hY0Jvb2tQcm9cIlxuXHRcdFwiZGVsbC14cHNcIjogXCJEZWxsWFBTXCJcblx0XHRcblx0XHQjIERlc2t0b3BzXG5cdFx0XCJhcHBsZS1pbWFjXCI6IFwiQXBwbGVJTWFjXCJcblx0XHRcblx0XHQjIFRWXG5cdFx0XCJzb255LXc4NU9jXCI6IFwiU29ueVc4NU9DXCJcblx0XHRcblx0XHQjIE9MRCBERVZJQ0VTXG5cblx0XHQjICMgaVBob25lIDZcblx0XHQjIFwiaXBob25lLTYtc3BhY2VncmF5XCI6IFwib2xkX2lQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTYtc3BhY2VncmF5LWhhbmRcIjogXCJvbGRfaVBob25lNkJhc2VEZXZpY2VIYW5kXCJcblx0XHQjIFwiaXBob25lLTYtc2lsdmVyXCI6IFwib2xkX2lQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTYtc2lsdmVyLWhhbmRcIjogXCJvbGRfaVBob25lNkJhc2VEZXZpY2VIYW5kXCJcblx0XHQjIFwiaXBob25lLTYtZ29sZFwiOiBcIm9sZF9pUGhvbmU2QmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS02LWdvbGQtaGFuZFwiOiBcIm9sZF9pUGhvbmU2QmFzZURldmljZUhhbmRcIlxuXHRcdFxuXHRcdCMgIyBpUGhvbmUgNitcblx0XHQjIFwiaXBob25lLTZwbHVzLXNwYWNlZ3JheVwiOiBcIm9sZF9pUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNnBsdXMtc3BhY2VncmF5LWhhbmRcIjogXCJvbGRfaVBob25lNlBsdXNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS02cGx1cy1zaWx2ZXJcIjogXCJvbGRfaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTZwbHVzLXNpbHZlci1oYW5kXCI6IFwib2xkX2lQaG9uZTZQbHVzQmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNnBsdXMtZ29sZFwiOiBcIm9sZF9pUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNnBsdXMtZ29sZC1oYW5kXCI6IFwib2xkX2lQaG9uZTZQbHVzQmFzZURldmljZUhhbmRcIlxuXHRcdFxuXHRcdCMgIyBpUGhvbmUgNVNcblx0XHQjIFwiaXBob25lLTVzLXNwYWNlZ3JheVwiOiBcIm9sZF9pUGhvbmU1QmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS01cy1zcGFjZWdyYXktaGFuZFwiOiBcIm9sZF9pUGhvbmU1QmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNXMtc2lsdmVyXCI6IFwib2xkX2lQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTVzLXNpbHZlci1oYW5kXCI6IFwib2xkX2lQaG9uZTVCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS01cy1nb2xkXCI6IFwib2xkX2lQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTVzLWdvbGQtaGFuZFwiOiBcIm9sZF9pUGhvbmU1QmFzZURldmljZUhhbmRcIlxuXHRcdFxuXHRcdCMgIyBpUGhvbmUgNUNcblx0XHQjIFwiaXBob25lLTVjLWdyZWVuXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS01Yy1ncmVlbi1oYW5kXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNWMtYmx1ZVwiOiBcIm9sZF9pUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNWMtYmx1ZS1oYW5kXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNWMtcGlua1wiOiBcIm9sZF9pUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNWMtcGluay1oYW5kXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNWMtd2hpdGVcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTVjLXdoaXRlLWhhbmRcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS01Yy15ZWxsb3dcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTVjLXllbGxvdy1oYW5kXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZUhhbmRcIlxuXHRcdFxuXHRcdCMgIyBpUGFkIE1pbmlcblx0XHQjIFwiaXBhZC1taW5pLXNwYWNlZ3JheVwiOiBcIm9sZF9pUGFkTWluaUJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGFkLW1pbmktc3BhY2VncmF5LWhhbmRcIjogXCJvbGRfaVBhZE1pbmlCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwYWQtbWluaS1zaWx2ZXJcIjogXCJvbGRfaVBhZE1pbmlCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBhZC1taW5pLXNpbHZlci1oYW5kXCI6IFwib2xkX2lQYWRNaW5pQmFzZURldmljZUhhbmRcIlxuXHRcdFxuXHRcdCMgIyBpUGFkIEFpclxuXHRcdCMgXCJpcGFkLWFpci1zcGFjZWdyYXlcIjogXCJvbGRfaVBhZEFpckJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGFkLWFpci1zcGFjZWdyYXktaGFuZFwiOiBcIm9sZF9pUGFkQWlyQmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGFkLWFpci1zaWx2ZXJcIjogXCJvbGRfaVBhZEFpckJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGFkLWFpci1zaWx2ZXItaGFuZFwiOiBcIm9sZF9pUGFkQWlyQmFzZURldmljZUhhbmRcIlxuXHRcdFxuXHRcdCMgIyBOZXh1cyA1XG5cdFx0IyBcIm5leHVzLTUtYmxhY2tcIjogXCJvbGRfTmV4dXM1QmFzZURldmljZVwiXG5cdFx0IyBcIm5leHVzLTUtYmxhY2staGFuZFwiOiBcIm9sZF9OZXh1czVCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIE5leHVzIDlcblx0XHQjIFwibmV4dXMtOVwiOiBcIm9sZF9OZXh1czlCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjICMgQXBwbGUgV2F0Y2ggMzhtbVxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtMzgtYWx1bWludW0tc3BvcnRiYW5kLWJsYWNrXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC0zOC1hbHVtaW51bS1zcG9ydGJhbmQtYmx1ZVwiOiBcIm9sZF9BcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtMzgtYWx1bWludW0tc3BvcnRiYW5kLWdyZWVuXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC0zOC1hbHVtaW51bS1zcG9ydGJhbmQtcGlua1wiOiBcIm9sZF9BcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtMzgtYWx1bWludW0tc3BvcnRiYW5kLXdoaXRlXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2gtMzgtYmxhY2stYnJhY2VsZXRcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaC0zOC1zdGVlbC1icmFjZWxldFwiOiBcIm9sZF9BcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoZWRpdGlvbi0zOC1nb2xkLWJ1Y2tsZS1ibHVlXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTM4LWdvbGQtYnVja2xlLWdyYXlcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaGVkaXRpb24tMzgtZ29sZC1idWNrbGUtcmVkXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTM4LWdvbGQtc3BvcnRiYW5kLWJsYWNrXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTM4LWdvbGQtc3BvcnRiYW5kLXdoaXRlXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XG5cdFx0IyAjIEFwcGxlIFdhdGNoIDQybW1cblx0XHQjIFwiYXBwbGV3YXRjaHNwb3J0LTQyLWFsdW1pbnVtLXNwb3J0YmFuZC1ibGFja1wiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtNDItYWx1bWludW0tc3BvcnRiYW5kLWJsdWVcIjogXCJvbGRfQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaHNwb3J0LTQyLWFsdW1pbnVtLXNwb3J0YmFuZC1ncmVlblwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtNDItYWx1bWludW0tc3BvcnRiYW5kLXBpbmtcIjogXCJvbGRfQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaHNwb3J0LTQyLWFsdW1pbnVtLXNwb3J0YmFuZC13aGl0ZVwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoLTQyLWJsYWNrLWJyYWNlbGV0XCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2gtNDItc3RlZWwtYnJhY2VsZXRcIjogXCJvbGRfQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaGVkaXRpb24tNDItZ29sZC1idWNrbGUtYmx1ZVwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoZWRpdGlvbi00Mi1nb2xkLWJ1Y2tsZS1ncmF5XCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTQyLWdvbGQtYnVja2xlLXJlZFwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoZWRpdGlvbi00Mi1nb2xkLXNwb3J0YmFuZC1ibGFja1wiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoZWRpdGlvbi00Mi1nb2xkLXNwb3J0YmFuZC13aGl0ZVwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXG5cbiMgVGhlIGV4YWN0IGRwciBvZiBldmVyeSBiYXNlIGRldmljZSBpbiBGcmFtZXIgKGV4Y2x1ZGluZyAtSGFuZCBkdXBsaWNhdGVzKVxuQWRhcHQuX2Rwckxpc3QgPVxuXG5cdEFwcGxlSU1hYzogMSAjIFVuY29uZmlybWVkXG5cblx0QXBwbGVNYWNCb29rOiAyICMgVW5jb25maXJtZWRcblxuXHRBcHBsZU1hY0Jvb2tQcm86IDIgIyBVbmNvbmZpcm1lZFxuXG5cdEFwcGxlTWFjQm9va0FpcjogMSAjIFVuY29uZmlybWVkXG5cblx0QXBwbGVXYXRjaDM4QmxhY2tMZWF0aGVyRGV2aWNlOiAyXG5cblx0QXBwbGVXYXRjaDM4RGV2aWNlOiAyXG5cblx0QXBwbGVXYXRjaDQyRGV2aWNlOiAyXG5cblx0QXBwbGVXYXRjaFNlcmllczIzOERldmljZTogMlxuXG5cdEFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2U6IDJcblxuXHREZWxsWFBTOiAzICMgVW5jb25maXJtZWRcblxuXHRIVENhOUJhc2VEZXZpY2U6IDNcblxuXHRIVENtOEJhc2VEZXZpY2U6IDNcblxuXHRNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlOiAzLjUgIyBVbmNvbmZpcm1lZFxuXG5cdE5leHVzNEJhc2VEZXZpY2U6IDJcblxuXHROZXh1czVCYXNlRGV2aWNlOiAxMDgwIC8gNDExXG5cblx0TmV4dXM2QmFzZURldmljZTogMTQ0MCAvIDQxMVxuXG5cdE5leHVzOUJhc2VEZXZpY2U6IDJcblxuXHRQaXhlbEJhc2VEZXZpY2U6IDEwODAgLyA0MTFcblxuXHRTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlOiAzICMgVW5jb25maXJtZWRcblxuXHRTb255Vzg1T0M6IDFcblxuXHRpUGFkQWlyMkJhc2VEZXZpY2U6IDJcblxuXHRpUGFkTWluaTRCYXNlRGV2aWNlOiAyXG5cblx0aVBhZFByb0Jhc2VEZXZpY2U6IDJcblxuXHRpUGhvbmU1QmFzZURldmljZTogMlxuXG5cdGlQaG9uZTVDQmFzZURldmljZTogMlxuXG5cdGlQaG9uZTZCYXNlRGV2aWNlOiAyXG5cblx0aVBob25lNlBsdXNCYXNlRGV2aWNlOiAzXG5cblx0aVBob25lN0Jhc2VEZXZpY2U6IDJcblxuXHRpUGhvbmU3UGx1c0Jhc2VEZXZpY2U6IDNcblxuXHQjIG9sZF9BcHBsZVdhdGNoMzhEZXZpY2U6IDJcblxuXHQjIG9sZF9BcHBsZVdhdGNoNDJEZXZpY2U6IDJcblxuXHQjIG9sZF9OZXh1czVCYXNlRGV2aWNlOiAzXG5cblx0IyBvbGRfTmV4dXM5QmFzZURldmljZTogMlxuXG5cdCMgb2xkX2lQYWRBaXJCYXNlRGV2aWNlOiAyXG5cblx0IyBvbGRfaVBhZE1pbmlCYXNlRGV2aWNlOiAxXG5cblx0IyBvbGRfaVBob25lNUJhc2VEZXZpY2U6IDJcblxuXHQjIG9sZF9pUGhvbmU1Q0Jhc2VEZXZpY2U6IDJcblxuXHQjIG9sZF9pUGhvbmU2QmFzZURldmljZTogMlxuXG5cdCMgb2xkX2lQaG9uZTZQbHVzQmFzZURldmljZTogM1xuXG5cbiMgR2V0IHRoZSBkZXZpY2UgbGlzdCB3aXRob3V0IGRldmljZSBncm91cHNcbkFkYXB0Ll9nZXRGbGF0RGV2aWNlTGlzdCA9IC0+IFxuXHRmbGF0ID0gZmxhdHRlbk9iamVjdChBZGFwdC5fZGV2aWNlTGlzdClcblx0ZGVsZXRlIGZsYXQuX2V4Y2x1ZGVGcm9tTGlzdFxuXHRyZXR1cm4gZmxhdFxuXG5cbiMgR2V0IHRoZSBkcHIgdmFsdWUgZm9yIHRoZSB2aXJ0dWFsIGRldmljZSBpZiBkZXNrdG9wLCBvciBhY3R1YWwgZGV2aWNlIGlmIG5vdCBkZXNrdG9wXG5BZGFwdC5fZ2V0RHByID0gLT5cblxuXHRkZXZpY2VMaXN0ID0gQWRhcHQuX2dldEZsYXREZXZpY2VMaXN0KClcblxuXHRkcHJMaXN0ID0gQWRhcHQuX2Rwckxpc3RcblxuXHRpZiBVdGlscy5pc0Rlc2t0b3AoKVxuXG5cdFx0ZHQgPSBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblxuXHRcdGlmIGRldmljZUxpc3RbZHRdXG5cblx0XHRcdGJhc2UgPSBkZXZpY2VMaXN0W2R0XS5yZXBsYWNlIC9IYW5kJC9nLCBcIlwiXG5cblx0XHRcdGlmIGRwckxpc3RbYmFzZV1cblxuXHRcdFx0XHRyZXR1cm4gZHByTGlzdFtiYXNlXVxuXG5cdFx0XHRlbHNlXG5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJBZGFwdDogTm8gZHByIHNwZWNpZmllZCBmb3IgYmFzZSBkZXZpY2VcIlxuXG5cdFx0XHRcdHJldHVybiAxXG5cblx0XHRlbHNlXG5cblx0XHRcdGNvbnNvbGUubG9nIFwiQWRhcHQ6IGRldmljZVR5cGUgbm90IGluIGRldmljZUxpc3RcIlxuXG5cdFx0XHRyZXR1cm4gMVxuXG5cdGVsc2VcblxuXHRcdHJldHVybiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuXG5cbiMgRXhjbHVkZSBkZXZpY2UgZ3JvdXAgZnJvbSBsaXN0XG5BZGFwdC5leGNsdWRlID0gKGdyb3VwKSAtPlxuXG5cdGlmIEFkYXB0Ll9kZXZpY2VMaXN0W2dyb3VwXVxuXG5cdFx0QWRhcHQuX2RldmljZUxpc3RbZ3JvdXBdLl9leGNsdWRlRnJvbUxpc3QgPSB0cnVlXG5cdFx0QWRhcHQuYWRkRGV2aWNlU2VsZWN0b3IoKVxuXG5cdGVsc2Vcblx0XHRjb25zb2xlLmxvZyBcIkFkYXB0OiBDYW4ndCBleGNsdWRlICcje2dyb3VwfScsIG5vIGdyb3VwIGJ5IHRoYXQgbmFtZVwiXG5cblxuIyBSZWluY2x1ZGUgYW4gZXhjbHVkZWQgZGV2aWNlIGdyb3VwIGluIGxpc3RcbkFkYXB0LnVuZXhjbHVkZSA9IChncm91cCkgLT5cblxuXHRpZiBBZGFwdC5fZGV2aWNlTGlzdFtncm91cF1cblxuXHRcdEFkYXB0Ll9kZXZpY2VMaXN0W2dyb3VwXS5fZXhjbHVkZUZyb21MaXN0ID0gZmFsc2Vcblx0XHRBZGFwdC5hZGREZXZpY2VTZWxlY3RvcigpXG5cblx0ZWxzZVxuXHRcdGNvbnNvbGUubG9nIFwiQWRhcHQ6IENhbid0IHVuZXhjbHVkZSAnI3tncm91cH0nLCBubyBncm91cCBieSB0aGF0IG5hbWVcIlxuXG5cbiMgQWRkIGRyb3Bkb3duIGZvciBzZWxlY3RpbmcgYSBkaWZmZXJlbnQgZGV2aWNlXG5BZGFwdC5hZGREZXZpY2VTZWxlY3RvciA9IC0+XG5cblx0cmV0dXJuIGlmIG5vdCBVdGlscy5pc0Rlc2t0b3AoKVxuXG5cdGlmIG5vdCBBZGFwdC5fY29udHJvbERpdlxuXG5cdFx0IyBESVYgdG8gY29udGFpbiB0aGUgZGV2aWNlIGNvbnRyb2xzXG5cdFx0QWRhcHQuX2NvbnRyb2xEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcblx0XHRBZGFwdC5fY29udHJvbERpdi5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMHB4OyByaWdodDogMTBweDsgei1pbmRleDogOTk5OTsgdGV4dC1hbGlnbjogcmlnaHRcIlxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQWRhcHQuX2NvbnRyb2xEaXZcblxuXHRcdCMgRGV2aWNlIGxpc3QgZHJvcGRvd25cblx0XHRBZGFwdC5fZGV2aWNlU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic2VsZWN0XCJcblx0XHRBZGFwdC5fZGV2aWNlU2VsZWN0b3Iuc2V0QXR0cmlidXRlIFwic3R5bGVcIiwgXCJkaXNwbGF5OiBibG9ja1wiXG5cdFx0QWRhcHQuX2NvbnRyb2xEaXYuYXBwZW5kQ2hpbGQgQWRhcHQuX2RldmljZVNlbGVjdG9yXG5cblx0XHRBZGFwdC5fZGV2aWNlU2VsZWN0b3Iub25jaGFuZ2UgPSAtPlxuXG5cdFx0XHRyZXR1cm4gaWYgQHZhbHVlIGlzIFwibm9uZVwiXG5cblx0XHRcdHZhcnMgPSBnZXRVcmxWYXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuXHRcdFx0dmFycy5kZXZpY2VUeXBlID0gQHZhbHVlXG5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgbWFrZVVybFN0cmluZyh2YXJzKVxuXG5cdFx0IyBEZXZpY2Ugcm90YXRpb24gdG9nZ2xlXG5cdFx0QWRhcHQuX3JvdGF0ZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJidXR0b25cIlxuXHRcdEFkYXB0Ll9yb3RhdGVUb2dnbGUuc2V0QXR0cmlidXRlIFwidHlwZVwiLCBcImJ1dHRvblwiXG5cdFx0QWRhcHQuX3JvdGF0ZVRvZ2dsZS5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBjb2xvcjogIzMzMzsgcGFkZGluZzogMC41ZW0gMWVtOyBib3JkZXItcmFkaXVzOiAzcHhcIlxuXHRcdEFkYXB0Ll9yb3RhdGVUb2dnbGUuaW5uZXJIVE1MID0gXCJSb3RhdGVcIlxuXHRcdEFkYXB0Ll9jb250cm9sRGl2LmFwcGVuZENoaWxkIEFkYXB0Ll9yb3RhdGVUb2dnbGVcblxuXHRcdEFkYXB0Ll9yb3RhdGVUb2dnbGUub25jbGljayA9IC0+XG5cblx0XHRcdHZhcnMgPSBnZXRVcmxWYXJzKClcblxuXHRcdFx0aWYgIXZhcnMub3JpZW50YXRpb24gb3IgdmFycy5vcmllbnRhdGlvbiBpcyBcIjBcIlxuXHRcdFx0XHR2YXJzLm9yaWVudGF0aW9uID0gXCI5MFwiXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0dmFycy5vcmllbnRhdGlvbiA9IFwiMFwiXG5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgbWFrZVVybFN0cmluZyh2YXJzKVxuXG5cblx0IyBDbGVhciBkZXZpY2UgbGlzdCBiZWZvcmUgcG9wdWxhdGluZyBpbiBjYXNlIGl0IGFscmVhZHkgZXhpc3RzXG5cdEFkYXB0Ll9kZXZpY2VTZWxlY3Rvci5pbm5lckhUTUwgPSBcIlwiXG5cblx0IyBMaXN0IGhlYWRlclxuXHRBZGFwdC5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIlBpY2sgZGV2aWNlXCIpXG5cblx0IyBHZW5lcmF0ZSBsaXN0XG5cdGZvciBncm91cCwgZGV2aWNlcyBvZiBBZGFwdC5fZGV2aWNlTGlzdCB3aGVuIGRldmljZXMuX2V4Y2x1ZGVGcm9tTGlzdCBpc250IHRydWVcblxuXHRcdEFkYXB0Ll9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpXG5cdFx0QWRhcHQuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oZ3JvdXApXG5cdFx0QWRhcHQuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcblxuXHRcdGZvciBkZXZpY2UsIGJhc2Ugb2YgZGV2aWNlcyB3aGVuIGRldmljZSBpc250IFwiX2V4Y2x1ZGVGcm9tTGlzdFwiXG5cdFx0XHRBZGFwdC5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihkZXZpY2UsIGRldmljZSlcblxuXG5cbiMgU2V0IEFkYXB0Ll9kcHIgYW5kIGdvIGZ1bGwgc2NyZWVuIGlmIGl0J3MgYSBub24tZGVza3RvcCBkZXZpY2VcbkFkYXB0LmluaXQgPSAtPlxuXG5cdGlmIFV0aWxzLmlzRGVza3RvcCgpXG5cblx0XHRBZGFwdC5hZGREZXZpY2VTZWxlY3RvcigpXG5cblx0XHR1cmxWYXJzID0gZ2V0VXJsVmFycygpXG5cblx0XHRpZiB1cmxWYXJzLmRldmljZVR5cGU/XG5cdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSB1cmxWYXJzLmRldmljZVR5cGVcblxuXHRcdGlmIHVybFZhcnMub3JpZW50YXRpb24/XG5cdFx0XHRGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uID0gcGFyc2VJbnQodXJsVmFycy5vcmllbnRhdGlvbilcblxuXG5cdGVsc2VcblxuXHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG5cblx0QWRhcHQuZHByID0gQWRhcHQuX2dldERwcigpXG5cdEFkYXB0LndpZHRoID0gU2NyZWVuLndpZHRoIC8gQWRhcHQuZHByXG5cdEFkYXB0LmhlaWdodCA9IFNjcmVlbi5oZWlnaHQgLyBBZGFwdC5kcHJcblxuXHR3aW5kb3cuZHAgPz0gQWRhcHQuZHBcblxuXG4jIENhbGN1bGF0ZSByZWFsIHBpeGVsIHZhbHVlIGZyb20gYSBkcCB2YWx1ZVxuQWRhcHQuZHAgPSAodmFsdWUpIC0+IHZhbHVlICogQWRhcHQuZHByXG5cblxuIyBJbml0aWFsaXplXG5BZGFwdC5pbml0KClcblxuXG5leHBvcnRzLkFkYXB0ID0gQWRhcHQiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRElBLElBQUE7O0FBQUEsVUFBQSxHQUFhLFNBQUE7QUFFWixNQUFBO0VBQUEsSUFBQSxHQUFPO0VBRVAsS0FBQSxHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQXJCLENBQTZCLHlCQUE3QixFQUF3RCxTQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsS0FBVDtXQUMvRCxJQUFL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
