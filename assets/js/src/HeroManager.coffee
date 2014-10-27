HeroManager = () ->
	this.heros = []
	return

HeroManager::invoker = () ->
  extraSkills = []
  extraSkills.push new Skill {
    name: 'cold snap',
    dependencies: 'qqq'
  }
  extraSkills.push new Skill {
    name: 'sun strike',
    dependencies: 'eee'
  }
  extraSkills.push new Skill {
    name: 'ghost walk',
    dependencies: 'qqw'
  }
  extraSkills.push new Skill {
    name: 'ice wall',
    dependencies: 'qqe'
  }
  extraSkills.push new Skill {
    name: 'emp',
    dependencies: 'www'
  }
  extraSkills.push new Skill {
    name: 'tornado',
    dependencies: 'wwq'
  }
  extraSkills.push new Skill {
    name: 'alacrity',
    dependencies: 'wwe'
  }
  extraSkills.push new Skill {
    name: 'forge spirit',
    dependencies: 'eeq'
  }
  extraSkills.push new Skill {
    name: 'chaos meteor',
    dependencies: 'wwe'
  }
  extraSkills.push new Skill {
    name: 'defeaning blast',
    dependencies: 'qwe'
  }

  invoSkills = []
  invoSkills.push new Skill {
    name: 'quas',
    key: 'q',
    secondsCd: 0,
    canBeChallenge: false,
    customFun: () ->
      eventsLog.addKey('q');
      return
  }
  invoSkills.push new Skill {
    name: 'wex',
    key: 'w',
    secondsCd: 0,
    canBeChallenge: false,
    customFun: () ->
      eventsLog.addKey('w');
      return
  }
  invoSkills.push new Skill {
    name: 'exort',
    key: 'e',
    secondsCd: 0,
    canBeChallenge: false,
    customFun: () ->
      eventsLog.addKey('e');
      return
  }

  useSkill = (index) ->
    () ->
      name = dispatcher.execute 'getSkillName', index
      dispatcher.execute 'useSkill', name 
      return
    

  invoSkills.push new Skill {
    customFun: useSkill(3)
  }
  invoSkills.push new Skill {
    customFun: useSkill(4)
  }

  skillInvoke = (extraSkills) ->
    console.log('extraSkills', extraSkills);
    () -> 
      console.log('extraSkills', extraSkills);
      lastSkill = dispatcher.execute 'getLastSkill'
      i = 0
      while i < extraSkills.length
        dep = extraSkills[i].dependencies
        nameSkill = extraSkills[i].name
        if lastSkill isnt nameSkill and eventsLog.isSameState(dep)
          console.log('encontrado')
          dispatcher.execute "changeSkill", i
          break
        i++
      return

  invoSkills.push new Skill {
    name: 'invoke',
    key: 'r',
    secondsCd: 0,
    canBeChallenge: false,
    customFun: skillInvoke(extraSkills)
  }

  invoker = new Hero {
    name: 'invoker',
    skills: invoSkills,
    extraSkills: extraSkills
  }
  return invoker

HeroManager::create = () ->
	#invoker
  this.heros.push this.invoker()
  return this