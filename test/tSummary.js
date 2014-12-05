var assert = require("assert");
var Summary = require('./../assets/js/build/summary.js').Summary;

describe('Summary', function() {
  var s;

  beforeEach(function() {
    var Mock = function() {
      this.summary = [];
      self = this;
      this.setStatus = function(index, value) {
        self.summary[index].status = value;
      };
    }
    c = new Mock();
    s = new Summary({challengeLog: c});
  })

  describe('tests', function() {
    it('order by time', function() {
      var time = (new Date()).getTime();
      c.summary.push({
        name: 'name1',
        status: null
      });

      var arr = [];
      arr.push({
        time: time,
        effect: 'invulnerable',
        toggle: 1,
        status: true,
        index: 0
      });
      arr.push({
        time: time + 40000,
        effect: 'invulnerable',
        toggle: -1,
        status: true,
        index: 0
      });
      s.add(arr[1]);
      s.add(arr[0]);
      s.generate();
      assert.deepEqual(arr, s.result);
    })

    it('skill hits', function() {
      var time = (new Date()).getTime();

      c.summary.push({
        name: 'name1',
        status: null
      });
      c.summary.push({
        name: 'name2',
        status: null
      });

      var arr = [];
      arr.push({
        name: 'name1',
        status: true
      });
      arr.push({
        name: 'name2',
        status: true
      });

      s.add({
        time: time + 40000,
        effect: 'invulnerable',
        toggle: -1,
        index: 0
      });
      s.add({
        time: time,
        effect: 'invulnerable',
        toggle: 1,
        index: 0
      });
      s.add({
        time: time + 40001,
        effect: 'damage',
        index: 1,
        damage: 50
      });

      s.generate();
      assert.deepEqual(arr, c.summary);
    })

    it('skill doesnt hit', function() {
      var time = (new Date()).getTime();

      c.summary.push({
        name: 'name1',
        status: null
      });
      c.summary.push({
        name: 'name2',
        status: null
      });

      var arr = [];
      arr.push({
        name: 'name1',
        status: true
      });
      arr.push({
        name: 'name2',
        status: false
      });

      s.add({
        time: time + 40000,
        effect: 'invulnerable',
        toggle: -1,
        index: 0
      });
      s.add({
        time: time,
        effect: 'invulnerable',
        toggle: 1,
        index: 0
      });
      s.add({
        time: time + 39000,
        effect: 'damage',
        index: 1,
        damage: 50
      });

      s.generate();
      assert.deepEqual(arr, c.summary);
    })

  })

})