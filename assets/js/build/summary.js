var Summary;

Summary = function(data) {
  data = data || {};
  this.totalDmg = 0;
  this.time = 0;
  this.events = [];
  this.invulnerable = {
    value: 0,
    index: null
  };
  this.result = [];
  this.challengeLog = data.challengeLog || void 0;
};

Summary.prototype.clean = function() {
  this.totalDmg = 0;
  this.time = 0;
  this.invulnerable = {
    value: 0,
    index: null
  };
  this.result = [];
  this.events = [];
  return this;
};

Summary.prototype.add = function(item) {
  this.events.push(item);
  return this;
};

Summary.prototype.generate = function() {
  var canBeUse, compare, i, isSameAction, item, len, valInvulnerable;
  compare = function(a, b) {
    return a.time - b.time;
  };
  this.result = this.events.sort(compare);
  i = 0;
  len = this.result.length;
  while (i < len) {
    item = this.result[i];
    if (item.effect === 'invulnerable') {
      canBeUse = false;
      isSameAction = item.index === this.invulnerable.index;
      valInvulnerable = this.invulnerable.value;
      if (valInvulnerable === 0 || (valInvulnerable > 0 && isSameAction)) {
        canBeUse = true;
        this.invulnerable.value += item.toggle;
        this.invulnerable.index = item.index;
      }
      this.challengeLog.setStatus(item.index, canBeUse);
    } else {
      if (this.invulnerable.value > 0) {
        this.challengeLog.setStatus(item.index, false);
      } else {
        this.totalDmg += this.damage;
        this.challengeLog.setStatus(item.index, true);
      }
    }
    i++;
  }
  return this;
};

if (typeof exports !== 'undefined') {
  exports.Summary = Summary;
}
