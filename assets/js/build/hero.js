var Hero, Skill;

Skill = function(data) {
  var func;
  data = data || {};
  this.name = data.name || '';
  this.srcImg = data.srcImg || 'no-skill';
  this.canBeChallenge = data.canBeChallenge;
  this.key = data.key || '';
  this.dependencies = data.dependencies || '';
  this.secondsCd = data.secondsCd || 0;
  this.onCooldown = false;
  this.countdown = null;
  this.hitTime = data.hitTime || 0;
  this.duration = data.duration || 0;
  this.hitDmg = data.hitDamage || 0;
  this.dmgPerSecond = data.damagePerSecond || 0;
  this.endDurationDmg = data.endDurationDmg || 0;
  this.effect = data.effect || '';
  this.clickNeeded = data.clickNeeded;
  func = function() {
    dispatcher.execute('useSkill', this);
  };
  this.customFun = data.customFun || func;
};

Skill.prototype.finishCd = function() {
  this.onCooldown = false;
};

Skill.prototype.stop = function() {
  if (this.countdown) {
    this.countdown.stop();
    this.onCooldown = false;
  }
};

Skill.prototype.fun = function(click) {
  var func, self;
  if (!this.clickNeeded || (this.clickNeeded && click)) {
    dispatcher.unsubscribe('clickTarget', func);
    this.customFun();
  } else {
    self = this;
    func = function() {
      self.fun.bind(self)(true);
    };
    dispatcher.subscribe('clickTarget', func);
  }
};

Skill.prototype.clean = function() {
  console.log('skill clean');
  this.name = '';
  this.srcImg = 'no-skill';
  this.canBeChallenge = false;
  this.dependencies = '';
};

Hero = function(data) {
  data = data || {};
  this.name = data.name || '';
  this.srcImg = data.srcImg || '';
  this.skills = data.skills || [];
  this.extraSkills = data.extraSkills || [];
};

Hero.prototype.exe = function(index) {
  this.skills[index].fun();
};
