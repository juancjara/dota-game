var Tab, TabsManager;

Tab = function(data) {
  data = data || {};
  this.name = data.name || '';
  this.text = data.text || '';
  this.target = data.target || '';
  this.active = false;
  this.queueFun = {};
  this.acceptKey = false;
};

Tab.prototype.switchStatus = function(status) {
  this.acceptKey = status;
  return this;
};

Tab.prototype.register = function(key, action) {
  this.queueFun[key] = action;
  return this;
};

Tab.prototype.unregister = function(key) {
  if (key in this.queueFun) {
    delete this.queueFun[key];
  }
  return this;
};

Tab.prototype.emit = function(key) {
  var fun, k;
  if (!this.acceptKey) {
    return;
  }
  if (Object.keys(this.queueFun).length === 1) {
    fun = {};
    for (k in this.queueFun) {
      fun = this.queueFun[k];
    }
    fun(key);
  } else {
    this.queueFun[key]();
  }
  return this;
};

TabsManager = function(tabs) {
  this.tabs = tabs;
  this.activeTab = -1;
};

TabsManager.prototype.findByName = function(name) {
  var i;
  i = 0;
  while (i < this.tabs.length) {
    if (this.tabs[i].name === name) {
      break;
    }
    i++;
  }
  return i;
};

TabsManager.prototype.changeTab = function(index) {
  this.activeTab = index;
  return this;
};

TabsManager.prototype.unregisterEvent = function(name, key) {
  var idx;
  idx = this.findByName(name);
  if (idx < 0) {
    return this;
  }
  this.tabs[idx].unregister(key);
  return this;
};

TabsManager.prototype.registerEvent = function(name, key, action) {
  var idx;
  idx = this.findByName(name);
  if (idx < 0) {
    return this;
  }
  this.tabs[idx].register(key, action);
  return this;
};

TabsManager.prototype.emit = function(key) {
  if (!key) {
    return this;
  }
  this.tabs[this.activeTab].emit(key);
  return this;
};

TabsManager.prototype.switchStatus = function(name, status) {
  var idx;
  idx = this.findByName(name);
  if (idx < 0) {
    return this;
  }
  this.tabs[idx].switchStatus(status);
  return this;
};

if (typeof exports !== 'undefined') {
  exports.TabsManager = TabsManager;
  exports.Tab = Tab;
}
