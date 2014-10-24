Challenge = () ->
	this.wishSteps = []
	this.wishLength = 0
	this.steps = []
	this.expectedSteps = []
	this.currentStep = 0
	this.active = false
	this.timer = new Timer
	return

Challenge::set = (list)->
	this.timer.stop
	this.wishSteps = list
	this.wishLength = list.length
	this.expectedSteps = this.wishSteps.slice 0
	this.currentStep = 0
	this.steps = []
	this.active = false
	return this

Challenge::start = () ->
	this.timer.start()
	this.active = true
	return this

Challenge::stop = () ->
	this.timer.stop()
	console.log 'tiempo fue de', this.timer.time, ' s'
	this.active = false
	return this

Challenge::step = (skillUsed) ->
	if !this.active
		return this
	if this.expectedSteps.length and 
			this.expectedSteps[0] == skillUsed
		this.expectedSteps.shift()
		this.currentStep++
	if this.expectedSteps.length == 0
		this.stop()
	return this

if typeof exports isnt 'undefined'
	exports.Challenge = Challenge