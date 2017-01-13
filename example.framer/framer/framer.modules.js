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

Adapt._dpr = null;

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
  Adapt._dpr = Adapt._getDpr();
  if (Utils.isDesktop()) {
    Adapt.addDeviceSelector();
    urlVars = getUrlVars(window.location.href);
    if (urlVars.deviceType != null) {
      Framer.Device.deviceType = urlVars.deviceType;
    }
    if (urlVars.orientation != null) {
      Framer.Device.orientation = parseInt(urlVars.orientation);
    }
  } else {
    Framer.Device.deviceType = "fullscreen";
  }
  return window.dp != null ? window.dp : window.dp = Adapt.dp;
};

Adapt.dp = function(value) {
  return value * Adapt._dpr;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NpZ3VyZC9SZXBvcy9NaW5lIC0gRnJhbWVyIG1vZHVsZXMvQWRhcHQvZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaWd1cmQvUmVwb3MvTWluZSAtIEZyYW1lciBtb2R1bGVzL0FkYXB0L2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvQWRhcHQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyBIZWxwZXJzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgR2V0IHRoZSBVUkwgdmFyaWFibGVzIGFzIGFuIG9iamVjdFxuZ2V0VXJsVmFycyA9ICgpIC0+XG5cblx0dmFycyA9IHt9XG5cblx0cGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlIC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIChtLCBrZXksIHZhbHVlKSAtPlxuXHRcdHZhcnNba2V5XSA9IHZhbHVlXG5cblx0cmV0dXJuIHZhcnNcblxuXG4jIEdldCB0aGUgVVJMIHZhcmlhYmxlcyBhcyBhbiBvYmplY3Rcbm1ha2VVcmxTdHJpbmcgPSAob2JqKSAtPlxuXG5cdHN0cmluZyA9IFwiP1wiXG5cblx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0c3RyaW5nICs9IGtleSArIFwiPVwiICsgdmFsdWUgKyBcIiZcIlxuXG5cdHN0cmluZyA9IHN0cmluZy5zbGljZSgwLCAtMSlcblxuXHRyZXR1cm4gc3RyaW5nXG5cbiMgRmxhdHRlbiBvYmplY3QgKHJldHVybnMgY2xvbmUpXG5mbGF0dGVuT2JqZWN0ID0gKG9iaikgLT5cblxuXHRmbGF0ID0ge31cblxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblxuXHRcdGlmIF8uaXNQbGFpbk9iamVjdCh2YWx1ZSlcblxuXHRcdFx0Zm9yIHN1YmtleSwgc3VidmFsdWUgb2YgdmFsdWVcblxuXHRcdFx0XHRmbGF0W3N1YmtleV0gPSBzdWJ2YWx1ZVxuXG5cdFx0ZWxzZVxuXG5cdFx0XHRmbGF0W2tleV0gPSB2YWx1ZVxuXG5cdHJldHVybiBmbGF0XG5cbiMgTWFrZSBvcHRpb24gZWxlbWVudFxubWFrZU9wdGlvbiA9IChsYWJlbCwgdmFsdWUgPSBcIm5vbmVcIikgLT5cblxuXHRvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwib3B0aW9uXCJcblx0b3B0LnNldEF0dHJpYnV0ZSBcInZhbHVlXCIsIHZhbHVlXG5cdG9wdC5pbm5lckhUTUwgPSBsYWJlbFxuXG5cdHJldHVybiBvcHRcblxuXG5cbiMgQWRhcHRcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5BZGFwdCA9IHt9XG5BZGFwdC5fZHByID0gbnVsbFxuXG5cbiMgRXZlcnkgZGV2aWNlIGZyb20gRnJhbWVyJ3MgRGV2aWNlQ29tcG9uZW50LCB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgYmFzZSBjbGFzc1xuQWRhcHQuX2RldmljZUxpc3QgPVxuXHRcblx0XCJBcHBsZSAtIGlQYWRcIjpcblxuXHRcdCMgaVBhZCBBaXJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItc2lsdmVyXCI6IFwiaVBhZEFpcjJCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtYWlyLTItZ29sZFwiOiBcImlQYWRBaXIyQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLWFpci0yLXNwYWNlLWdyYXlcIjogXCJpUGFkQWlyMkJhc2VEZXZpY2VcIlxuXHRcdFxuXHRcdCMgaVBhZCBNaW5pXG5cdFx0XCJhcHBsZS1pcGFkLW1pbmktNC1zaWx2ZXJcIjogXCJpUGFkTWluaTRCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LWdvbGRcIjogXCJpUGFkTWluaTRCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwYWQtbWluaS00LXNwYWNlLWdyYXlcIjogXCJpUGFkTWluaTRCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIGlQYWQgUHJvXG5cdFx0XCJhcHBsZS1pcGFkLXByby1zaWx2ZXJcIjogXCJpUGFkUHJvQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGFkLXByby1nb2xkXCI6IFwiaVBhZFByb0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBhZC1wcm8tc3BhY2UtZ3JheVwiOiBcImlQYWRQcm9CYXNlRGV2aWNlXCJcblxuXHRcIkFwcGxlIC0gaVBob25lXCI6XG5cdFx0XG5cdFx0IyBpUGhvbmUgN1xuXHRcdFwiYXBwbGUtaXBob25lLTctZ29sZFwiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXJvc2UtZ29sZFwiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXNpbHZlclwiOiBcImlQaG9uZTdCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LWJsYWNrXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctamV0LWJsYWNrXCI6IFwiaVBob25lN0Jhc2VEZXZpY2VcIlxuXHRcdFxuXHRcdCMgaVBob25lIDcgUGx1c1xuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1nb2xkXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtcm9zZS1nb2xkXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtc2lsdmVyXCI6IFwiaVBob25lN1BsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS03LXBsdXMtYmxhY2tcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTctcGx1cy1qZXQtYmxhY2tcIjogXCJpUGhvbmU3UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFxuXHRcdCMgaVBob25lIDZzXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtZ29sZFwiOiBcImlQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtc2lsdmVyXCI6IFwiaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU2QmFzZURldmljZVwiXG5cdFx0XG5cdFx0IyBpUGhvbmUgNnMgUGx1c1xuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtZ29sZFwiOiBcImlQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1yb3NlLWdvbGRcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtc2lsdmVyXCI6IFwiaVBob25lNlBsdXNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXNwYWNlLWdyYXlcIjogXCJpUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdFxuXHRcdCMgaVBob25lIDVTXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtZ29sZFwiOiBcImlQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01cy1zaWx2ZXJcIjogXCJpUGhvbmU1QmFzZURldmljZVwiXG5cdFx0XCJhcHBsZS1pcGhvbmUtNXMtc3BhY2UtZ3JheVwiOiBcImlQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIGlQaG9uZSA1Q1xuXHRcdFwiYXBwbGUtaXBob25lLTVjLWJsdWVcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLWdyZWVuXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy1yZWRcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdFwiYXBwbGUtaXBob25lLTVjLXdoaXRlXCI6IFwiaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHRcImFwcGxlLWlwaG9uZS01Yy15ZWxsb3dcIjogXCJpUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXG5cdFwiQXBwbGUgLSBXYXRjaFwiOlxuXHRcdFxuXHRcdCMgQXBwbGUgV2F0Y2ggU2VyaWVzIDIgMzhtbVxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1ibGFjay1zdGVlbC1ibGFja1wiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1lZGl0aW9uXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXJvc2UtZ29sZC1hbHVtaW51bS1taWRuaWdodC1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS1jb2NvYVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tY29uY3JldGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLW9jZWFuLWJsdWVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc2lsdmVyLWFsdW1pbnVtLXJlZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0tdHVycXVvaXNlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNpbHZlci1hbHVtaW51bS13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItMzhtbS1zaWx2ZXItYWx1bWludW0teWVsbG93XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTM4bW0tc3BvcnQtYWx1bWludW0td2FsbnV0XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi0zOG1tLXN0ZWVsLXdoaXRlXCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XG5cdFx0IyBBcHBsZSBXYXRjaCBTZXJpZXMgMiA0Mm1tXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLWVkaXRpb25cIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tZ29sZC1hbHVtaW51bS1jb2NvYVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1yb3NlLWdvbGQtYWx1bWludW0tbWlkbmlnaHQtYmx1ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tY29uY3JldGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLWdyZWVuXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1saWdodC1waW5rXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1vY2Vhbi1ibHVlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS1waW5rLXNhbmRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc2lsdmVyLWFsdW1pbnVtLXJlZFwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0tdHVycXVvaXNlXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNpbHZlci1hbHVtaW51bS13aGl0ZVwiOiBcIkFwcGxlV2F0Y2hTZXJpZXMyNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtc2VyaWVzLTItNDJtbS1zaWx2ZXItYWx1bWludW0teWVsbG93XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWJsYWNrLXN0ZWVsLWJsYWNrXCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1zZXJpZXMtMi00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2tcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLXNlcmllcy0yLTQybW0tc3RlZWwtd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIE5pa2UrIDM4bW1cblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy0zOG1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stY29vbC1ncmF5XCI6IFwiQXBwbGVXYXRjaFNlcmllczIzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtMzhtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlXCJcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIE5pa2UrIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy00Mm1tLXNpbHZlci1hbHVtaW51bS1mbGF0LXNpbHZlci12b2x0XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zaWx2ZXItYWx1bWludW0tZmxhdC1zaWx2ZXItd2hpdGVcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLW5pa2UtcGx1cy00Mm1tLXNwYWNlLWdyYXktYWx1bWludW0tYmxhY2stY29vbC1ncmF5XCI6IFwiQXBwbGVXYXRjaFNlcmllczI0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC1uaWtlLXBsdXMtNDJtbS1zcGFjZS1ncmF5LWFsdW1pbnVtLWJsYWNrLXZvbHRcIjogXCJBcHBsZVdhdGNoU2VyaWVzMjQyRGV2aWNlXCJcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIDM4bW1cblx0XHRcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOEJsYWNrTGVhdGhlckRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXJvc2UtZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOEJsYWNrTGVhdGhlckRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXN0YWlubGVzcy1zdGVlbC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOEJsYWNrTGVhdGhlckRldmljZVwiXG5cdFx0XG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLWJsYWNrLXN0ZWVsLWJsYWNrLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLWdvbGQtbWlkbmlnaHQtYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1yb3NlLWdvbGQtbGF2ZW5kZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1mb2ctY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tZ3JlZW4tY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tcmVkLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtMzhtbS1zcG9ydC1hbHVtaW51bS1nb2xkLWFudGlxdWUtd2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTM4bW0tc3BvcnQtYWx1bWludW0tcm9zZS1nb2xkLXN0b25lLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC0zOG1tLXNwb3J0LXNwYWNlLWdyYXktYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcblx0XHQjIEFwcGxlIFdhdGNoIDQybW1cblx0XHRcImFwcGxlLXdhdGNoLTQybW0tYmxhY2stc3RlZWwtYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tZ29sZC1ibGFjay1sZWF0aGVyLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLWdvbGQtbWlkbmlnaHQtYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtYmxhY2stbGVhdGhlci1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1yb3NlLWdvbGQtbGF2ZW5kZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tYmx1ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1mb2ctY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tZ3JlZW4tY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcmVkLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LWFsdW1pbnVtLXdhbG51dC1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS13aGl0ZS1jbG9zZWRcIjogXCJBcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdFwiYXBwbGUtd2F0Y2gtNDJtbS1zcG9ydC1hbHVtaW51bS1nb2xkLWFudGlxdWUtd2hpdGUtY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3BvcnQtYWx1bWludW0tcm9zZS1nb2xkLXN0b25lLWNsb3NlZFwiOiBcIkFwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0XCJhcHBsZS13YXRjaC00Mm1tLXNwb3J0LXNwYWNlLWdyYXktYmxhY2stY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHRcImFwcGxlLXdhdGNoLTQybW0tc3RhaW5sZXNzLXN0ZWVsLWJsYWNrLWxlYXRoZXItY2xvc2VkXCI6IFwiQXBwbGVXYXRjaDQyRGV2aWNlXCJcblxuXHRcIkdvb2dsZVwiOlxuXHRcdFxuXHRcdCMgTkVYVVNcblx0XHRcImdvb2dsZS1uZXh1cy00XCI6IFwiTmV4dXM0QmFzZURldmljZVwiXG5cdFx0XCJnb29nbGUtbmV4dXMtNXhcIjogXCJOZXh1czVCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1uZXh1cy02cFwiOiBcIk5leHVzNkJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLW5leHVzLTlcIjogXCJOZXh1czlCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIFBpeGVsXG5cdFx0XCJnb29nbGUtcGl4ZWwtcXVpdGUtYmxhY2tcIjogXCJQaXhlbEJhc2VEZXZpY2VcIlxuXHRcdFwiZ29vZ2xlLXBpeGVsLXJlYWxseS1ibHVlXCI6IFwiUGl4ZWxCYXNlRGV2aWNlXCJcblx0XHRcImdvb2dsZS1waXhlbC12ZXJ5LXNpbHZlclwiOiBcIlBpeGVsQmFzZURldmljZVwiXG5cdFxuXHRcIk90aGVyIC0gSGFuZGhlbGRcIjpcblxuXHRcdCMgSFRDIE9ORSBBOVxuXHRcdFwiaHRjLW9uZS1hOS1ibGFja1wiOiBcIkhUQ2E5QmFzZURldmljZVwiXG5cdFx0XCJodGMtb25lLWE5LXdoaXRlXCI6IFwiSFRDYTlCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIEhUQyBPTkUgTThcblx0XHRcImh0Yy1vbmUtbTgtYmxhY2tcIjogXCJIVENtOEJhc2VEZXZpY2VcIlxuXHRcdFwiaHRjLW9uZS1tOC1nb2xkXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcImh0Yy1vbmUtbTgtc2lsdmVyXCI6IFwiSFRDbThCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIE1JQ1JPU09GVCBMVU1JQSA5NTBcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtYmxhY2tcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblx0XHRcIm1pY3Jvc29mdC1sdW1pYS05NTAtd2hpdGVcIjogXCJNU0ZUTHVtaWE5NTBCYXNlRGV2aWNlXCJcblx0XHRcblx0XHQjIFNBTVNVTkcgTk9URSA1XG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtYmxhY2tcIjogXCJTYW1zdW5nR2FsYXh5Tm90ZTVCYXNlRGV2aWNlXCJcblx0XHRcInNhbXN1bmctZ2FsYXh5LW5vdGUtNS1nb2xkXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFx0XCJzYW1zdW5nLWdhbGF4eS1ub3RlLTUtcGlua1wiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LXNpbHZlci10aXRhbml1bVwiOiBcIlNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2VcIlxuXHRcdFwic2Ftc3VuZy1nYWxheHktbm90ZS01LXdoaXRlXCI6IFwiU2Ftc3VuZ0dhbGF4eU5vdGU1QmFzZURldmljZVwiXG5cdFxuXHRcIk90aGVyIC0gRGVza3RvcCAmIFRWXCI6XG5cblx0XHQjIE5vdGVib29rc1xuXHRcdFwiYXBwbGUtbWFjYm9va1wiOiBcIkFwcGxlTWFjQm9va1wiXG5cdFx0XCJhcHBsZS1tYWNib29rLWFpclwiOiBcIkFwcGxlTWFjQm9va0FpclwiXG5cdFx0XCJhcHBsZS1tYWNib29rLXByb1wiOiBcIkFwcGxlTWFjQm9va1Byb1wiXG5cdFx0XCJkZWxsLXhwc1wiOiBcIkRlbGxYUFNcIlxuXHRcdFxuXHRcdCMgRGVza3RvcHNcblx0XHRcImFwcGxlLWltYWNcIjogXCJBcHBsZUlNYWNcIlxuXHRcdFxuXHRcdCMgVFZcblx0XHRcInNvbnktdzg1T2NcIjogXCJTb255Vzg1T0NcIlxuXHRcdFxuXHRcdCMgT0xEIERFVklDRVNcblxuXHRcdCMgIyBpUGhvbmUgNlxuXHRcdCMgXCJpcGhvbmUtNi1zcGFjZWdyYXlcIjogXCJvbGRfaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNi1zcGFjZWdyYXktaGFuZFwiOiBcIm9sZF9pUGhvbmU2QmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNi1zaWx2ZXJcIjogXCJvbGRfaVBob25lNkJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNi1zaWx2ZXItaGFuZFwiOiBcIm9sZF9pUGhvbmU2QmFzZURldmljZUhhbmRcIlxuXHRcdCMgXCJpcGhvbmUtNi1nb2xkXCI6IFwib2xkX2lQaG9uZTZCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTYtZ29sZC1oYW5kXCI6IFwib2xkX2lQaG9uZTZCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIGlQaG9uZSA2K1xuXHRcdCMgXCJpcGhvbmUtNnBsdXMtc3BhY2VncmF5XCI6IFwib2xkX2lQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS02cGx1cy1zcGFjZWdyYXktaGFuZFwiOiBcIm9sZF9pUGhvbmU2UGx1c0Jhc2VEZXZpY2VIYW5kXCJcblx0XHQjIFwiaXBob25lLTZwbHVzLXNpbHZlclwiOiBcIm9sZF9pUGhvbmU2UGx1c0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNnBsdXMtc2lsdmVyLWhhbmRcIjogXCJvbGRfaVBob25lNlBsdXNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS02cGx1cy1nb2xkXCI6IFwib2xkX2lQaG9uZTZQbHVzQmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS02cGx1cy1nb2xkLWhhbmRcIjogXCJvbGRfaVBob25lNlBsdXNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIGlQaG9uZSA1U1xuXHRcdCMgXCJpcGhvbmUtNXMtc3BhY2VncmF5XCI6IFwib2xkX2lQaG9uZTVCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTVzLXNwYWNlZ3JheS1oYW5kXCI6IFwib2xkX2lQaG9uZTVCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS01cy1zaWx2ZXJcIjogXCJvbGRfaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNXMtc2lsdmVyLWhhbmRcIjogXCJvbGRfaVBob25lNUJhc2VEZXZpY2VIYW5kXCJcblx0XHQjIFwiaXBob25lLTVzLWdvbGRcIjogXCJvbGRfaVBob25lNUJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNXMtZ29sZC1oYW5kXCI6IFwib2xkX2lQaG9uZTVCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIGlQaG9uZSA1Q1xuXHRcdCMgXCJpcGhvbmUtNWMtZ3JlZW5cIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlXCJcblx0XHQjIFwiaXBob25lLTVjLWdyZWVuLWhhbmRcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS01Yy1ibHVlXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS01Yy1ibHVlLWhhbmRcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS01Yy1waW5rXCI6IFwib2xkX2lQaG9uZTVDQmFzZURldmljZVwiXG5cdFx0IyBcImlwaG9uZS01Yy1waW5rLWhhbmRcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwaG9uZS01Yy13aGl0ZVwiOiBcIm9sZF9pUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNWMtd2hpdGUtaGFuZFwiOiBcIm9sZF9pUGhvbmU1Q0Jhc2VEZXZpY2VIYW5kXCJcblx0XHQjIFwiaXBob25lLTVjLXllbGxvd1wiOiBcIm9sZF9pUGhvbmU1Q0Jhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGhvbmUtNWMteWVsbG93LWhhbmRcIjogXCJvbGRfaVBob25lNUNCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIGlQYWQgTWluaVxuXHRcdCMgXCJpcGFkLW1pbmktc3BhY2VncmF5XCI6IFwib2xkX2lQYWRNaW5pQmFzZURldmljZVwiXG5cdFx0IyBcImlwYWQtbWluaS1zcGFjZWdyYXktaGFuZFwiOiBcIm9sZF9pUGFkTWluaUJhc2VEZXZpY2VIYW5kXCJcblx0XHQjIFwiaXBhZC1taW5pLXNpbHZlclwiOiBcIm9sZF9pUGFkTWluaUJhc2VEZXZpY2VcIlxuXHRcdCMgXCJpcGFkLW1pbmktc2lsdmVyLWhhbmRcIjogXCJvbGRfaVBhZE1pbmlCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIGlQYWQgQWlyXG5cdFx0IyBcImlwYWQtYWlyLXNwYWNlZ3JheVwiOiBcIm9sZF9pUGFkQWlyQmFzZURldmljZVwiXG5cdFx0IyBcImlwYWQtYWlyLXNwYWNlZ3JheS1oYW5kXCI6IFwib2xkX2lQYWRBaXJCYXNlRGV2aWNlSGFuZFwiXG5cdFx0IyBcImlwYWQtYWlyLXNpbHZlclwiOiBcIm9sZF9pUGFkQWlyQmFzZURldmljZVwiXG5cdFx0IyBcImlwYWQtYWlyLXNpbHZlci1oYW5kXCI6IFwib2xkX2lQYWRBaXJCYXNlRGV2aWNlSGFuZFwiXG5cdFx0XG5cdFx0IyAjIE5leHVzIDVcblx0XHQjIFwibmV4dXMtNS1ibGFja1wiOiBcIm9sZF9OZXh1czVCYXNlRGV2aWNlXCJcblx0XHQjIFwibmV4dXMtNS1ibGFjay1oYW5kXCI6IFwib2xkX05leHVzNUJhc2VEZXZpY2VIYW5kXCJcblx0XHRcblx0XHQjICMgTmV4dXMgOVxuXHRcdCMgXCJuZXh1cy05XCI6IFwib2xkX05leHVzOUJhc2VEZXZpY2VcIlxuXHRcdFxuXHRcdCMgIyBBcHBsZSBXYXRjaCAzOG1tXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC0zOC1hbHVtaW51bS1zcG9ydGJhbmQtYmxhY2tcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaHNwb3J0LTM4LWFsdW1pbnVtLXNwb3J0YmFuZC1ibHVlXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC0zOC1hbHVtaW51bS1zcG9ydGJhbmQtZ3JlZW5cIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaHNwb3J0LTM4LWFsdW1pbnVtLXNwb3J0YmFuZC1waW5rXCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC0zOC1hbHVtaW51bS1zcG9ydGJhbmQtd2hpdGVcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaC0zOC1ibGFjay1icmFjZWxldFwiOiBcIm9sZF9BcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoLTM4LXN0ZWVsLWJyYWNlbGV0XCI6IFwib2xkX0FwcGxlV2F0Y2gzOERldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTM4LWdvbGQtYnVja2xlLWJsdWVcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaGVkaXRpb24tMzgtZ29sZC1idWNrbGUtZ3JheVwiOiBcIm9sZF9BcHBsZVdhdGNoMzhEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoZWRpdGlvbi0zOC1nb2xkLWJ1Y2tsZS1yZWRcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaGVkaXRpb24tMzgtZ29sZC1zcG9ydGJhbmQtYmxhY2tcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaGVkaXRpb24tMzgtZ29sZC1zcG9ydGJhbmQtd2hpdGVcIjogXCJvbGRfQXBwbGVXYXRjaDM4RGV2aWNlXCJcblx0XHRcblx0XHQjICMgQXBwbGUgV2F0Y2ggNDJtbVxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtNDItYWx1bWludW0tc3BvcnRiYW5kLWJsYWNrXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC00Mi1hbHVtaW51bS1zcG9ydGJhbmQtYmx1ZVwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtNDItYWx1bWludW0tc3BvcnRiYW5kLWdyZWVuXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hzcG9ydC00Mi1hbHVtaW51bS1zcG9ydGJhbmQtcGlua1wiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoc3BvcnQtNDItYWx1bWludW0tc3BvcnRiYW5kLXdoaXRlXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2gtNDItYmxhY2stYnJhY2VsZXRcIjogXCJvbGRfQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaC00Mi1zdGVlbC1icmFjZWxldFwiOiBcIm9sZF9BcHBsZVdhdGNoNDJEZXZpY2VcIlxuXHRcdCMgXCJhcHBsZXdhdGNoZWRpdGlvbi00Mi1nb2xkLWJ1Y2tsZS1ibHVlXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTQyLWdvbGQtYnVja2xlLWdyYXlcIjogXCJvbGRfQXBwbGVXYXRjaDQyRGV2aWNlXCJcblx0XHQjIFwiYXBwbGV3YXRjaGVkaXRpb24tNDItZ29sZC1idWNrbGUtcmVkXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTQyLWdvbGQtc3BvcnRiYW5kLWJsYWNrXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cdFx0IyBcImFwcGxld2F0Y2hlZGl0aW9uLTQyLWdvbGQtc3BvcnRiYW5kLXdoaXRlXCI6IFwib2xkX0FwcGxlV2F0Y2g0MkRldmljZVwiXG5cblxuIyBUaGUgZXhhY3QgZHByIG9mIGV2ZXJ5IGJhc2UgZGV2aWNlIGluIEZyYW1lciAoZXhjbHVkaW5nIC1IYW5kIGR1cGxpY2F0ZXMpXG5BZGFwdC5fZHByTGlzdCA9XG5cblx0QXBwbGVJTWFjOiAxICMgVW5jb25maXJtZWRcblxuXHRBcHBsZU1hY0Jvb2s6IDIgIyBVbmNvbmZpcm1lZFxuXG5cdEFwcGxlTWFjQm9va1BybzogMiAjIFVuY29uZmlybWVkXG5cblx0QXBwbGVNYWNCb29rQWlyOiAxICMgVW5jb25maXJtZWRcblxuXHRBcHBsZVdhdGNoMzhCbGFja0xlYXRoZXJEZXZpY2U6IDJcblxuXHRBcHBsZVdhdGNoMzhEZXZpY2U6IDJcblxuXHRBcHBsZVdhdGNoNDJEZXZpY2U6IDJcblxuXHRBcHBsZVdhdGNoU2VyaWVzMjM4RGV2aWNlOiAyXG5cblx0QXBwbGVXYXRjaFNlcmllczI0MkRldmljZTogMlxuXG5cdERlbGxYUFM6IDMgIyBVbmNvbmZpcm1lZFxuXG5cdEhUQ2E5QmFzZURldmljZTogM1xuXG5cdEhUQ204QmFzZURldmljZTogM1xuXG5cdE1TRlRMdW1pYTk1MEJhc2VEZXZpY2U6IDMuNSAjIFVuY29uZmlybWVkXG5cblx0TmV4dXM0QmFzZURldmljZTogMlxuXG5cdE5leHVzNUJhc2VEZXZpY2U6IDEwODAgLyA0MTFcblxuXHROZXh1czZCYXNlRGV2aWNlOiAxNDQwIC8gNDExXG5cblx0TmV4dXM5QmFzZURldmljZTogMlxuXG5cdFBpeGVsQmFzZURldmljZTogMTA4MCAvIDQxMVxuXG5cdFNhbXN1bmdHYWxheHlOb3RlNUJhc2VEZXZpY2U6IDMgIyBVbmNvbmZpcm1lZFxuXG5cdFNvbnlXODVPQzogMVxuXG5cdGlQYWRBaXIyQmFzZURldmljZTogMlxuXG5cdGlQYWRNaW5pNEJhc2VEZXZpY2U6IDJcblxuXHRpUGFkUHJvQmFzZURldmljZTogMlxuXG5cdGlQaG9uZTVCYXNlRGV2aWNlOiAyXG5cblx0aVBob25lNUNCYXNlRGV2aWNlOiAyXG5cblx0aVBob25lNkJhc2VEZXZpY2U6IDJcblxuXHRpUGhvbmU2UGx1c0Jhc2VEZXZpY2U6IDNcblxuXHRpUGhvbmU3QmFzZURldmljZTogMlxuXG5cdGlQaG9uZTdQbHVzQmFzZURldmljZTogM1xuXG5cdCMgb2xkX0FwcGxlV2F0Y2gzOERldmljZTogMlxuXG5cdCMgb2xkX0FwcGxlV2F0Y2g0MkRldmljZTogMlxuXG5cdCMgb2xkX05leHVzNUJhc2VEZXZpY2U6IDNcblxuXHQjIG9sZF9OZXh1czlCYXNlRGV2aWNlOiAyXG5cblx0IyBvbGRfaVBhZEFpckJhc2VEZXZpY2U6IDJcblxuXHQjIG9sZF9pUGFkTWluaUJhc2VEZXZpY2U6IDFcblxuXHQjIG9sZF9pUGhvbmU1QmFzZURldmljZTogMlxuXG5cdCMgb2xkX2lQaG9uZTVDQmFzZURldmljZTogMlxuXG5cdCMgb2xkX2lQaG9uZTZCYXNlRGV2aWNlOiAyXG5cblx0IyBvbGRfaVBob25lNlBsdXNCYXNlRGV2aWNlOiAzXG5cblxuIyBHZXQgdGhlIGRldmljZSBsaXN0IHdpdGhvdXQgZGV2aWNlIGdyb3Vwc1xuQWRhcHQuX2dldEZsYXREZXZpY2VMaXN0ID0gLT4gXG5cdGZsYXQgPSBmbGF0dGVuT2JqZWN0KEFkYXB0Ll9kZXZpY2VMaXN0KVxuXHRkZWxldGUgZmxhdC5fZXhjbHVkZUZyb21MaXN0XG5cdHJldHVybiBmbGF0XG5cblxuIyBHZXQgdGhlIGRwciB2YWx1ZSBmb3IgdGhlIHZpcnR1YWwgZGV2aWNlIGlmIGRlc2t0b3AsIG9yIGFjdHVhbCBkZXZpY2UgaWYgbm90IGRlc2t0b3BcbkFkYXB0Ll9nZXREcHIgPSAtPlxuXG5cdGRldmljZUxpc3QgPSBBZGFwdC5fZ2V0RmxhdERldmljZUxpc3QoKVxuXG5cdGRwckxpc3QgPSBBZGFwdC5fZHByTGlzdFxuXG5cdGlmIFV0aWxzLmlzRGVza3RvcCgpXG5cblx0XHRkdCA9IEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXG5cdFx0aWYgZGV2aWNlTGlzdFtkdF1cblxuXHRcdFx0YmFzZSA9IGRldmljZUxpc3RbZHRdLnJlcGxhY2UgL0hhbmQkL2csIFwiXCJcblxuXHRcdFx0aWYgZHByTGlzdFtiYXNlXVxuXG5cdFx0XHRcdHJldHVybiBkcHJMaXN0W2Jhc2VdXG5cblx0XHRcdGVsc2VcblxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkFkYXB0OiBObyBkcHIgc3BlY2lmaWVkIGZvciBiYXNlIGRldmljZVwiXG5cblx0XHRcdFx0cmV0dXJuIDFcblxuXHRcdGVsc2VcblxuXHRcdFx0Y29uc29sZS5sb2cgXCJBZGFwdDogZGV2aWNlVHlwZSBub3QgaW4gZGV2aWNlTGlzdFwiXG5cblx0XHRcdHJldHVybiAxXG5cblx0ZWxzZVxuXG5cdFx0cmV0dXJuIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG5cblxuIyBFeGNsdWRlIGRldmljZSBncm91cCBmcm9tIGxpc3RcbkFkYXB0LmV4Y2x1ZGUgPSAoZ3JvdXApIC0+XG5cblx0aWYgQWRhcHQuX2RldmljZUxpc3RbZ3JvdXBdXG5cblx0XHRBZGFwdC5fZGV2aWNlTGlzdFtncm91cF0uX2V4Y2x1ZGVGcm9tTGlzdCA9IHRydWVcblx0XHRBZGFwdC5hZGREZXZpY2VTZWxlY3RvcigpXG5cblx0ZWxzZVxuXHRcdGNvbnNvbGUubG9nIFwiQWRhcHQ6IENhbid0IGV4Y2x1ZGUgJyN7Z3JvdXB9Jywgbm8gZ3JvdXAgYnkgdGhhdCBuYW1lXCJcblxuXG4jIFJlaW5jbHVkZSBhbiBleGNsdWRlZCBkZXZpY2UgZ3JvdXAgaW4gbGlzdFxuQWRhcHQudW5leGNsdWRlID0gKGdyb3VwKSAtPlxuXG5cdGlmIEFkYXB0Ll9kZXZpY2VMaXN0W2dyb3VwXVxuXG5cdFx0QWRhcHQuX2RldmljZUxpc3RbZ3JvdXBdLl9leGNsdWRlRnJvbUxpc3QgPSBmYWxzZVxuXHRcdEFkYXB0LmFkZERldmljZVNlbGVjdG9yKClcblxuXHRlbHNlXG5cdFx0Y29uc29sZS5sb2cgXCJBZGFwdDogQ2FuJ3QgdW5leGNsdWRlICcje2dyb3VwfScsIG5vIGdyb3VwIGJ5IHRoYXQgbmFtZVwiXG5cblxuIyBBZGQgZHJvcGRvd24gZm9yIHNlbGVjdGluZyBhIGRpZmZlcmVudCBkZXZpY2VcbkFkYXB0LmFkZERldmljZVNlbGVjdG9yID0gLT5cblxuXHRyZXR1cm4gaWYgbm90IFV0aWxzLmlzRGVza3RvcCgpXG5cblx0aWYgbm90IEFkYXB0Ll9jb250cm9sRGl2XG5cblx0XHQjIERJViB0byBjb250YWluIHRoZSBkZXZpY2UgY29udHJvbHNcblx0XHRBZGFwdC5fY29udHJvbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJkaXZcIlxuXHRcdEFkYXB0Ll9jb250cm9sRGl2LnNldEF0dHJpYnV0ZSBcInN0eWxlXCIsIFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEwcHg7IHJpZ2h0OiAxMHB4OyB6LWluZGV4OiA5OTk5OyB0ZXh0LWFsaWduOiByaWdodFwiXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBBZGFwdC5fY29udHJvbERpdlxuXG5cdFx0IyBEZXZpY2UgbGlzdCBkcm9wZG93blxuXHRcdEFkYXB0Ll9kZXZpY2VTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzZWxlY3RcIlxuXHRcdEFkYXB0Ll9kZXZpY2VTZWxlY3Rvci5zZXRBdHRyaWJ1dGUgXCJzdHlsZVwiLCBcImRpc3BsYXk6IGJsb2NrXCJcblx0XHRBZGFwdC5fY29udHJvbERpdi5hcHBlbmRDaGlsZCBBZGFwdC5fZGV2aWNlU2VsZWN0b3JcblxuXHRcdEFkYXB0Ll9kZXZpY2VTZWxlY3Rvci5vbmNoYW5nZSA9IC0+XG5cblx0XHRcdHJldHVybiBpZiBAdmFsdWUgaXMgXCJub25lXCJcblxuXHRcdFx0dmFycyA9IGdldFVybFZhcnMod2luZG93LmxvY2F0aW9uLmhyZWYpXG5cdFx0XHR2YXJzLmRldmljZVR5cGUgPSBAdmFsdWVcblxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBtYWtlVXJsU3RyaW5nKHZhcnMpXG5cblx0XHQjIERldmljZSByb3RhdGlvbiB0b2dnbGVcblx0XHRBZGFwdC5fcm90YXRlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImJ1dHRvblwiXG5cdFx0QWRhcHQuX3JvdGF0ZVRvZ2dsZS5zZXRBdHRyaWJ1dGUgXCJ0eXBlXCIsIFwiYnV0dG9uXCJcblx0XHRBZGFwdC5fcm90YXRlVG9nZ2xlLnNldEF0dHJpYnV0ZSBcInN0eWxlXCIsIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGNvbG9yOiAjMzMzOyBwYWRkaW5nOiAwLjVlbSAxZW07IGJvcmRlci1yYWRpdXM6IDNweFwiXG5cdFx0QWRhcHQuX3JvdGF0ZVRvZ2dsZS5pbm5lckhUTUwgPSBcIlJvdGF0ZVwiXG5cdFx0QWRhcHQuX2NvbnRyb2xEaXYuYXBwZW5kQ2hpbGQgQWRhcHQuX3JvdGF0ZVRvZ2dsZVxuXG5cdFx0QWRhcHQuX3JvdGF0ZVRvZ2dsZS5vbmNsaWNrID0gLT5cblxuXHRcdFx0dmFycyA9IGdldFVybFZhcnMoKVxuXG5cdFx0XHRpZiAhdmFycy5vcmllbnRhdGlvbiBvciB2YXJzLm9yaWVudGF0aW9uIGlzIFwiMFwiXG5cdFx0XHRcdHZhcnMub3JpZW50YXRpb24gPSBcIjkwXCJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR2YXJzLm9yaWVudGF0aW9uID0gXCIwXCJcblxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBtYWtlVXJsU3RyaW5nKHZhcnMpXG5cblxuXHQjIENsZWFyIGRldmljZSBsaXN0IGJlZm9yZSBwb3B1bGF0aW5nIGluIGNhc2UgaXQgYWxyZWFkeSBleGlzdHNcblx0QWRhcHQuX2RldmljZVNlbGVjdG9yLmlubmVySFRNTCA9IFwiXCJcblxuXHQjIExpc3QgaGVhZGVyXG5cdEFkYXB0Ll9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKFwiUGljayBkZXZpY2VcIilcblxuXHQjIEdlbmVyYXRlIGxpc3Rcblx0Zm9yIGdyb3VwLCBkZXZpY2VzIG9mIEFkYXB0Ll9kZXZpY2VMaXN0IHdoZW4gZGV2aWNlcy5fZXhjbHVkZUZyb21MaXN0IGlzbnQgdHJ1ZVxuXG5cdFx0QWRhcHQuX2RldmljZVNlbGVjdG9yLmFwcGVuZENoaWxkIG1ha2VPcHRpb24oXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcblx0XHRBZGFwdC5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihncm91cClcblx0XHRBZGFwdC5fZGV2aWNlU2VsZWN0b3IuYXBwZW5kQ2hpbGQgbWFrZU9wdGlvbihcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxuXG5cdFx0Zm9yIGRldmljZSwgYmFzZSBvZiBkZXZpY2VzIHdoZW4gZGV2aWNlIGlzbnQgXCJfZXhjbHVkZUZyb21MaXN0XCJcblx0XHRcdEFkYXB0Ll9kZXZpY2VTZWxlY3Rvci5hcHBlbmRDaGlsZCBtYWtlT3B0aW9uKGRldmljZSwgZGV2aWNlKVxuXG5cblxuIyBTZXQgQWRhcHQuX2RwciBhbmQgZ28gZnVsbCBzY3JlZW4gaWYgaXQncyBhIG5vbi1kZXNrdG9wIGRldmljZVxuQWRhcHQuaW5pdCA9IC0+XG5cblx0QWRhcHQuX2RwciA9IEFkYXB0Ll9nZXREcHIoKVxuXG5cdGlmIFV0aWxzLmlzRGVza3RvcCgpXG5cblx0XHRBZGFwdC5hZGREZXZpY2VTZWxlY3RvcigpXG5cblx0XHR1cmxWYXJzID0gZ2V0VXJsVmFycyh3aW5kb3cubG9jYXRpb24uaHJlZilcblxuXHRcdGlmIHVybFZhcnMuZGV2aWNlVHlwZT9cblx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IHVybFZhcnMuZGV2aWNlVHlwZVxuXG5cdFx0aWYgdXJsVmFycy5vcmllbnRhdGlvbj9cblx0XHRcdEZyYW1lci5EZXZpY2Uub3JpZW50YXRpb24gPSBwYXJzZUludCh1cmxWYXJzLm9yaWVudGF0aW9uKVxuXG5cblx0ZWxzZVxuXG5cdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcblxuXHR3aW5kb3cuZHAgPz0gQWRhcHQuZHBcblxuXG4jIENhbGN1bGF0ZSByZWFsIHBpeGVsIHZhbHVlIGZyb20gYSBkcCB2YWx1ZVxuQWRhcHQuZHAgPSAodmFsdWUpIC0+IHZhbHVlICogQWRhcHQuX2RwclxuXG5cbiMgSW5pdGlhbGl6ZVxuQWRhcHQuaW5pdCgpXG5cblxuZXhwb3J0cy5BZGFwdCA9IEFkYXB0IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURJQSxJQUFBOztBQUFBLFVBQUEsR0FBYSxTQUFBO0FBRVosTUFBQTtFQUFBLElBQUEsR0FBTztFQUVQLEtBQUEsR0FBUSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFyQixDQUE2Qix5QkFBN0IsRUFBd0QsU0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEtBQVQ7V0FDL0QsSUFBSyxDQUFBLEdBQUEsQ0FBTCxHQUFZO0VBRG1ELENBQXhEO0FBR1IsU0FBTztBQVBLOztBQVdiLGFBQUEsR0FBZ0IsU0FBQyxHQUFEO0FBRWYsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUVU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
