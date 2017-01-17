# Framer-Adapt
A small module that helps you run a single prototype on multiple devices, independently of which device you picked in Framer Studio

### It gives you the following
1. Your prototype will run in full screen and native dimension on any non-desktop device
2. When viewing on desktop, you can change the device and orientation on the fly from the browser
3. A dp() function to always define sizes in 1x, with accurate devicePixelRatio values on any device
4. Adapt.width and Adapt.height always returns the screen dimensions in 1x, so you can set breakpoints and adapt your prototype based on screen size

### Examples

Import module:

```coffeescript
{Adapt} = require "Adapt"
```

Exclude device groups you don't need from the device list:

```coffeescript
Adapt.exclude "Apple - Watch"
Adapt.exclude "Other - Desktop & TV"
```

The `dp()` function is available as soon as you've required the Adapt module:

```coffeescript
myLayer = new Layer
	x: dp 12
	y: dp 12
	width: dp 200
	height: dp 200
```

Using `Adapt.width` to set the number of columns based on screen width:

```coffeescript
columns = switch
	when Adapt.width < 400 then 1
	when Adapt.width < 700 then 2
	when Adapt.width < 1000 then 3s
	else 4

for i in [0...columns]
	column = new Layer
		y: 10
		x: 10 + (i * Screen.width / columns)
		width: Screen.width / columns - 20
		height: Screen.height - 20
		backgroundColor: "#0ef"
```