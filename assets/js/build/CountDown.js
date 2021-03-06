var CountDown;

CountDown = function(data) {
  var baseFun;
  data = data || {};
  this.interval = null;
  baseFun = function() {};
  this.onEnd = data.onFinish || baseFun;
  this.time = data.time * 1000;
  this.showOnSeconds = data.showOnSeconds || baseFun;
};

CountDown.prototype.start = function() {
  var counter, self;
  self = this;
  counter = this.time;
  this.interval = setInterval(function() {
    if (counter === 0) {
      console.log('finish');
      self.onEnd();
      self.stop();
    } else if (counter % 1000 === 0) {
      self.showOnSeconds(counter / 1000);
    }
    counter -= 100;
  }, 100);
  return this;
};

CountDown.prototype.stop = function(onFinish) {
  console.log('stop');
  clearInterval(this.interval);
  if (onFinish) {
    return onFinish();
  }
};

if (typeof exports !== 'undefined') {
  exports.CountDown = CountDown;
}
