Item = (data) ->
  data = data or {}
  this.name = data.name or ''
  this.srcImg = data.srcImg or ''
  this.clickNeeded = data.clickNeeded or false
  this.secondsCd = data.secondsCd or 0
  this.onCooldown = false
  this.countdown = null
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
  if this.onCooldown
    console.log 'tan en cd no jodas'
    return
  if !this.clickNeeded or (this.clickNeeded and click)
    if this.secondsCd == 0
      dispatcher.execute 'useSkill', this.name
    else 
      if wtfMode
        dispatcher.execute 'useSkill', this.name
        return  
      this.onCooldown = true
      dispatcher.execute 'useSkill', this.name
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

ItemsSlots = () ->
  this.slots = []
  keys = ['z', 'x', 'c', 'v', 'b', 'n'];
  nameItems = ['dagon', 'dagon 1', 'dagon 2',
               'dagon 3', 'dagon 4', 'dagon 5' ];
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