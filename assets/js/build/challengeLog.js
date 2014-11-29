var ChallengeLog;

ChallengeLog = function() {
  this.queue = {};
  this.tryhard = [];
  this.startTime = 0.0;
  this.finishTime = 0.0;
  this.time = 0.0;
  this.summary = [];
};

ChallengeLog.prototype.clean = function() {
  this.queue = {};
  this.tryhard = [];
  this.startTime = 0.0;
  this.finishTime = 0.0;
  this.time = 0.0;
  this.summary = [];
  return this;
};

ChallengeLog.prototype.start = function() {
  this.clean();
  this.startTime = (new Date()).getTime();
  return this;
};

ChallengeLog.prototype.add = function(obj) {
  this.tryhard.push({
    obj: obj,
    time: (new Date()).getTime()
  });
  return this;
};

ChallengeLog.prototype.finish = function() {
  var elem, i, len, result, time;
  i = 0;
  this.finishTime = (new Date()).getTime();
  this.time = (this.finishTime - this.startTime) / 1000;
  len = this.tryhard.length;
  while (i < len) {
    elem = this.tryhard[i].obj;
    time = (this.tryhard[i].time - this.startTime) / 1000;
    result = {};
    result.srcImg = elem.srcImg;
    result.castTime = time;
    result.hitTime = time + elem.hitTime;
    result.duration = elem.duration + result.hitTime;
    result.success = true;
    this.summary.push(result);
    i++;
  }
  console.log(this.summary);
  return this;
};

if (typeof exports !== 'undefined') {
  exports.ChallengeLog = ChallengeLog;
}
