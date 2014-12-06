Summary = (data) ->
  data = data or {}
  this.totalDmg = 0
  this.time = 0
  this.events = []
  this.invulnerable = {
    value: 0,
    index: null
  }
  this.result = []
  this.challengeLog = data.challengeLog || undefined
  return

Summary::clean = () ->
  this.totalDmg = 0
  this.time = 0
  this.invulnerable = {
    value: 0,
    index: null
  }
  this.result = []
  this.events = []
  return this

Summary::add = (item) ->
  this.events.push(item)
  return this

Summary::generate = () ->
  
  compare = (a, b) ->
    a.time - b.time
  this.result = this.events.sort(compare)

  i = 0
  len = this.result.length
  while i < len
    item = this.result[i]
    
    if item.effect == 'invulnerable'
      canBeUse = false
      isSameAction = item.index == this.invulnerable.index
      valInvulnerable = this.invulnerable.value;
      if valInvulnerable == 0 or (valInvulnerable > 0 and isSameAction)
        canBeUse = true
        this.invulnerable.value += item.toggle
        this.invulnerable.index = item.index
      
      this.challengeLog.setStatus(item.index, canBeUse)
    else
      if this.invulnerable.value > 0
        this.challengeLog.setStatus(item.index, false)
      else
        this.totalDmg += this.damage
        this.challengeLog.setStatus(item.index, true)
    i++
  return this

if typeof exports isnt 'undefined'
  exports.Summary = Summary