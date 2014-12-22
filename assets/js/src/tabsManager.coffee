Tab = (data) ->
  data = data || {}
  this.name = data.name || ''
  this.text = data.text || ''
  this.target = data.target || ''
  this.active = false
  this.queueFun = {}
  this.acceptKey = false
  funAux = () ->
    return
  this.noFocus = data.noFocus || funAux
  return

Tab::switchStatus = (status) ->
  this.acceptKey = status
  return this

Tab::register = (key, action) ->
  this.queueFun[key] = action
  return this

Tab::unregister = (key) ->
  if key of this.queueFun
    delete this.queueFun[key]
  return this

Tab::emit = (key) ->
  
  if not this.acceptKey 
    return

  if Object.keys(this.queueFun).length == 1
    fun = {};
    for k of this.queueFun
      fun = this.queueFun[k]
    fun(key)
  else
    if key of this.queueFun
      this.queueFun[key]()
  return this

TabsManager = (tabs) ->
  this.tabs = tabs
  this.activeTab = -1;
  return

TabsManager::findByName = (name) ->
  i = 0
  while i < this.tabs.length
    if this.tabs[i].name == name
      break
    i++
  return i

TabsManager::changeTab = (index) ->
  if this.activeTab >= 0
    this.tabs[this.activeTab].noFocus()
  this.activeTab = index
  return this

TabsManager::unregisterEvent = (name, key) ->
  idx = this.findByName(name)
  if idx < 0
    return this
  this.tabs[idx].unregister(key)
  return this

TabsManager::registerEvent = (name, key, action) ->
  idx = this.findByName(name)
  if idx < 0
    return this
  this.tabs[idx].register(key, action)
  return this

TabsManager::emit = (key) ->
  if not key
    return this
  this.tabs[this.activeTab].emit(key);
  return this

TabsManager::switchStatus = (name, status) ->
  idx = this.findByName(name)
  if idx < 0
    return this
  this.tabs[idx].switchStatus(status)
  return this

if typeof exports isnt 'undefined'
  exports.TabsManager = TabsManager
  exports.Tab = Tab