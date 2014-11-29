var assert = require("assert");
var ChallengeLog = require('./../assets/js/build/challengeLog.js').ChallengeLog;

describe('ChallengeLog', function() {
  var c;

  beforeEach(function() {
    c = new ChallengeLog();
  })

  describe('tests', function() {
    it('verify 2 elems added are differents', function() {
      c.add({srcImg: 'img1'});
      c.add({srcImg: 'img2'});
      assert.notDeepEqual(c.tryhard[0], c.tryhard[1]);
    })

    it('validate summary all zeros', function() {
      c.start();
      c.add({
        srcImg: 'img1',
        hitTime: 0,
        duration: 0
      });
      c.finish();
      var result = [{
        srcImg: 'img1',
        castTime: 0,
        hitTime: 0,
        duration: 0,
        success: true
      }];
      assert.deepEqual(c.summary, result);
    })

    it('validate summary instant add', function() {
      c.start();
      c.add({
        srcImg: 'img1',
        hitTime: 1.5,
        duration: 2.1
      });
      var time = 0;
      var result = [{
        srcImg: 'img1',
        castTime: time,
        hitTime: time + 1.5,
        duration: time + 1.5 + 2.1,
        success: true
      }];
      c.finish();
      assert.deepEqual(c.summary, result);
    })
    
    it('validate summary delay add', function() {
      c.start();
      c.add({
        srcImg: 'img1',
        hitTime: 1.5,
        duration: 2.1
      });
      var time = 3;
      setTimeout(function() {
        var result = [{
          srcImg: 'img1',
          castTime: time,
          hitTime: time + 1.5,
          duration: time + 1.5 + 2.1,
          success: true
        }];
        c.finish();
        assert.deepEqual(c.summary, result);
      }, 3*1000);
    })
  })
})