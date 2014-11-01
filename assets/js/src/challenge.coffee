Challenge = () ->
	this.wishSteps = []
	this.wishLength = 0
	this.steps = []
	this.currentStep = 0
	this.active = false
	this.isOver = false
	this.timer = new Timer
	return

Challenge::set = (list)->
	this.timer.stop
	i = 0
	this.wishSteps = []
	while i < list.length
		actualElm = list[i]
		this.wishSteps.push({
			name:	actualElm.name,
			srcImg: actualElm.srcImg,
			done: false
		})
		i++

	this.wishLength = list.length
	this.currentStep = 0
	this.steps = []
	this.active = false
	return this

Challenge::start = () ->
	this.clean()
	this.timer.start()
	this.active = true
	this.isOver = false
	return this

Challenge::clean = () ->
	this.currentStep = 0
	i = 0
	while i < this.wishSteps.length
		this.wishSteps[i].done = false
		i++
	return this

Challenge::stop = () ->
	
	if this.active
		this.finish()
	else
		this.isOver = false
	return this

Challenge::finish = () ->
	this.timer.stop()
	this.isOver = true
	console.log 'tiempo fue de', this.timer.time, ' s'
	this.active = false
	return this

Challenge::step = (skillUsed) ->
	if !this.active
		return this
	if this.wishSteps.length > this.currentStep and 
			this.wishSteps[this.currentStep].name == skillUsed
		this.wishSteps[this.currentStep].done = true
		this.currentStep++
	if this.wishSteps.length == this.currentStep
		this.finish()
	return this

if typeof exports isnt 'undefined'
	exports.Challenge = Challenge