ChallengeLog = () ->
  this.queue = {}
  this.tryhard = []
  this.startTime = 0.0
  this.finishTime = 0.0
  this.time = 0.0
  this.listSkills = []
  this.summary = new Summary({challengeLog: this});
  return

ChallengeLog::clean = () ->
  this.queue = {}
  this.tryhard = []
  this.startTime = -2
  this.finishTime = 0.0
  this.time = 0.0
  this.listSkills = []
  this.summary.clean
  return this

ChallengeLog::start = () ->
  this.clean()
  this.startTime = (new Date()).getTime()
  return this

ChallengeLog::add = (obj) ->
  this.tryhard.push {
    obj: obj,
    time: (new Date()).getTime()
  }
  return this

ChallengeLog::setStatus = (index, status) ->
  this.listSkills[index].status = status;
  return this

ChallengeLog::finish = () ->
  this.finishTime = (new Date()).getTime()
  this.time = (this.finishTime - this.startTime) / 1000
  this.getSummary()
  return this


ChallengeLog::getSummary= () ->
  
  i = 0
  len = this.tryhard.length
  while i < len
    elem = this.tryhard[i].obj
    time = (this.tryhard[i].time - this.startTime)
    result = {}
    result.srcImg = elem.srcImg
    result.castTime = time
    result.hitTime = time + elem.hitTime*1000
    result.duration = elem.duration*1000 + result.hitTime
    result.status = false

    this.listSkills.push result

    switch elem.effect
      when 'invulnerable'
        this.summary.add({
          name: elem.name,
          effect: elem.effect,
          toggle: 1,
          time: result.hitTime,
          index: i
        })
        this.summary.add({
          name: elem.name,
          effect: elem.effect,
          toggle: -1,
          time: result.duration,
          index: i
        })
      else
        this.summary.add({
          name: elem.name,
          effect: elem.effect,
          time: result.duration,
          damage: elem.endDurationDmg,
          index: i
        })
    i++

  this.summary.generate();
  console.log('listSkills', this.listSkills)

  return this

if typeof exports isnt 'undefined'
  exports.ChallengeLog = ChallengeLog