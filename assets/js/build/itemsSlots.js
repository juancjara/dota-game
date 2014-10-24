// Generated by CoffeeScript 1.8.0
var Item, ItemsSlots;

Item = function(data) {
  data = data || {};
  this.name = data.nameParam || '';
  this.clickNeeded = data.clickNeeded || false;
  this.secondsCd = data.secondsCd || 0;
  this.onCooldown = false;
  this.countdown = null;
};

Item.prototype.finishCd = function() {
  this.onCooldown = false;
};

Item.stop = function() {
  if (this.countdown) {
    this.countdown.stop();
    this.onCooldown = false;
  }
};

Item.prototype.fun = function(click) {
  var fun, func, self;
  if (this.onCooldown) {
    console.log('tan en cd no jodas');
    return;
  }
  if (!this.clickNeeded || (this.clickNeeded && click)) {
    if (this.secondsCd === 0) {
      dispatcher.execute('useSkill', this.name);
    } else {
      this.onCooldown = true;
      dispatcher.execute('useSkill', this.name);
      fun = this.finishCd.bind(this);
      this.countdown = new CountDown({
        time: this.secondsCd,
        onFinish: fun
      }).start();
    }
  } else {
    self = this;
    func = function() {
      self.fun.bind(self)(true);
    };
    dispatcher.subscribe('clickTarget', func);
  }
};

ItemsSlots = function() {
  var i, keys, obj, _i;
  this.slots = [];
  keys = ['z', 'x', 'c', 'v', 'b', 'n'];
  for (i = _i = 1; _i <= 6; i = ++_i) {
    obj = {
      key: keys[i - 1],
      item: new Item({
        nameParam: '' + i,
        clickNeeded: true,
        secondsCd: 2
      })
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
