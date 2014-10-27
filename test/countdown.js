var assert = require("assert");
var CountDown = require('./../assets/js/build/CountDown').CountDown;

describe('CountDown', function() {
  describe('init', function() {
    it('startcount', function() {
      var fun = function() {
        console.log('finish');
      }
      var c = new CountDown({time: 1});
      c.start();   
      
    })
  })
});