# Some basics
# --------------------------------------------------------------------------------

{Adapt} = require "Adapt"

Screen.backgroundColor = Color.mix("#66eeaa", "white", 0.5)
Canvas.backgroundColor = "#222"



# Enable picker and exclude some device types we don't want
# --------------------------------------------------------------------------------

Adapt.picker.enable()

Adapt.picker.exclude "Apple Watch"
Adapt.picker.exclude "Other"



# Set our breakpoints
# --------------------------------------------------------------------------------

Adapt.setBreakpoints
	small: 600
	medium: 800
	large: 1200



# Now we'll define some config for our UI
# --------------------------------------------------------------------------------

Adapt.columns =
	small: 1
	medium: 2
	large: 4
	other: 6

Adapt.gutter =
	small: 12
	medium: 24
	large: 36
	other: 48
	
Adapt.fontSize =
	small: 36
	medium: 64
	large: 96
	other: 128



# Draw the UI!
# --------------------------------------------------------------------------------

# Now we just use Adapt.columns, Adapt.fontSize, etc directly and it automatically
# returns just the correct value for the current breakpoint.


# Draw a column grid

colWidth = Screen.width - Adapt.gutter
colWidth /= Adapt.columns

for i in [0...Adapt.columns]

	column = new Layer
		x: (i * colWidth) + (Adapt.gutter / 2)
		width: colWidth
		height: Screen.height
		backgroundColor: "white"
		scaleX: 1 - (Adapt.gutter / colWidth)
	
	
		
# Add text layer

text = new TextLayer
	text: "#{Adapt.columns} column"
	fontSize: Adapt.fontSize
	color: "black"

text.text += "s" if Adapt.columns isnt 1

text.center()