var Challenge;

Challenge = function() {
  this.wishSteps = [];
  this.wishLength = 0;
  this.steps = [];
  this.currentStep = 0;
  this.active = false;
  this.isOver = false;
  this.timer = new Timer;
};

Challenge.prototype.set = function(list) {
  var actualElm, i;
  this.timer.stop;
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
  this.timer.start();
  this.active = true;
  this.isOver = false;
  return this;
};

Challenge.prototype.clean = function() {
  var i;
  this.currentStep = 0;
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
  this.timer.stop();
  this.isOver = true;
  console.log('tiempo fue de', this.timer.time, ' s');
  this.active = false;
  return this;
};

Challenge.prototype.step = function(skillUsed) {
  if (!this.active) {
    return this;
  }
  if (this.wishSteps.length > this.currentStep && this.wishSteps[this.currentStep].name === skillUsed) {
    this.wishSteps[this.currentStep].done = true;
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
