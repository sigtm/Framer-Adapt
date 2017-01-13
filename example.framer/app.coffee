Canvas.backgroundColor = "#112"

{Adapt} = require "Adapt"

Adapt.exclude "Apple - Watch"


baseDevices = {}


for device, base of Adapt._getFlatDeviceList()

	base = base.replace /Hand$/g, ""
	
	baseDevices[base] ?= {}
	baseDevices[base].devices ?= []
	baseDevices[base].physical ?=
		width: DeviceComponent.Devices[device].screenWidth
		height: DeviceComponent.Devices[device].screenHeight
	
	if Adapt._dprList[base]
		baseDevices[base]["1x"] ?= 
			width: baseDevices[base].physical.width / Adapt._dprList[base]
			height: baseDevices[base].physical.height / Adapt._dprList[base]
	
	if not Adapt._dprList[base]
		print "Base device #{base} missing from dprList"
		
	baseDevices[base].devices.push device

console.log baseDevices