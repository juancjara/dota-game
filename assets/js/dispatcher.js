var dispatcher = (function() {
  var active = true;
  var queueKey = {};
  var queueFun = {};
  window.onkeydown = function(e) {
    if (!active) {
      return
    }
    var code = e.keyCode ? e.keyCode: e.which;
    var key = KeyCode[code];
    if (key in queueKey) {
      eventsLog.addState(key);
      queueKey[key]();
    }
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
      //fun();
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
    }
  }
}());


var eventsLog = (function() {
  var events = [' ', ' ', ' '];
  return {
    addState: function(key) {
      $('#log').prepend('<li>'+ key +'</li>');
    },
    addKey: function(key) {
      var acumulate = '';
      for (var i = 0; i < events.length - 1; i++) {
        events[i] = events[i+1];
        acumulate +=events[i];
      };
      events[2] = key;
      acumulate += key;
      $('#actualState').text(acumulate);
    },
    clear: function() {
      $('#actualState').text('');
      for (var i = 0; i < events.length; i++) {
        events[i] = '';
      };
    },
    getLast3States: function() {
      var result = '';
      for (var i = 0; i < events.length; i++) {
        result += events[i];
      };
      return result
    },
    isSameState: function(state) {
      var temp = [state.charAt(0), state.charAt(1), state.charAt(2)];
      temp.sort();
      var clone = events.slice(0);
      clone.sort();
      for (var i = 0; i < clone.length; i++) {
        if (clone[i]!= temp[i]) {
          return false;
        }
      };
      return true;
    }
  }
}());