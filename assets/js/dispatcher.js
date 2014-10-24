var keys = {
  'a': 65,
  'q': 81,
  'w': 87,
  'e': 69,
  'r': 82,
  'd': 68,
  'f': 70,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  'z': 90,
  'x': 88,
  'c': 67,
  'v': 86,
  'b': 66,
  'n': 78 
};

var invertKey = {
  65: 'a',
  81: 'q',
  87: 'w',
  69: 'e',
  82: 'r',
  68: 'd',
  70: 'f',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  90: 'z',
  88: 'x',
  67: 'c',
  86: 'v',
  66: 'b',
  78: 'n'
};

var dispatcher = (function() {
  var active = false;
  var queueKey = {};
  var queueFun = {};
  window.onkeydown = function(e) {
    var code = e.keyCode ? e.keyCode: e.which;
    console.log(code);
    if (code in queueKey) {
      eventsLog.addState(code);
      queueKey[code]();
    }
  }

  return {
    subscribeKey: function(keyCode, fun) {
      queueKey[keys[keyCode]] = fun;
    },
    unsubscribeKey: function(keyCode) {
      queueKey[keys[keyCode]] = function() {};
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
      $('#log').prepend('<li>'+ invertKey[key] +'</li>');
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