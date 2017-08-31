# Helpers
# --------------------------------------------------------------------------------

# Get the URL variables as an object
getUrlVars = () ->

	vars = {}

	parts = window.location.href.replace /[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) ->
		vars[key] = value

	return vars


# Make parameter string from object
makeUrlString = (obj) ->

	string = "?"

	for key, value of obj
		string += key + "=" + value + "&"

	string = string.slice(0, -1)

	return string


# Make option element
makeOption = (label, value = "none") ->

	opt = document.createElement "option"
	opt.setAttribute "value", value
	opt.innerHTML = label

	return opt


# Since Utils.isDesktop() doesn't seem to pick up everything (notably some Android devices)
isDesktop = ->

	if /(tablet)|(iPad)|(Nexus 9)|(mobi)|(Android)/i.test(navigator.userAgent)
		return false

	return true


# Device picker
# --------------------------------------------------------------------------------


Picker = {}


# Every device from Framer's DeviceComponent, with their corresponding base class
Picker._deviceList =

	"iPad":

		# iPad Air
		"apple-ipad-air-2-silver": "iPadAir2BaseDevice"
		"apple-ipad-air-2-gold": "iPadAir2BaseDevice"
		"apple-ipad-air-2-space-gray": "iPadAir2BaseDevice"

		# iPad Mini
		"apple-ipad-mini-4-silver": "iPadMini4BaseDevice"
		"apple-ipad-mini-4-gold": "iPadMini4BaseDevice"
		"apple-ipad-mini-4-space-gray": "iPadMini4BaseDevice"

		# iPad Pro
		"apple-ipad-pro-silver": "iPadProBaseDevice"
		"apple-ipad-pro-gold": "iPadProBaseDevice"
		"apple-ipad-pro-space-gray": "iPadProBaseDevice"

	"iPhone":
		
		# iPhone 7
		"apple-iphone-7-gold": "iPhone7BaseDevice"
		"apple-iphone-7-rose-gold": "iPhone7BaseDevice"
		"apple-iphone-7-silver": "iPhone7BaseDevice"
		"apple-iphone-7-black": "iPhone7BaseDevice"
		"apple-iphone-7-jet-black": "iPhone7BaseDevice"

		# iPhone 7 Plus
		"apple-iphone-7-plus-gold": "iPhone7PlusBaseDevice"
		"apple-iphone-7-plus-rose-gold": "iPhone7PlusBaseDevice"
		"apple-iphone-7-plus-silver": "iPhone7PlusBaseDevice"
		"apple-iphone-7-plus-black": "iPhone7PlusBaseDevice"
		"apple-iphone-7-plus-jet-black": "iPhone7PlusBaseDevice"

		# iPhone 6s
		"apple-iphone-6s-gold": "iPhone6BaseDevice"
		"apple-iphone-6s-rose-gold": "iPhone6BaseDevice"
		"apple-iphone-6s-silver": "iPhone6BaseDevice"
		"apple-iphone-6s-space-gray": "iPhone6BaseDevice"

		# iPhone 6s Plus
		"apple-iphone-6s-plus-gold": "iPhone6PlusBaseDevice"
		"apple-iphone-6s-plus-rose-gold": "iPhone6PlusBaseDevice"
		"apple-iphone-6s-plus-silver": "iPhone6PlusBaseDevice"
		"apple-iphone-6s-plus-space-gray": "iPhone6PlusBaseDevice"

		# iPhone 5S
		"apple-iphone-5s-gold": "iPhone5BaseDevice"
		"apple-iphone-5s-silver": "iPhone5BaseDevice"
		"apple-iphone-5s-space-gray": "iPhone5BaseDevice"

		# iPhone 5C
		"apple-iphone-5c-blue": "iPhone5CBaseDevice"
		"apple-iphone-5c-green": "iPhone5CBaseDevice"
		"apple-iphone-5c-red": "iPhone5CBaseDevice"
		"apple-iphone-5c-white": "iPhone5CBaseDevice"
		"apple-iphone-5c-yellow": "iPhone5CBaseDevice"

	"Apple Watch":
		
		# Apple Watch Series 2 38mm
		"apple-watch-series-2-38mm-black-steel-black": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-edition": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-rose-gold-aluminum-midnight-blue": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-cocoa": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-concrete": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-ocean-blue": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-red": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-turquoise": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-white": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-silver-aluminum-yellow": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-space-gray-aluminum-black": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-sport-aluminum-walnut": "AppleWatchSeries238Device"
		"apple-watch-series-2-38mm-steel-white": "AppleWatchSeries238Device"

		# Apple Watch Series 2 42mm
		"apple-watch-series-2-42mm-edition": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-gold-aluminum-cocoa": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-rose-gold-aluminum-midnight-blue": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-concrete": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-green": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-light-pink": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-ocean-blue": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-pink-sand": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-red": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-turquoise": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-white": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-silver-aluminum-yellow": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-space-black-steel-black": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-space-gray-aluminum-black": "AppleWatchSeries242Device"
		"apple-watch-series-2-42mm-steel-white": "AppleWatchSeries242Device"

		# Apple Watch Nike+ 38mm
		"apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt": "AppleWatchSeries238Device"
		"apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white": "AppleWatchSeries238Device"
		"apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray": "AppleWatchSeries238Device"
		"apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt": "AppleWatchSeries238Device"

		# Apple Watch Nike+ 42mm
		"apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt": "AppleWatchSeries242Device"
		"apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white": "AppleWatchSeries242Device"
		"apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray": "AppleWatchSeries242Device"
		"apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt": "AppleWatchSeries242Device"

		# Apple Watch 38mm

		"apple-watch-38mm-gold-black-leather-closed": "AppleWatch38BlackLeatherDevice"
		"apple-watch-38mm-rose-gold-black-leather-closed": "AppleWatch38BlackLeatherDevice"
		"apple-watch-38mm-stainless-steel-black-leather-closed": "AppleWatch38BlackLeatherDevice"

		"apple-watch-38mm-black-steel-black-closed": "AppleWatch38Device"
		"apple-watch-38mm-gold-midnight-blue-closed": "AppleWatch38Device"
		"apple-watch-38mm-rose-gold-lavender-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-blue-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-fog-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-green-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-red-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-walnut-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-white-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-gold-antique-white-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-aluminum-rose-gold-stone-closed": "AppleWatch38Device"
		"apple-watch-38mm-sport-space-gray-black-closed": "AppleWatch38Device"

		# Apple Watch 42mm
		"apple-watch-42mm-black-steel-black-closed": "AppleWatch42Device"
		"apple-watch-42mm-gold-black-leather-closed": "AppleWatch42Device"
		"apple-watch-42mm-gold-midnight-blue-closed": "AppleWatch42Device"
		"apple-watch-42mm-rose-gold-black-leather-closed": "AppleWatch42Device"
		"apple-watch-42mm-rose-gold-lavender-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-blue-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-fog-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-green-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-red-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-walnut-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-white-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-gold-antique-white-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-aluminum-rose-gold-stone-closed": "AppleWatch42Device"
		"apple-watch-42mm-sport-space-gray-black-closed": "AppleWatch42Device"
		"apple-watch-42mm-stainless-steel-black-leather-closed": "AppleWatch42Device"

	"Google":
		
		# NEXUS
		"google-nexus-4": "Nexus4BaseDevice"
		"google-nexus-5x": "Nexus5BaseDevice"
		"google-nexus-6p": "Nexus6BaseDevice"
		"google-nexus-9": "Nexus9BaseDevice"

		# Pixel
		"google-pixel-quite-black": "PixelBaseDevice"
		"google-pixel-really-blue": "PixelBaseDevice"
		"google-pixel-very-silver": "PixelBaseDevice"
	
	"Misc handheld":

		# HTC ONE A9
		"htc-one-a9-black": "HTCa9BaseDevice"
		"htc-one-a9-white": "HTCa9BaseDevice"

		# HTC ONE M8
		"htc-one-m8-black": "HTCm8BaseDevice"
		"htc-one-m8-gold": "HTCm8BaseDevice"
		"htc-one-m8-silver": "HTCm8BaseDevice"

		# MICROSOFT LUMIA 950
		"microsoft-lumia-950-black": "MSFTLumia950BaseDevice"
		"microsoft-lumia-950-white": "MSFTLumia950BaseDevice"

		# SAMSUNG NOTE 5
		"samsung-galaxy-note-5-black": "SamsungGalaxyNote5BaseDevice"
		"samsung-galaxy-note-5-gold": "SamsungGalaxyNote5BaseDevice"
		"samsung-galaxy-note-5-pink": "SamsungGalaxyNote5BaseDevice"
		"samsung-galaxy-note-5-silver-titanium": "SamsungGalaxyNote5BaseDevice"
		"samsung-galaxy-note-5-white": "SamsungGalaxyNote5BaseDevice"
	
	"Other":

		# Notebooks
		"apple-macbook": "AppleMacBook"
		"apple-macbook-air": "AppleMacBookAir"
		"apple-macbook-pro": "AppleMacBookPro"
		"dell-xps": "DellXPS"

		# Desktops
		"apple-imac": "AppleIMac"

		# TV
		"sony-w85Oc": "SonyW85OC"

		# Fullscreen
		# "fullscreen": true



