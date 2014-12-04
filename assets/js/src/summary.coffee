Summary = () ->
  this.totalDmg = 0
  this.time = 0
  this.events = []
  this.invulnerable = 0
  this.result = []
  return

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
    if item.type == 'invulnerable'
      this.invulnerable += item.switch
    else
      if this.type == 'damage'
        if this.invulnerable > 0
          #miss
        else
          #did it
          this.totalDmg += this.damage
    i++
  return this

if typeof exports isnt 'undefined'
  exports.Summary = Summary