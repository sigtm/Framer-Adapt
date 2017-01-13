# Helpers
# --------------------------------------------------------------------------------

# Get the URL variables as an object
getUrlVars = () ->

	vars = {}

	parts = window.location.href.replace /[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) ->
		vars[key] = value

	return vars


# Get the URL variables as an object
makeUrlString = (obj) ->

	string = "?"

	for key, value of obj
		string += key + "=" + value + "&"

	string = string.slice(0, -1)

	return string

# Flatten object (returns clone)
flattenObject = (obj) ->

	flat = {}

	for key, value of obj

		if _.isPlainObject(value)

			for subkey, subvalue of value

				flat[subkey] = subvalue

		else

			flat[key] = value

	return flat

# Make option element
makeOption = (label, value = "none") ->

	opt = document.createElement "option"
	opt.setAttribute "value", value
	opt.innerHTML = label

	return opt



# Adapt
# --------------------------------------------------------------------------------


Adapt = {}
Adapt.dpr = null
Adapt.width = null
Adapt.height = null


# Every device from Framer's DeviceComponent, with their corresponding base class
Adapt._deviceList =
	
	"Apple - iPad":

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

	"Apple - iPhone":
		
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

	"Apple - Watch":
		
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
	
	"Other - Handheld":

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
	
	"Other - Desktop & TV":

		# Notebooks
		"apple-macbook": "AppleMacBook"
		"apple-macbook-air": "AppleMacBookAir"
		"apple-macbook-pro": "AppleMacBookPro"
		"dell-xps": "DellXPS"
		
		# Desktops
		"apple-imac": "AppleIMac"
		
		# TV
		"sony-w85Oc": "SonyW85OC"
		
		# OLD DEVICES

		# # iPhone 6
		# "iphone-6-spacegray": "old_iPhone6BaseDevice"
		# "iphone-6-spacegray-hand": "old_iPhone6BaseDeviceHand"
		# "iphone-6-silver": "old_iPhone6BaseDevice"
		# "iphone-6-silver-hand": "old_iPhone6BaseDeviceHand"
		# "iphone-6-gold": "old_iPhone6BaseDevice"
		# "iphone-6-gold-hand": "old_iPhone6BaseDeviceHand"
		
		# # iPhone 6+
		# "iphone-6plus-spacegray": "old_iPhone6PlusBaseDevice"
		# "iphone-6plus-spacegray-hand": "old_iPhone6PlusBaseDeviceHand"
		# "iphone-6plus-silver": "old_iPhone6PlusBaseDevice"
		# "iphone-6plus-silver-hand": "old_iPhone6PlusBaseDeviceHand"
		# "iphone-6plus-gold": "old_iPhone6PlusBaseDevice"
		# "iphone-6plus-gold-hand": "old_iPhone6PlusBaseDeviceHand"
		
		# # iPhone 5S
		# "iphone-5s-spacegray": "old_iPhone5BaseDevice"
		# "iphone-5s-spacegray-hand": "old_iPhone5BaseDeviceHand"
		# "iphone-5s-silver": "old_iPhone5BaseDevice"
		# "iphone-5s-silver-hand": "old_iPhone5BaseDeviceHand"
		# "iphone-5s-gold": "old_iPhone5BaseDevice"
		# "iphone-5s-gold-hand": "old_iPhone5BaseDeviceHand"
		
		# # iPhone 5C
		# "iphone-5c-green": "old_iPhone5CBaseDevice"
		# "iphone-5c-green-hand": "old_iPhone5CBaseDeviceHand"
		# "iphone-5c-blue": "old_iPhone5CBaseDevice"
		# "iphone-5c-blue-hand": "old_iPhone5CBaseDeviceHand"
		# "iphone-5c-pink": "old_iPhone5CBaseDevice"
		# "iphone-5c-pink-hand": "old_iPhone5CBaseDeviceHand"
		# "iphone-5c-white": "old_iPhone5CBaseDevice"
		# "iphone-5c-white-hand": "old_iPhone5CBaseDeviceHand"
		# "iphone-5c-yellow": "old_iPhone5CBaseDevice"
		# "iphone-5c-yellow-hand": "old_iPhone5CBaseDeviceHand"
		
		# # iPad Mini
		# "ipad-mini-spacegray": "old_iPadMiniBaseDevice"
		# "ipad-mini-spacegray-hand": "old_iPadMiniBaseDeviceHand"
		# "ipad-mini-silver": "old_iPadMiniBaseDevice"
		# "ipad-mini-silver-hand": "old_iPadMiniBaseDeviceHand"
		
		# # iPad Air
		# "ipad-air-spacegray": "old_iPadAirBaseDevice"
		# "ipad-air-spacegray-hand": "old_iPadAirBaseDeviceHand"
		# "ipad-air-silver": "old_iPadAirBaseDevice"
		# "ipad-air-silver-hand": "old_iPadAirBaseDeviceHand"
		
		# # Nexus 5
		# "nexus-5-black": "old_Nexus5BaseDevice"
		# "nexus-5-black-hand": "old_Nexus5BaseDeviceHand"
		
		# # Nexus 9
		# "nexus-9": "old_Nexus9BaseDevice"
		
		# # Apple Watch 38mm
		# "applewatchsport-38-aluminum-sportband-black": "old_AppleWatch38Device"
		# "applewatchsport-38-aluminum-sportband-blue": "old_AppleWatch38Device"
		# "applewatchsport-38-aluminum-sportband-green": "old_AppleWatch38Device"
		# "applewatchsport-38-aluminum-sportband-pink": "old_AppleWatch38Device"
		# "applewatchsport-38-aluminum-sportband-white": "old_AppleWatch38Device"
		# "applewatch-38-black-bracelet": "old_AppleWatch38Device"
		# "applewatch-38-steel-bracelet": "old_AppleWatch38Device"
		# "applewatchedition-38-gold-buckle-blue": "old_AppleWatch38Device"
		# "applewatchedition-38-gold-buckle-gray": "old_AppleWatch38Device"
		# "applewatchedition-38-gold-buckle-red": "old_AppleWatch38Device"
		# "applewatchedition-38-gold-sportband-black": "old_AppleWatch38Device"
		# "applewatchedition-38-gold-sportband-white": "old_AppleWatch38Device"
		
		# # Apple Watch 42mm
		# "applewatchsport-42-aluminum-sportband-black": "old_AppleWatch42Device"
		# "applewatchsport-42-aluminum-sportband-blue": "old_AppleWatch42Device"
		# "applewatchsport-42-aluminum-sportband-green": "old_AppleWatch42Device"
		# "applewatchsport-42-aluminum-sportband-pink": "old_AppleWatch42Device"
		# "applewatchsport-42-aluminum-sportband-white": "old_AppleWatch42Device"
		# "applewatch-42-black-bracelet": "old_AppleWatch42Device"
		# "applewatch-42-steel-bracelet": "old_AppleWatch42Device"
		# "applewatchedition-42-gold-buckle-blue": "old_AppleWatch42Device"
		# "applewatchedition-42-gold-buckle-gray": "old_AppleWatch42Device"
		# "applewatchedition-42-gold-buckle-red": "old_AppleWatch42Device"
		# "applewatchedition-42-gold-sportband-black": "old_AppleWatch42Device"
		# "applewatchedition-42-gold-sportband-white": "old_AppleWatch42Device"


