var Summary;

Summary = function() {
  this.totalDmg = 0;
  this.time = 0;
  this.events = [];
  this.invulnerable = 0;
  this.result = [];
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
      this.invulnerable += item["switch"];
    } else {
      if (this.type === 'damage') {
        if (this.invulnerable > 0) {

        } else {
          this.totalDmg += this.damage;
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
