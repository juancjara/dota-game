var assert = require("assert");
var Summary = require('./../assets/js/build/summary.js').Summary;

describe('Summary', function() {
  var s;

  beforeEach(function() {
    s = new Summary();
  })

  describe('tests', function() {
    it('order by time', function() {
      var time = (new Date()).getTime();
      var arr = [];
      arr.push({
        time: time,
        type: 'invulnerable'
      })
      arr.push({
        time: time + 40000,
        type: 'invulnerable'
      })
      s.add(arr[1]);
      s.add(arr[0]);
      s.generate();
      assert.deepEqual(arr, s.result);
    })
  })
})