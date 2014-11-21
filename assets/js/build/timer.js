var Timer;

Timer = function() {
  this.time = 0;
  return this.timeStart = 0;
};

Timer.prototype.start = function() {
  this.timeStart = (new Date()).getTime();
};

Timer.prototype.stop = function() {
  var timeEnd;
  timeEnd = (new Date()).getTime();
  this.time = (timeEnd - this.timeStart) / 1000;
};
