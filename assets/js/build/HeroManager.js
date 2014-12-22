var HeroManager;

HeroManager = function() {
  this.heros = {};
};

HeroManager.prototype.invoker = function() {
  var extraSkills, invoSkills, invoker, skillInvoke, useSkill;
  extraSkills = [];
  extraSkills.push(new Skill({
    canBeChallenge: true,
    srcImg: 'cold_snap',
    name: 'cold snap',
    clickNeeded: true,
    dependencies: 'qqq',
    effect: 'stun',
    key: 'y'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    srcImg: 'sun_strike',
    name: 'sun strike',
    clickNeeded: true,
    secondsCd: 2,
    dependencies: 'eee',
    hitTime: 1.7,
    endDurationDmg: 475,
    key: 't'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'ghost walk',
    srcImg: 'ghost_walk',
    clickNeeded: false,
    dependencies: 'qqw',
    key: 'v'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'ice wall',
    srcImg: 'ice_wall',
    clickNeeded: false,
    dependencies: 'qqe',
    effect: 'slow',
    key: 'g'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'emp',
    srcImg: 'emp',
    clickNeeded: true,
    dependencies: 'www',
    hitTime: 2.9,
    endDurationDmg: 275,
    key: 'c'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'tornado',
    srcImg: 'tornado',
    clickNeeded: true,
    dependencies: 'wwq',
    effect: 'invulnerable',
    duration: 2.5,
    endDurationDmg: 385,
    key: 'x'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'alacrity',
    srcImg: 'alacrity',
    clickNeeded: true,
    dependencies: 'wwe',
    key: 'z'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'forge spirit',
    srcImg: 'forge_spirit',
    clickNeeded: false,
    dependencies: 'eeq',
    key: 'f'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'deafening blast',
    srcImg: 'deafening_blast',
    clickNeeded: true,
    dependencies: 'qwe',
    key: 'b'
  }));
  extraSkills.push(new Skill({
    canBeChallenge: true,
    name: 'chaos meteor',
    srcImg: 'chaos_meteor',
    clickNeeded: true,
    dependencies: 'wee',
    hitTime: 1.3,
    key: 'd'
  }));
  invoSkills = [];
  invoSkills.push(new Skill({
    name: 'quas',
    key: 'q',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'quas',
    clickNeeded: false,
    customFun: function() {
      var val;
      val = {
        key: 'q',
        srcImg: 'quas'
      };
      dispatcher.execute('addInvokerState', val);
    }
  }));
  invoSkills.push(new Skill({
    name: 'wex',
    key: 'w',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'wex',
    clickNeeded: false,
    customFun: function() {
      var val;
      val = {
        key: 'w',
        srcImg: 'wex'
      };
      dispatcher.execute('addInvokerState', val);
    }
  }));
  invoSkills.push(new Skill({
    name: 'exort',
    key: 'e',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'exort',
    clickNeeded: false,
    customFun: function() {
      var val;
      val = {
        key: 'e',
        srcImg: 'exort'
      };
      dispatcher.execute('addInvokerState', val);
    }
  }));
  useSkill = function(index) {
    return function() {
      dispatcher.execute('useExtraSkill', index);
    };
  };
  invoSkills.push(new Skill({
    customFun: useSkill(3),
    key: 'd'
  }));
  invoSkills.push(new Skill({
    customFun: useSkill(4),
    key: 'f'
  }));
  skillInvoke = function(extraSkills) {
    return function() {
      var dep, i, lastSkill, nameSkill;
      lastSkill = dispatcher.execute('getLastSkill');
      i = 0;
      while (i < extraSkills.length) {
        dep = extraSkills[i].dependencies;
        nameSkill = extraSkills[i].name;
        if (lastSkill !== nameSkill && dispatcher.execute('isSameInvokerState', dep)) {
          dispatcher.execute("changeSkill", i);
          break;
        }
        i++;
      }
    };
  };
  invoSkills.push(new Skill({
    name: 'invoke',
    key: 'r',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'invoke',
    clickNeeded: false,
    customFun: skillInvoke(extraSkills)
  }));
  invoker = new Hero({
    name: 'invoker',
    skills: invoSkills,
    extraSkills: extraSkills,
    srcImg: 'invoker'
  });
  return invoker;
};

HeroManager.prototype.create = function() {
  this.heros['invoker'] = this.invoker();
  return this;
};
