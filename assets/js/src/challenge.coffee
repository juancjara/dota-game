Challenge = () ->
	this.wishSteps = []
	this.wishLength = 0
	this.steps = []
	this.expectedSteps = []
	this.currentStep = 0
	this.active = false
	this.finish = false
	this.timer = new Timer
	return

Challenge::set = (list)->
	this.timer.stop
	i = 0
	this.wishSteps = []
	this.expectedSteps = []
	while i < list.length
		actualElm = list[i]
		this.wishSteps.push({
			name:	actualElm.name,
			srcImg: actualElm.srcImg,
			done: false
		})
		this.expectedSteps.push(actualElm.name)
		i++

	this.wishLength = list.length
	this.currentStep = 0
	this.steps = []
	this.active = false
	return this

Challenge::start = () ->
	this.timer.start()
	this.active = true
	this.finish = false
	return this

Challenge::stop = () ->
	this.timer.stop()
	this.finish = true
	console.log 'tiempo fue de', this.timer.time, ' s'
	this.active = false
	return this

Challenge::step = (skillUsed) ->
	console.log('skillUsed', skillUsed)
	if !this.active
		return this
	if this.expectedSteps.length and 
			this.expectedSteps[0] == skillUsed
		console.log('correcto')
		this.expectedSteps.shift()
		this.wishSteps[this.currentStep].done = true
		this.currentStep++
	if this.expectedSteps.length == 0
		this.stop()
	return this

if typeof exports isnt 'undefined'
	exports.Challenge = Challenge