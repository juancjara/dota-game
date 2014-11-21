Skill = (data) ->
  data = data or {}
  this.name = data.name or ''
  this.srcImg = data.srcImg or 'no-skill'
  this.canBeChallenge = data.canBeChallenge
  #this.abr = data.abr or ''
  this.key = data.key or ''
  this.dependencies = data.dependencies or ''
  this.secondsCd = data.secondsCd or 0
  this.delayHitTime = data.delayHitTime or 0
  this.onCooldown = false
  this.countdown = null
  this.clickNeeded = data.clickNeeded
  func = () ->
    dispatcher.execute 'useSkill', this.name
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
  #do after certain time

  if this.onCooldown
    console.log 'tan en cd no jodas'
    return
  if !this.clickNeeded or (this.clickNeeded and click)
    dispatcher.unsubscribe 'clickTarget', func
    if this.secondsCd == 0
      #hit
      # use
      #doafter  time = 0 ? !delaySkill -> 
      this.customFun();
    else 
      #hit time
      if wtfMode
        this.customFun();
        return  
      this.onCooldown = true
      this.customFun();
      fun = this.finishCd.bind(this)
      this.countdown = new CountDown({
          time: this.secondsCd, 
          onFinish: fun
        }).start()
  else
    self = this
    func = () ->
      self.fun.bind(self)(true)
      return
    dispatcher.subscribe 'clickTarget', func
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