# The exact dpr of every base device in Framer (excluding -Hand duplicates)
Adapt._dprList =

	AppleIMac: 1 # Unconfirmed

	AppleMacBook: 2 # Unconfirmed

	AppleMacBookPro: 2 # Unconfirmed

	AppleMacBookAir: 1 # Unconfirmed

	AppleWatch38BlackLeatherDevice: 2

	AppleWatch38Device: 2

	AppleWatch42Device: 2

	AppleWatchSeries238Device: 2

	AppleWatchSeries242Device: 2

	DellXPS: 3 # Unconfirmed

	HTCa9BaseDevice: 3

	HTCm8BaseDevice: 3

	MSFTLumia950BaseDevice: 3.5 # Unconfirmed

	Nexus4BaseDevice: 2

	Nexus5BaseDevice: 1080 / 411

	Nexus6BaseDevice: 1440 / 411

	Nexus9BaseDevice: 2

	PixelBaseDevice: 1080 / 411

	SamsungGalaxyNote5BaseDevice: 3 # Unconfirmed

	SonyW85OC: 1

	iPadAir2BaseDevice: 2

	iPadMini4BaseDevice: 2

	iPadProBaseDevice: 2

	iPhone5BaseDevice: 2

	iPhone5CBaseDevice: 2

	iPhone6BaseDevice: 2

	iPhone6PlusBaseDevice: 3

	iPhone7BaseDevice: 2

	iPhone7PlusBaseDevice: 3

	# old_AppleWatch38Device: 2

	# old_AppleWatch42Device: 2

	# old_Nexus5BaseDevice: 3

	# old_Nexus9BaseDevice: 2

	# old_iPadAirBaseDevice: 2

	# old_iPadMiniBaseDevice: 1

	# old_iPhone5BaseDevice: 2

	# old_iPhone5CBaseDevice: 2

	# old_iPhone6BaseDevice: 2

	# old_iPhone6PlusBaseDevice: 3


