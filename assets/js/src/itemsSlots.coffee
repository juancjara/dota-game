Item = (data) ->
  data = data or {}
  this.name = data.name or ''
  this.srcImg = data.srcImg or ''
  this.clickNeeded = data.clickNeeded or false
  this.secondsCd = data.secondsCd or 0
  this.onCooldown = false
  this.countdown = null
  this.hitTime = data.hitTime or 0
  this.duration = data.duration or 0
  this.hitDmg = data.hitDamage or 0
  this.dmgPerSecond = data.damagePerSecond or 0
  this.endDurationDmg = data.endDurationDmg or 0
  this.effect = data.effect or ''
  return

Item::finishCd = () ->
  this.onCooldown = false;
  return

Item::stop = () ->
  if this.countdown
    this.countdown.stop()
    this.onCooldown = false
  return

Item::fun = (click)->
  if !this.clickNeeded or (this.clickNeeded and click)
    dispatcher.unsubscribe 'clickTarget', func
    dispatcher.execute 'useSkill', this
  else
    self = this
    func = () ->
      self.fun.bind(self)(true)
      return
    dispatcher.subscribe 'clickTarget', func
  return

ItemsSlots = () ->
  this.slots = []
  keys = ['z', 'x', 'c', 'v', 'b', 'n'];
  nameItems = ['dagon', 'ethereal', 'eul',
               'scythe', 'shivas', 'no-item' ];
  for i in [0..5]
    obj = {
      key: keys[i],
      item: itemMng.items[nameItems[i]]
    } 
    this.slots.push obj
  return

ItemsSlots::launch = (index) ->
  this.slots[index].item.fun()
  return

ItemsSlots::clean = () ->
  this.slots = [];
  return

if typeof exports isnt 'undefined'
  exports.ItemsSlots = ItemsSlots
  exports.Item = Item