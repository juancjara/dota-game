var Item, ItemsSlots;

Item = function(data) {
  data = data || {};
  this.name = data.name || '';
  this.srcImg = data.srcImg || '';
  this.clickNeeded = data.clickNeeded || false;
  this.secondsCd = data.secondsCd || 0;
  this.onCooldown = false;
  this.countdown = null;
  this.hitTime = data.hitTime || 0;
  this.duration = data.duration || 0;
  this.hitDmg = data.hitDamage || 0;
  this.dmgPerSecond = data.damagePerSecond || 0;
  this.endDurationDmg = data.endDurationDmg || 0;
  this.effect = data.effect || '';
};

Item.prototype.finishCd = function() {
  this.onCooldown = false;
};

Item.prototype.stop = function() {
  if (this.countdown) {
    this.countdown.stop();
    this.onCooldown = false;
  }
};

Item.prototype.fun = function(click) {
  var func, self;
  if (!this.clickNeeded || (this.clickNeeded && click)) {
    dispatcher.unsubscribe('clickTarget', func);
    dispatcher.execute('useSkill', this);
  } else {
    self = this;
    func = function() {
      self.fun.bind(self)(true);
    };
    dispatcher.subscribe('clickTarget', func);
  }
};

ItemsSlots = function() {
  var i, keys, nameItems, obj, _i;
  this.slots = [];
  keys = ['z', 'x', 'c', 'v', 'b', 'n'];
  nameItems = ['dagon', 'ethereal', 'eul', 'scythe', 'shivas', 'no-item'];
  for (i = _i = 0; _i <= 5; i = ++_i) {
    obj = {
      key: keys[i],
      item: itemMng.items[nameItems[i]]
    };
    this.slots.push(obj);
  }
};

ItemsSlots.prototype.launch = function(index) {
  this.slots[index].item.fun();
};

ItemsSlots.prototype.clean = function() {
  this.slots = [];
};

if (typeof exports !== 'undefined') {
  exports.ItemsSlots = ItemsSlots;
  exports.Item = Item;
}
