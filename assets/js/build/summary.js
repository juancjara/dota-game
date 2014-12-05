var Summary;

Summary = function(data) {
  data = data || {};
  this.totalDmg = 0;
  this.time = 0;
  this.events = [];
  this.invulnerable = 0;
  this.result = [];
  this.challengeLog = data.challengeLog || void 0;
};

Summary.prototype.add = function(item) {
  this.events.push(item);
  return this;
};

Summary.prototype.generate = function() {
  var compare, i, item, len;
  compare = function(a, b) {
    return a.time - b.time;
  };
  this.result = this.events.sort(compare);
  i = 0;
  len = this.result.length;
  while (i < len) {
    item = this.result[i];
    if (item.type === 'invulnerable') {
      this.invulnerable += item.toggle;
      this.challengeLog.setStatus(item.index, true);
    } else {
      if (item.type === 'damage') {
        if (this.invulnerable > 0) {
          this.challengeLog.setStatus(item.index, false);
        } else {
          this.totalDmg += this.damage;
          this.challengeLog.setStatus(item.index, true);
        }
      }
    }
    i++;
  }
  return this;
};

if (typeof exports !== 'undefined') {
  exports.Summary = Summary;
}
