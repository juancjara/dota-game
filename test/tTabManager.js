var assert = require("assert");
var Tab = require('./../assets/js/build/tabManager.js').Tab;
var Tab = require('./../assets/js/build/tabManager.js').TabManager;

describe('Tabs manager', function() {
  var tm;

  beforeEach(function() {
    var arr = [
      new Tab({
        name: 'tab1',
        text: '1 tab'
      }),
      new Tab({
        name: 'tab2',
        text: '2 tab'
      }),
      new Tab({
        name: 'tab3',
        text: '3 tab'
      })
    ]
    tm = new TabManager(arr);
  })

  describe('tests', function() {
    it('gg', function() {
      tm.registerEvent('tab1', );
      asser.deepEqual(,);
    })
  });
})