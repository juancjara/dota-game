var dispatcher = (function() {
  var active = false;
  var queueKey = {};
  var queueFun = {};
  window.onkeydown = function(e) {
    
    /*if (!active) {
      return
    }*/
    var code = e.keyCode ? e.keyCode: e.which;
    var key = KeyCode[code];
    /*
    if (key in queueKey) {
      queueKey[key]();
    }*/
    console.log(key, 'key');
    dispatcher.execute('emit', key);
  }

  return {
    onEvents: function() {
      active = true;     
    },
    offEvents: function() {
      active = false;
    },
    subscribeKey: function(key, fun) {
      queueKey[key] = fun;
    },
    unsubscribeKey: function(key) {
      queueKey[key] = function() {};
    },
    unsubscribe: function(name) {
      delete queueFun[name];
    },
    subscribe: function(name, fun) {
      queueFun[name] = fun;
    },
    execute: function(name, params) {
      if (name in queueFun) {
        return queueFun[name](params); 
      }
    },
    show: function() {
      for(var k in queueKey) {
        console.log(k, queueKey[k]);
      }
    }
  }
}());