# Get the device list without device groups
Adapt._getFlatDeviceList = -> 
	flat = flattenObject(Adapt._deviceList)
	delete flat._excludeFromList
	return flat


# Get the dpr value for the virtual device if desktop, or actual device if not desktop
Adapt._getDpr = ->

	deviceList = Adapt._getFlatDeviceList()

	dprList = Adapt._dprList

	if Utils.isDesktop()

		dt = Framer.Device.deviceType

		if deviceList[dt]

			base = deviceList[dt].replace /Hand$/g, ""

			if dprList[base]

				return dprList[base]

			else

				console.log "Adapt: No dpr specified for base device"

				return 1

		else

			console.log "Adapt: deviceType not in deviceList"

			return 1

	else

		return window.devicePixelRatio


# Exclude device group from list
Adapt.exclude = (group) ->

	if Adapt._deviceList[group]

		Adapt._deviceList[group]._excludeFromList = true
		Adapt.addDeviceSelector()

	else
		console.log "Adapt: Can't exclude '#{group}', no group by that name"


# Reinclude an excluded device group in list
Adapt.unexclude = (group) ->

	if Adapt._deviceList[group]

		Adapt._deviceList[group]._excludeFromList = false
		Adapt.addDeviceSelector()

	else
		console.log "Adapt: Can't unexclude '#{group}', no group by that name"


# Add dropdown for selecting a different device
Adapt.addDeviceSelector = ->

	return if not Utils.isDesktop()

	if not Adapt._controlDiv

		# DIV to contain the device controls
		Adapt._controlDiv = document.createElement "div"
		Adapt._controlDiv.setAttribute "style", "position: absolute; top: 10px; right: 10px; z-index: 9999; text-align: right"
		document.body.appendChild Adapt._controlDiv

		# Device list dropdown
		Adapt._deviceSelector = document.createElement "select"
		Adapt._deviceSelector.setAttribute "style", "display: block"
		Adapt._controlDiv.appendChild Adapt._deviceSelector

		Adapt._deviceSelector.onchange = ->

			return if @value is "none"

			vars = getUrlVars(window.location.href)
			vars.deviceType = @value

			window.location.href = window.location.href.split("?")[0] + makeUrlString(vars)

		# Device rotation toggle
		Adapt._rotateToggle = document.createElement "button"
		Adapt._rotateToggle.setAttribute "type", "button"
		Adapt._rotateToggle.setAttribute "style", "background-color: white; color: #333; padding: 0.5em 1em; border-radius: 3px"
		Adapt._rotateToggle.innerHTML = "Rotate"
		Adapt._controlDiv.appendChild Adapt._rotateToggle

		Adapt._rotateToggle.onclick = ->

			vars = getUrlVars()

			if !vars.orientation or vars.orientation is "0"
				vars.orientation = "90"

			else
				vars.orientation = "0"

			window.location.href = window.location.href.split("?")[0] + makeUrlString(vars)


	# Clear device list before populating in case it already exists
	Adapt._deviceSelector.innerHTML = ""

	# List header
	Adapt._deviceSelector.appendChild makeOption("Pick device")

	# Generate list
	for group, devices of Adapt._deviceList when devices._excludeFromList isnt true

		Adapt._deviceSelector.appendChild makeOption("------------------------")
		Adapt._deviceSelector.appendChild makeOption(group)
		Adapt._deviceSelector.appendChild makeOption("------------------------")

		for device, base of devices when device isnt "_excludeFromList"
			Adapt._deviceSelector.appendChild makeOption(device, device)



# Set Adapt._dpr and go full screen if it's a non-desktop device
Adapt.init = ->

	if Utils.isDesktop()

		Adapt.addDeviceSelector()

		urlVars = getUrlVars()

		if urlVars.deviceType?
			Framer.Device.deviceType = urlVars.deviceType

		if urlVars.orientation?
			Framer.Device.orientation = parseInt(urlVars.orientation)


	else

		Framer.Device.deviceType = "fullscreen"

	Adapt.dpr = Adapt._getDpr()
	Adapt.width = Screen.width / Adapt.dpr
	Adapt.height = Screen.height / Adapt.dpr

	window.dp ?= Adapt.dp


# Calculate real pixel value from a dp value
Adapt.dp = (value) -> value * Adapt.dpr


# Initialize
Adapt.init()


exports.Adapt = Adapt