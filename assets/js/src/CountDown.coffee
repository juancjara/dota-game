CountDown = (data) ->
	data = data or {}
	this.interval = null
	baseFun = () ->
		return
	this.onEnd = data.onFinish or baseFun
	this.time = data.time * 1000
	this.showOnSeconds = data.showOnSeconds or baseFun
	return

CountDown::start = () ->
	self = this
	counter = this.time
	this.interval = setInterval(
		() ->
			if counter ==  0
				console.log('finish')
				self.onEnd()
				self.stop()
			else if counter % 1000 == 0
				self.showOnSeconds(counter/1000)
			console.log counter
			counter -= 100
			return
		, 100)
	return this

CountDown::stop = (onFinish) ->
	console.log('stop');
	clearInterval this.interval
	if onFinish
		onFinish()

if typeof exports isnt 'undefined'
	exports.CountDown = CountDown