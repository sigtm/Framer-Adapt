# Require Adapt
# --------------------------------------------------------------------------------

{Adapt} = require "Adapt"



# Enable picker and exclude some stuff
# --------------------------------------------------------------------------------

Adapt.picker.enable()

Adapt.picker.exclude "Apple Watch"
Adapt.picker.exclude "Other"



# Set screen and canvas color
# --------------------------------------------------------------------------------

Canvas.backgroundColor = "#ddd"
Screen.backgroundColor = "white"



# Set our breakpoints
# --------------------------------------------------------------------------------

Adapt.setBreakpoints
	small: 600
	medium: 800
	large: 1200



# Now we'll define some parameters for our UI
# --------------------------------------------------------------------------------

Adapt.columns =
	small: 1
	medium: 2
	large: 4
	other: 6

Adapt.gutter =
	small: 6
	medium: 12
	large: 18
	other: 24

Adapt.text =
	small: "Tiny"
	medium: "Smallish"
	large: "Normal"
	other: "Huge!"
	
Adapt.fontSize =
	small: 48
	medium: 64
	large: 96
	other: 128



# Draw the UI!
# --------------------------------------------------------------------------------

# Now we just use Adapt.columns, Adapt.fontSize, etc directly and it automatically
# returns just the correct value for the current breakpoint.


# Draw a column grid

colWidth = Screen.width / Adapt.columns

for i in [0...Adapt.columns]

	column = new Layer
		x: i * colWidth
		width: colWidth
		height: Screen.height
		backgroundColor: ""
		opacity: 0.4
	
	inner = new Layer
		parent: column
		x: Adapt.gutter
		width: column.width - (Adapt.gutter * 2)
		height: column.height
		backgroundColor: "#0cb"
	
		
# Add text layer

text = new TextLayer
	text: Adapt.text
	fontSize: Adapt.fontSize
	fontWeight: "bold"
	textTransform: "uppercase"
	color: "#222"

text.center()


# We'll keep it simple and just refresh the prototype on resize

window.onresize = Utils.debounce 0.1, -> location.reload()
