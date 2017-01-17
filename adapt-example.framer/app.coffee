# Import Adapt
# --------------------------------------------------------------------------------

{Adapt} = require "Adapt"


# Exclude a couple device groups we don't need
# --------------------------------------------------------------------------------

Adapt.exclude "Apple - Watch"
Adapt.exclude "Other - Desktop & TV"


# For fun and debugging, console.log() an object listing all the base devices
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

# Colors

accentColor = "#6ea"
darkColor = "#222"

# Some basics

Framer.Defaults.Layer =
	backgroundColor: ""

Screen.backgroundColor = "white"
Canvas.backgroundColor = darkColor

# Scroll component

scroll = new ScrollComponent
	size: Screen.size
	scrollHorizontal: false

# Header

header = new Layer
	parent: scroll.content
	height: dp 200
	backgroundColor: accentColor

header.fakeText = new Layer
	parent: header
	size: dp(48)
	rotation: 45
	borderColor: "white"
	borderWidth: dp(3)

# Make list

list = []

for i in [0...40]

	item = new Layer
		parent: scroll.content
	
	item.thumbnail = new Layer
		parent: item
		backgroundColor: accentColor
	
	item.fakeText = new Layer
		parent: item
		backgroundColor: darkColor
		height: dp(3)
	
	list.push item

# Create the layout based on screen size

updateLayout = ->
	
	# Device sensitive
	
	size = switch
		when Adapt.width < 400 then "small"
		when Adapt.width < 650 then "medium"
		when Adapt.width < 1000 then "large"
		else "xlarge"

	margin = switch size
		when "small" then dp 20
		when "medium" then dp 24
		when "large" then dp 32
		when "xlarge" then dp 60
	
	columns = switch size
		when "small", "medium" then 1
		when "large" then 2
		when "xlarge" then 3
	
	itemHeight = if size is "small" then dp(60) else dp(80)
	
	# Universal
	
	header.width = Screen.width
	header.fakeText.center()
	
	for item, i in list
	
		item.props =
			x: (i % columns) * (Screen.width / columns)
			y: dp(80) * Math.floor(i / columns) + (header.maxY + margin)
			width: Screen.width / columns
			height: itemHeight
		
		item.thumbnail.props =
			x: margin
			size: itemHeight / 6
			borderRadius: itemHeight / 12
		
		item.fakeText.props =
			x: item.thumbnail.maxX + (item.thumbnail.width * 2)
			width: Math.random() * dp(80) + dp(100)
		
		item.thumbnail.centerY()
		item.fakeText.centerY()
	
	scroll.updateContent()
	scroll.size = Screen.size

updateLayout()

# Make sure to re-init Adapt when the screen size changes
window.addEventListener "resize", ->
	Adapt.init()
	updateLayout()