# Exclude device group from list
Picker.exclude = (group = "") ->

	for key, value of Picker._deviceList

		if group.toLowerCase() is key.toLowerCase()

			value._excludeFromList = true

	Picker.enable()



# Reinclude an excluded device group in list
Picker.include = (group = "") ->

	for key, value of Picker._deviceList

		if group.toLowerCase() is key.toLowerCase()

			match = value._excludeFromList = false

	Picker.enable()



# Add dropdown for selecting a different device
Picker.enable = ->

	return if window.FramerStudio or not isDesktop() or Framer.Device.deviceType is "fullscreen"

	if not Picker._controlDiv

		# DIV to contain the device controls
		Picker._controlDiv = document.createElement "div"
		Picker._controlDiv.setAttribute "style", "position: absolute; top: 10px; right: 10px; z-index: 9999; text-align: right"
		document.body.appendChild Picker._controlDiv

		# Device list dropdown
		Picker._deviceSelector = document.createElement "select"
		Picker._deviceSelector.setAttribute "style", "display: block"
		Picker._controlDiv.appendChild Picker._deviceSelector

		Picker._deviceSelector.onchange = ->

			return if @value is "none"

			vars = getUrlVars(window.location.href)
			vars.deviceType = @value

			window.location.href = window.location.href.split("?")[0] + makeUrlString(vars)

		# Device rotation toggle
		Picker._rotateToggle = document.createElement "button"
		Picker._rotateToggle.setAttribute "type", "button"
		Picker._rotateToggle.setAttribute "style", "background-color: white; color: #333; padding: 0.5em 1em; border-radius: 3px"
		Picker._rotateToggle.innerHTML = "Rotate"
		Picker._controlDiv.appendChild Picker._rotateToggle

		Picker._rotateToggle.onclick = ->

			vars = getUrlVars()

			if !vars.orientation or vars.orientation is "0"
				vars.orientation = "90"

			else
				vars.orientation = "0"

			window.location.href = window.location.href.split("?")[0] + makeUrlString(vars)


	# Clear device list before populating in case it already exists
	Picker._deviceSelector.innerHTML = ""

	# List header
	Picker._deviceSelector.appendChild makeOption("Pick device")

	# Generate list
	for group, devices of Picker._deviceList when devices._excludeFromList isnt true

		Picker._deviceSelector.appendChild makeOption(" ")
		Picker._deviceSelector.appendChild makeOption("# " + group)
		Picker._deviceSelector.appendChild makeOption(" ")

		for device, base of devices when device isnt "_excludeFromList"
			Picker._deviceSelector.appendChild makeOption(device, device)



