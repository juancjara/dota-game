CountDown = (data) ->
	data = data or {}
	this.interval = null
	baseFun = () ->
		return
	this.onEnd = data.onFinish or baseFun
	this.time = data.time * 1000

CountDown::start = () ->
	self = this
	counter = 0
	this.interval = setInterval(
		() ->
			if counter ==  self.time
				self.onEnd()
				self.stop()
			console.log counter
			counter += 100
			return
		, 100)
	return

CountDown::stop = () ->
	clearInterval this.interval

if typeof exports isnt 'undefined'
	exports.CountDown = CountDown