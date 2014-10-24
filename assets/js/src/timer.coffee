Timer = () ->
  this.time = 0
  this.timeStart = 0

Timer::start = () ->
  this.timeStart = (new Date()).getTime()
  #self = this
  #console.log('gggggadsfasdfd');
  #this.interval = setInterval ()->
  #    self.time++;
  #    return
  #  , 1000
  return
  
Timer::stop = () ->
  timeEnd = (new Date()).getTime()
  this.time = (timeEnd - this.timeStart) / 1000
  #clearInterval this.interval
  #this.interval = null
  return