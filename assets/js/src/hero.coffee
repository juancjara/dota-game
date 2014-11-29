Skill = (data) ->
  data = data or {}
  this.name = data.name or ''
  this.srcImg = data.srcImg or 'no-skill'
  this.canBeChallenge = data.canBeChallenge
  #this.abr = data.abr or ''
  this.key = data.key or ''
  this.dependencies = data.dependencies or ''
  this.secondsCd = data.secondsCd or 0
  this.hitTime = data.hitTime or 0
  this.duration = data.duration or 0
  this.onCooldown = false
  this.countdown = null
  this.hitDmg = data.hitDamage or 0
  this.dmgPerSecond = data.damagePerSecond or 0
  this.endDurationDmg = data.endDurationDmg or 0
  this.effect = data.effect or ''
  this.clickNeeded = data.clickNeeded
  func = () ->
    dispatcher.execute 'useSkill', this
    return
  this.customFun = data.customFun or func
  return

Skill::finishCd = () ->
  this.onCooldown = false;
  return

Skill::stop = () ->
  if this.countdown
    this.countdown.stop()
    this.onCooldown = false
  return

Skill::fun = (click) ->
  if !this.clickNeeded or (this.clickNeeded and click)
    dispatcher.unsubscribe 'clickTarget', func
    this.customFun();
  else
    self = this
    func = () ->
      self.fun.bind(self)(true)
      return
    dispatcher.subscribe 'clickTarget', func
  return

Skill::clean = () ->
  console.log('skill clean')
  this.name = ''
  this.srcImg = 'no-skill'
  this.canBeChallenge = false
  this.dependencies = ''
  return

Hero = (data) ->
  data = data or {}
  this.name = data.name or ''
  this.srcImg = data.srcImg or ''
  this.skills = data.skills or []
  this.extraSkills = data.extraSkills or []
  return

Hero::exe = (index) ->
  this.skills[index].fun()
  return