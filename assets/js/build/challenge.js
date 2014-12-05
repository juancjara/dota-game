var Challenge;

Challenge = function() {
  this.wishSteps = [];
  this.wishLength = 0;
  this.steps = [];
  this.currentStep = 0;
  this.active = false;
  this.isOver = false;
  this.challengeLog = new ChallengeLog();
};

Challenge.prototype.set = function(list) {
  var actualElm, i;
  this.challengeLog.finish;
  i = 0;
  this.wishSteps = [];
  while (i < list.length) {
    actualElm = list[i];
    this.wishSteps.push({
      name: actualElm.name,
      srcImg: actualElm.srcImg,
      done: false
    });
    i++;
  }
  this.wishLength = list.length;
  this.currentStep = 0;
  this.steps = [];
  this.active = false;
  return this;
};

Challenge.prototype.start = function() {
  this.clean();
  this.challengeLog.start();
  this.active = true;
  this.isOver = false;
  return this;
};

Challenge.prototype.clean = function() {
  var i;
  this.currentStep = 0;
  this.challengeLog.clean();
  i = 0;
  while (i < this.wishSteps.length) {
    this.wishSteps[i].done = false;
    i++;
  }
  return this;
};

Challenge.prototype.stop = function() {
  if (this.active) {
    this.finish();
  } else {
    this.isOver = false;
  }
  return this;
};

Challenge.prototype.finish = function() {
  this.challengeLog.finish();
  this.isOver = true;
  console.log('tiempo fue de', this.challengeLog.time, ' s');
  this.active = false;
  return this;
};

Challenge.prototype.getSummary = function() {
  this.challengeLog.getSummary();
  return this;
};

Challenge.prototype.step = function(skill) {
  var skillUsed;
  skillUsed = skill.name;
  if (!this.active) {
    return this;
  }
  if (this.wishSteps.length > this.currentStep && this.wishSteps[this.currentStep].name === skillUsed) {
    this.wishSteps[this.currentStep].done = true;
    this.challengeLog.add(skill);
    this.currentStep++;
  }
  if (this.wishSteps.length === this.currentStep) {
    this.finish();
  }
  return this;
};

if (typeof exports !== 'undefined') {
  exports.Challenge = Challenge;
}
