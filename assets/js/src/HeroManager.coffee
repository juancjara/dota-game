HeroManager = () ->
	this.heros = []
	return

HeroManager::invoker = () ->
  extraSkills = []
  extraSkills.push new Skill {
    canBeChallenge: true,
    srcImg: 'invoker_cold_snap',
    name: 'cold snap',
    clickNeeded: true,
    dependencies: 'qqq'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    srcImg: 'invoker_sun_strike',
    name: 'sun strike',
    clickNeeded: true,
    dependencies: 'eee'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'ghost walk',
    srcImg: 'invoker_ghost_walk',
    clickNeeded: false,
    dependencies: 'qqw'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'ice wall',
    srcImg: 'invoker_ice_wall',
    clickNeeded: false,
    dependencies: 'qqe'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'emp',
    srcImg: 'invoker_emp',
    clickNeeded: true,
    dependencies: 'www'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'tornado',
    srcImg: 'invoker_tornado',
    clickNeeded: true,
    dependencies: 'wwq'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'alacrity',
    srcImg: 'invoker_alacrity',
    clickNeeded: true,
    dependencies: 'wwe'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'forge spirit',
    srcImg: 'invoker_forge_spirit',
    clickNeeded: false,
    dependencies: 'eeq'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'defeaning blast',
    srcImg: 'invoker_deafening_blast',
    clickNeeded: true,
    dependencies: 'qwe'
  }
  extraSkills.push new Skill {
    canBeChallenge: true,
    name: 'chaos meteor',
    srcImg: 'invoker_chaos_meteor',
    clickNeeded: true,
    dependencies: 'wee'
  }

  invoSkills = []
  invoSkills.push new Skill {
    name: 'quas',
    key: 'q',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'invoker_quas',
    clickNeeded: false,
    customFun: () ->
      eventsLog.addKey('q');
      return
  }
  invoSkills.push new Skill {
    name: 'wex',
    key: 'w',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'invoker_wex',
    clickNeeded: false,
    customFun: () ->
      eventsLog.addKey('w');
      return
  }
  invoSkills.push new Skill {
    name: 'exort',
    key: 'e',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'invoker_exort',
    clickNeeded: false,
    customFun: () ->
      eventsLog.addKey('e');
      return
  }

  useSkill = (index) ->
    () ->
      dispatcher.execute 'useExtraSkill', index
      return
    

  invoSkills.push new Skill {
    customFun: useSkill(3),
    key: 'd'
  }
  invoSkills.push new Skill {
    customFun: useSkill(4),
    key: 'f'
  }

  skillInvoke = (extraSkills) ->
    () -> 
      console.log('extraSkills', extraSkills);
      lastSkill = dispatcher.execute 'getLastSkill'
      i = 0
      while i < extraSkills.length
        dep = extraSkills[i].dependencies
        nameSkill = extraSkills[i].name
        if lastSkill isnt nameSkill and eventsLog.isSameState(dep)
          dispatcher.execute "changeSkill", i
          break
        i++
      return

  invoSkills.push new Skill {
    name: 'invoke',
    key: 'r',
    secondsCd: 0,
    canBeChallenge: false,
    srcImg: 'invoker_invoke',
    clickNeeded: false,
    customFun: skillInvoke(extraSkills)
  }

  invoker = new Hero {
    name: 'invoker',
    skills: invoSkills,
    extraSkills: extraSkills,
    srcImg: 'hero_invoker'
  }
  return invoker

HeroManager::create = () ->
	#invoker
  this.heros.push this.invoker()
  return this