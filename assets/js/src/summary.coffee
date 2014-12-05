Summary = (data) ->
  data = data or {}
  this.totalDmg = 0
  this.time = 0
  this.events = []
  this.invulnerable = 0
  this.result = []
  this.challengeLog = data.challengeLog || undefined
  return

Summary::clean = () ->
  this.totalDmg = 0
  this.time = 0
  this.invulnerable = 0
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
      this.invulnerable += item.toggle
      this.challengeLog.setStatus(item.index, true)
    else
      if this.invulnerable > 0
        this.challengeLog.setStatus(item.index, false)
      else
        this.totalDmg += this.damage
        this.challengeLog.setStatus(item.index, true)
    i++
  return this

if typeof exports isnt 'undefined'
  exports.Summary = Summary