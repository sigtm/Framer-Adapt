###

--------------------------------------------------------------------------------

This prototype does not do anything. I just use it to check if I've broken anything
by outputting a bunch of stuff to the console.

--------------------------------------------------------------------------------

###


# Require Adapt
# --------------------------------------------------------------------------------

{Adapt} = require "Adapt"


# Enable picker and exclude some stuff
# --------------------------------------------------------------------------------

Adapt.picker.enable()

Adapt.picker.exclude "Apple Watch"
Adapt.picker.exclude "Other"


# Exclude and re-include iPhones
# --------------------------------------------------------------------------------

Adapt.picker.exclude "iPhone"
Adapt.picker.include "iPhone"


# Simple tester
# --------------------------------------------------------------------------------

runTest = (opts = {}) ->
	
	_.defaults opts,
		name: "Test"
		showOutput: false
	
	return unless _.isFunction(opts.test)
	
	console.log "------------------------------------------------------------"
	console.log "TEST: " + opts.name
	console.log " "

	output = opts.test()
	
	if opts.match?

		console.log "Passed?"

		if _.isFunction(opts.match)
		
			matchOutput = opts.match()
	
			console.log matchOutput is output
	
		else

			console.log output is opts.match or output in opts.match		

		console.log " "

	if opts.showOutput

		console.log "Output:"
		console.log output

		console.log " "

	console.log " "



# Run some tests
# --------------------------------------------------------------------------------


runTest
	name: "check() without adding breakpoints"
	match: "other"
	showOutput: false
	test: Adapt.check



runTest
	name: "Setting breakpoints"
	test: ->
		Adapt.setBreakpoints
			small: 400
			medium: 600
			large: 1000



runTest
	name: "check() after adding breakpoints"
	match: ["small", "medium", "large", "other"]
	showOutput: false
	test: Adapt.check
		


runTest
	name: "Setting Adapt.columns"
	test: ->
	Adapt.columns =
		small: 2
		medium: 3
		large: 4
		other: 5



runTest
	name: "Attempting to overwrite setBreakpoints"
	test: ->
		Adapt.setBreakpoints = "test"
		
		

runTest
	name: "Attempting to overwrite check"
	test: -> Adapt.check = "test"



runTest
	name: "Attempting to overwrite _values"
	test: -> Adapt._values = "test"



runTest
	name: "Attempting to set evaluator to non-func"
	test: -> Adapt.evaluator = { foo: "bar" }



runTest
	name: "Check Adapt.columns"
	match: [1, 2, 3, 4, 5, 6]
	test: Adapt.columns



runTest
	name: "setting Screen.height based evaluator"
	test: ->
		Adapt.evaluator = ->
			if Screen.height < 700 then "small" else "large"


runTest
	name: "Adapt.check()"
	match: ["small", "medium", "large", "other"]
	test: Adapt.check



runTest
	name: "Adapt._values:"
	test: -> console.log Adapt._values