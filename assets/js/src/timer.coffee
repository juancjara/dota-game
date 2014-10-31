Timer = () ->
  this.time = 0
  this.timeStart = 0

Timer::start = () ->
  this.timeStart = (new Date()).getTime()
  return
  
Timer::stop = () ->
  timeEnd = (new Date()).getTime()
  this.time = (timeEnd - this.timeStart) / 1000
  return