# Dstroy dropdown if it exists
Picker.disable = ->

	if Picker._controlDiv

		document.body.removeChild Picker._controlDiv

		Picker._controlDiv = null



# Base object which Adapt proxies
# --------------------------------------------------------------------------------



base = {}




# This is the evaluator function used by Adapt.check() to see which breakpoint
# to apply. If it doesn't return a string, Adapt.check() will return "other".
#
# Adapt.setBreakpoints() overwrites this to return a breakpoint based on
# Screen.width.
#
# You can overwrite it with your own evaluator function with your own custom
# criteria if you like.
#
base.evaluator = ->
	return null



# Set breakpoints based on max screen width:
#
# Adapt.setBreakpoints
#	small: 400
#	medium: 600
#	large: 1000
#
# You can now save any variable you want as a set of values, one per breakpoint:
#
# Adapt.columns =
#	small: 1
#	medium: 2
#	large: 4
#	other: 5
#
# Now when you use Adapt.columns in your prototype, it will only return the
# correct value based on the screen width:
#
# print Adapt.columns
#
# This prints "1" on an iPhone 7, for example
# 
base.setBreakpoints = (breakpoints = {}) ->
	
	bpArray = []
	
	for name, value of breakpoints
	
		bpArray.push
			name: name
			value: value
	
	# Sort in descending order
	bpArray.sort (a, b) -> b.value - a.value
	
	# Write a function for Adapt.evaluator() that checks against Screen.width
	base.evaluator = ->
		
		result = null
		
		for bp in bpArray
		
			if Screen.width <= bp.value
				result = bp.name
		
		return result
		

		
# This returns the current breakpoint, or "other" if the evaluator
# doesn't return a breakpoint name.
#
base.check = ->
	
	key = base.evaluator()
	
	if not key or typeof key isnt "string"
		key = "other"
	
	return key



# Add device picker
#
base.picker = Picker



# Property to hold all user defined values
base._values = {}



# Init function
#
base.init = ->

	if isDesktop()

		urlVars = getUrlVars()

		if urlVars.deviceType?
			Framer.Device.deviceType = urlVars.deviceType

		if urlVars.orientation?
			Framer.Device.orientation = parseInt(urlVars.orientation)


	else

		Framer.Device.deviceType = "fullscreen"




# Create Adapt proxy
# --------------------------------------------------------------------------------



# Store all existing property keys of base object, to catch them in the setter.
# Except the evaluator function, as you may overwrite it
#
readOnlyPropeties = []

for key, value of base when key isnt "evaluator"
	readOnlyPropeties.push key



# Proxy handler object

handler =
	
	set: (target, prop, value) ->

		# The evaluator is the only existing property you can overwrite
		if prop is "evaluator"

			# ...but only with another function
			if not _.isFunction(value)
				console.log "Adapt.evaluator has to be a function"

			else
				target[prop] = value


		# Read-only properties
		else if prop in readOnlyPropeties
			console.log "Can't overwrite Adapt." + prop

		else

			target._values[prop] = value

	
	get: (target, prop, receiver) ->
		
		if target._values?[prop]

			return target._values[prop][target.check()] or target._values[prop]
		
		else
			
			return target[prop]



# Create proxy
Adapt = new Proxy(base, handler)



# Initialize
Adapt.init()


exports.Adapt = Adapt