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
  this.delayHitTime = data.delayHitTime || 0;
  this.onCooldown = false;
  this.countdown = null;
  this.clickNeeded = data.clickNeeded;
  func = function() {
    dispatcher.execute('useSkill', this.name);
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
  var fun, func, self;
  if (this.onCooldown) {
    console.log('tan en cd no jodas');
    return;
  }
  if (!this.clickNeeded || (this.clickNeeded && click)) {
    dispatcher.unsubscribe('clickTarget', func);
    if (this.secondsCd === 0) {
      this.customFun();
    } else {
      if (wtfMode) {
        this.customFun();
        return;
      }
      this.onCooldown = true;
      this.customFun();
      fun = this.finishCd.bind(this);
      this.countdown = new CountDown({
        time: this.secondsCd,
        onFinish: fun
      }).start();
    }
  } else {
    self = this;
    func = function() {
      self.fun.bind(self)(true);
    };
    dispatcher.subscribe('clickTarget', func);
  }
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
