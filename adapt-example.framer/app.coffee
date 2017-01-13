# Import Adapt
# --------------------------------------------------------------------------------

{Adapt} = require "Adapt"


# Exclude a couple device groups we don't need
# --------------------------------------------------------------------------------

Adapt.exclude "Apple - Watch"
Adapt.exclude "Other - Desktop & TV"


# For fun and debugging, create an object listing all the base devices
# --------------------------------------------------------------------------------

baseDevices = {}

for device, base of Adapt._getFlatDeviceList()

	base = base.replace /Hand$/g, ""
	
	baseDevices[base] ?= {}
	baseDevices[base].devices ?= []
	baseDevices[base].screenSize ?=
		width: DeviceComponent.Devices[device].screenWidth
		height: DeviceComponent.Devices[device].screenHeight
	
	if Adapt._dprList[base]
		baseDevices[base].screenSizeAt1x ?= 
			width: baseDevices[base].screenSize.width / Adapt._dprList[base]
			height: baseDevices[base].screenSize.height / Adapt._dprList[base]
	
	if not Adapt._dprList[base]
		console.log "Adapt: Oops, the base device '#{base}' is missing from the dpr list"
		
	baseDevices[base].devices.push device

console.log baseDevices


# A simple example of an adaptive layout
# --------------------------------------------------------------------------------
# Adapt.width / Adapt.height is always the screen's width/height @1x

columns = switch
	when Adapt.width < 400 then 1
	when Adapt.width < 700 then 2
	when Adapt.width < 1000 then 3
	else 4

for i in [0...columns]
	column = new Layer
		y: 10
		x: 10 + (i * Screen.width / columns)
		width: Screen.width / columns - 20
		height: Screen.height - 20
		backgroundColor: "#0ef"