var ChallengeLog;

ChallengeLog = function() {
  this.queue = {};
  this.tryhard = [];
  this.startTime = 0.0;
  this.finishTime = 0.0;
  this.time = 0.0;
  this.listSkills = [];
  this.summary = new Summary({
    challengeLog: this
  });
};

ChallengeLog.prototype.clean = function() {
  this.queue = {};
  this.tryhard = [];
  this.startTime = -2;
  this.finishTime = 0.0;
  this.time = 0.0;
  this.listSkills = [];
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

ChallengeLog.prototype.setStatus = function(index, status) {
  this.listSkills[index].status = status;
  return this;
};

ChallengeLog.prototype.finish = function() {
  this.finishTime = (new Date()).getTime();
  this.time = (this.finishTime - this.startTime) / 1000;
  this.getSummary();
  return this;
};

ChallengeLog.prototype.getSummary = function() {
  var elem, i, len, result, time;
  i = 0;
  len = this.tryhard.length;
  while (i < len) {
    elem = this.tryhard[i].obj;
    time = (this.tryhard[i].time - this.startTime)/1000;
    result = {};
    result.srcImg = elem.srcImg;
    result.castTime = time;
    result.hitTime = time + elem.hitTime;
    result.duration = elem.duration + result.hitTime;
    result.status = false;
    this.listSkills.push(result);
    switch (elem.effect) {
      case 'invulnerable':
        this.summary.add({
          name: elem.name,
          effect: elem.effect,
          toggle: 1,
          time: result.hitTime,
          index: i
        });
        this.summary.add({
          name: elem.name,
          effect: elem.effect,
          toggle: -1,
          time: result.duration,
          index: i
        });
        break;
      default:
        this.summary.add({
          name: elem.name,
          effect: elem.effect,
          time: result.duration,
          damage: elem.endDurationDmg,
          index: i
        });
    }
    i++;
  }
  this.summary.generate();
  console.log('listSkills', this.listSkills);
  return this;
};

if (typeof exports !== 'undefined') {
  exports.ChallengeLog = ChallengeLog;
}
