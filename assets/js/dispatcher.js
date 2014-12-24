var dispatcher = (function() {
  
  var queueKey = {};
  var queueFun = {};
  var self = this;
  window.onkeydown = function(e) {

    var code = e.keyCode ? e.keyCode: e.which;
    var key = KeyCode[code];
    
    var dialogOpen = $('dialog').css('display');

    if (code == 32 && dialogOpen == 'none') {
      e.preventDefault();
    }
    /*
    if (key in queueKey) {
      console.log('aca');
      queueKey[key]();
    }*/
    dispatcher.execute('emit', key);

  }
  
  return {
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