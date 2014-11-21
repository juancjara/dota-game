/** @jsx React.DOM */

var SkillSlot = React.createClass({displayName: 'SkillSlot',
  render: function() {
    var className = 'same-line skill '+this.props.item.srcImg;
    return (
      React.DOM.li({
        className: className, 
        key: this.props.key}
      )
    );
  }
});

var SkillList = React.createClass({displayName: 'SkillList',
  getInitialState: function() {
    dispatcher.subscribe('changeSkill', this.changeSkill);
    dispatcher.subscribe('getLastSkill', this.getLastSkill);
    dispatcher.subscribe('useExtraSkill', this.useExtraSkill);
    return {
      skills: this.props.list,
      lastSkill: ''
    }
  },
  componentWillReceiveProps: function(nextProps) {
    
    for (var i = 0; i < this.state.skills.length; i++) {
      var actualSkill = this.state.skills[i];
      var keyBind = actualSkill.key;

      dispatcher.subscribeKey(keyBind, 
        this.createFun(actualSkill.obj));
    };
  },
  createFun: function(obj) {
    return function(param) {
      obj.fun(param);
    }
  },
  useExtraSkill: function(index) {
    this.state.skills[index].obj.fun();
  },
  getLastSkill: function() {
    return this.state.lastSkill;
  },
  changeSkill: function(index) {
    //TODO ver si se debe actualizar todo el objeto o no
    //cuidar no actualizar la funcion del obj

    //TODO si no es wtf actualizar al nuevo key
    var extraSkills = this.props.extraSkills;
    var skills = this.state.skills;
    var keyBind;
    var temp4fun = skills[4].obj.fun;
    var temp3fun = skills[3].obj.fun;

    skills[4].obj = skills[3].obj;
    skills[3].obj = extraSkills[index];

    this.setState({
      skills: skills,
      lastSkill: extraSkills[index].name
    });
  },
  render: function() {
    return (
      React.DOM.div({className: "hero-skill-slots"}, 
        React.DOM.ul({className: "clear-list"}, 
          this.state.skills.map(function(item, i) {
            return ( SkillSlot({
              key: i, 
              item: item.obj})
            )
          }, this)
        )
      )
    );
  }
});

var ItemSlot = React.createClass({displayName: 'ItemSlot',
  render: function() {
    var className = 'item same-line '+this.props.item.srcImg;
    return (
      React.DOM.li({
        className: className, 
        key: this.props.key}
      )
    );
  }
});

var ItemList = React.createClass({displayName: 'ItemList',
  getInitialState: function() {
    return {
      itemsSlots: this.props.itemsSlots
    }
  },
  componentDidMount: function() {
    var elm;
    var fun = this.state.itemsSlots.launch;
    for (var i = 0; i < this.state.itemsSlots.slots.length; i++) {
      elm = this.state.itemsSlots.slots[i];
      dispatcher.subscribeKey(elm.key, 
        this.createLaunch(this.state.itemsSlots, i));
    }
  },
  createLaunch: function(obj, index) {
    return function() {
      obj.launch(index)
    }
  },
  render: function() {
    return (
      React.DOM.div({
        className: "hero-item-slots same-line vert-bot"}, 
        React.DOM.ul({className: "clear-list"}, 
          this.state.itemsSlots.slots.map(function(slot ,i) {
            return (
              ItemSlot({
                key: i, 
                item: slot.item})
            )
          }, this)
        )
      )
    );
  }
});

var InvokerStatus = React.createClass({displayName: 'InvokerStatus',
  getInitialState : function() {
    dispatcher.subscribe('addInvokerState', this.addState);
    dispatcher.subscribe('clearInvokerState', this.clear);
    dispatcher.subscribe('isSameInvokerState', this.isSameState);
    return {
      status : [{}, {}, {}]
    }
  },
  clear: function() {
    this.setState({
      status: [{}, {}, {}]
    });
  },
  addState: function(data) {
    var st = this.state.status;
    for (var i = 0; i < st.length - 1; i++) {
      st[i] = st[i+1];
    };
    st[2] = data;
    this.setState({
      status: st
    });
  },
  isSameState: function(paramState) {
    var temp = [paramState.charAt(0), paramState.charAt(1), paramState.charAt(2)];
    temp.sort();
    var temp2 = [];
    for (var i = 0; i < this.state.status.length; i++) {
      temp2[i] = this.state.status[i].key;
    }
    var clone = temp2.slice(0);
    clone.sort();
    for (var i = 0; i < clone.length; i++) {
      if (clone[i] != temp[i]) {
        return false;
      }
    };
    return true;
  },
  render: function() {
    return (
      React.DOM.ul({className: "clear-list"}, 
        this.state.status.map(function(state ,i) {
          var className = 'zoom-status same-line '+ state.srcImg;
          return (
            React.DOM.li({
              key: i, 
              className: className}, " ", state.key
            )
          )
        }, this)
      )
    );
  }
});

var HeroTemplate = React.createClass({displayName: 'HeroTemplate',
  render: function() {
    var imgHero = 'hero-img '+this.props.heroData.srcImg;
    return (
      React.DOM.div({className: "hero-block same-line-top"}, 
        React.DOM.div({className: "hero-details same-line-top"}, 
          React.DOM.div({
            className: "hero-name"}, 
            this.props.heroData.name
          ), 
          React.DOM.div({
            className: imgHero}
          )
        ), 
        React.DOM.div({className: "same-line vert-bot"}, 
          InvokerStatus(null), 
          SkillList({
            list: this.props.heroData.skills, 
            extraSkills: this.props.heroData.extraSkills})
        )
      )
    );
  }
});

var ChallengeStep = React.createClass({displayName: 'ChallengeStep',
  render: function() {
    var opacity = '';
    if (!this.props.item.done) {
      opacity=' no-used'
    }
    var className='same-line zoom-challenge '+ this.props.item.srcImg +
        opacity;
    return (
      React.DOM.li({
        className: className, 
        key: this.props.key}
      )
    );
  }
});

var StepToChooseFrom = React.createClass({displayName: 'StepToChooseFrom',
  render: function() {
    var className = 'same-line zoom-challenge ' + this.props.item.srcImg;
    return (
      React.DOM.li({
        className: className, 
        key: this.props.key, 
        onClick: this.props.addStep.bind(null, this.props.item)}
        
      )
    );
  }
});

var SelectChallenge = React.createClass({displayName: 'SelectChallenge',
  getInitialState: function() {
    return {
      steps: [],
      listChallenge: listChallenge
    }
  },
  addStep: function(step) {
    var steps = this.state.steps;
    steps.push(step);
    this.setState({
      steps: steps
    });
  },
  selectListChallenge: function(index) {
    var list = this.state.listChallenge[index];
    var steps = [];
    var name = ''
    var skills;
    var items;
    for (var i = 0; i < list.length; i++) {
      name = list[i].name;
      if (list[i].src == 'skills') {
        skills = this.props.heroSelected.skills
        for (var k = 0; k < skills.length; k++) {
          if (name == skills[k].obj.name) {
            steps.push(skills[k].obj);
            break;
          }
        };
      }
      else if (list[i].src == 'extraSkills') {
        skills = this.props.heroSelected.extraSkills
        for (var k = 0; k < skills.length; k++) {
          if (name == skills[k].name) {
            steps.push(skills[k]);
            break;
          }
        };
      }
      else if (list[i].src == 'items') {
        items = this.props.itemsSelected.slots
        for (var k = 0; k < skills.length; k++) {
          if (name == skills[k].item.name) {
            steps.push(skills[k].item);
            break;
          }
        };
      }
    };
    this.setState({
      steps: steps
    });
  },
  setChallenge: function() {
    dispatcher.execute('setChallenge', this.state.steps);
  },
  render: function() {
    var skillsToChooseFrom = [];
    var extraSkillsToChooseFrom = [];
    var itemsToChooseFrom = [];
    var skills;
    var items;

    skills = this.props.heroSelected.skills
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].obj.canBeChallenge) {
        skillsToChooseFrom.push(skills[i].obj);
      }
    };

    skills = this.props.heroSelected.extraSkills;
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].canBeChallenge) {
        extraSkillsToChooseFrom.push(skills[i]);
      }
    };    

    var items = this.props.itemsSelected.slots;
    for (var i = 0; i < items.length; i++) {
      if (items[i].item.name.length) {
        itemsToChooseFrom.push(items[i].item);
      }
    };


    return (
      React.DOM.div({className: "select-challenge same-line-top"}, 
        React.DOM.button({onClick: this.setChallenge}, "Set challenge"), 
        React.DOM.ul({className: "clear-list"}, 
          this.state.steps.map(function(step ,i) {
            var className ='same-line zoom-challenge '+ step.srcImg;
            return (
              React.DOM.li({
                className: className, 
                key: i}
              )
            )
          }, this)
        ), 
        React.DOM.div(null, 
          React.DOM.label(null, "Challenge list"), 
          React.DOM.ul({className: "challenge-list"}, 
            this.state.listChallenge.map(function(challenge ,i) {
              return (
                React.DOM.li({onClick: this.selectListChallenge.bind(null, i)}, 
                  challenge.map(function(step ,i) {
                    var className ='same-line zoom-challenge '+ step.srcImg;
                    return (
                      React.DOM.span({
                        className: className, 
                        key: i}
                      )
                    )
                  }, this)
                )
              )
            }, this)
          )
        ), 
        React.DOM.label(null, "Custom skills to add to challenge"), 
        React.DOM.ul({class: "custom-step"}, 
          skillsToChooseFrom.map(function(step ,i) {
            return (
              StepToChooseFrom({
                key: i, 
                item: step, 
                addStep: this.addStep})
            )
          }, this), 
          extraSkillsToChooseFrom.map(function(step ,i) {
            return (
              StepToChooseFrom({
                key: i, 
                item: step, 
                addStep: this.addStep})
            )
          }, this), 
          itemsToChooseFrom.map(function(step ,i) {
            return (
              StepToChooseFrom({
                key: i, 
                item: step, 
                addStep: this.addStep})
            )
          }, this)
        )
      )
    );
  }

});

var ChallengeTemplate = React.createClass({displayName: 'ChallengeTemplate',
  getInitialState: function() {
    dispatcher.subscribe('useSkill', this.action);
    dispatcher.subscribe('setChallenge', this.setChallenge);
    var a = new Challenge();
    a.set([]);
    return {
      challenge: a,
      message: 'Choose challenge',
      startButton: 'Start',
      countDown: null
    };
  },
  setChallenge: function(steps) {
    this.stop();
    this.setState({
      challenge: this.state.challenge.set(steps),
      startButton: 'Start'
    });    
  },
  action: function(skillName) {
    this.setState({
      challenge: this.state.challenge.step(skillName)
    });
    if (!this.state.challenge.active) {
      dispatcher.offEvents();
    }
  },
  setMessage: function(message) {
    console.log('ggg');
    this.setState({
      message: message
    });
  },
  startChallenge: function() {
    dispatcher.execute('clearInvokerState');
    dispatcher.unsubscribe('clickTarget');
    dispatcher.onEvents();
    this.setState({
      challenge : this.state.challenge.start(),
      message: '',
      startButton: 'Restart'
    });
  },
  onStart: function() {
    var countDown = this.state.countDown;
    var self = this;
    var onFinish = function() {
      var c = new CountDown({
        onFinish: self.startChallenge,
        time: 3,
        showOnSeconds: self.setMessage
      });
      c.start();
      self.setState({
        countDown: c
      });
    }
    if (countDown) {
      countDown.stop(onFinish);
    } else {
      onFinish();
    }
    
  },
  start: function() {
    var challenge = this.state.challenge;
    var message = ''
    if (!challenge.wishSteps.length) {
      this.setState({
        message: 'Choose challenge'
      });
    }
    else {

      this.setState({
        message: 'Game starts in ...'
      });
      this.stop();
      setTimeout(this.onStart, 500);
    }
    
  },
  stop: function() {
    dispatcher.execute('clearInvokerState');
    dispatcher.unsubscribe('clickTarget');
    dispatcher.offEvents();
    this.setState({
      challenge: this.state.challenge.stop()
    });
  },
  clickTarget: function() {
    dispatcher.execute('clickTarget');
  },
  render: function() {
    var show = this.state.challenge.isOver? '': 'hidden';
    var classMessage = 'message-block ';
    if (this.state.message.length == 0 ){
      classMessage = ' hide'
    }
    return (
      React.DOM.div({className: "challenge-block"}, 
        React.DOM.button({
          onClick: this.start}, 
          this.state.startButton
        ), 
        React.DOM.div({
          className: show}, 
          "Tiempo ", this.state.challenge.timer.time, " segundos"
        ), 
        React.DOM.ul({className: "clear-list"}, 
          this.state.challenge.wishSteps.map(function(step ,i) {
            return (
              ChallengeStep({
                key: i, 
                item: step})
            )
          }, this)
        ), 
        React.DOM.div({className: "field"}, 
          React.DOM.div({className: "message-block"}, 
            React.DOM.div({className: "message"}, 
              this.state.message
            )
          ), 
          React.DOM.div({
          className: "target", 
          onClick: this.clickTarget}
          )
        )
      )
    );
  }  
});

var BaseTemplate = React.createClass({displayName: 'BaseTemplate',
  getInitialState: function() {
    return {
      data: this.props.data,
      itemsSlots: new ItemsSlots()
    };
  },
  componentDidMount: function() {
    var heroSelected;
    heroSelected = heroMng.heros['invoker'];
    this.updateHero(heroSelected);
  },
  updateHero: function(newHero) {
    var skills;
    var actualSkill;
    var keyBind;
    var data;
    data = this.state.data;
    //clean keys
    for (var i = 0; i < this.state.data.skills.length; i++) {
      actualSkill = this.state.data.skills[i];
      keyBind = actualSkill.key;
      
      dispatcher.unsubscribeKey(keyBind);
    };
    //set new skills
    skills = newHero.skills;
    for (var i = 0; i < skills.length; i++) {
      data.skills[i].obj = skills[i];
    };
    data.name = newHero.name;
    data.srcImg = newHero.srcImg;
    data.extraSkills = newHero.extraSkills;

    this.setState({
      data: data
    });
  },
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h1({className: "game-title"}, "DOTA PRACTICE"), 
        React.DOM.div({className: "main-block same-line"}, 
          ChallengeTemplate({
            updateHero: this.updateHero, 
            heroSelected: this.state.data, 
            itemsSelected: this.state.itemsSlots}), 
          React.DOM.div({className: "hero-data"}, 
            HeroTemplate({
              heroData: this.state.data}), 
            ItemList({
            itemsSlots: this.state.itemsSlots})
          ), 
          React.DOM.div({className: "topics"}, 
            "Some skills require a click on an enemy(red circle) to be use."
          )
        ), 
        SelectChallenge({
          heroSelected: this.state.data, 
          itemsSelected: this.state.itemsSlots})
      )
    );
  }
});


//TODO setear skill a key solo una vz xq sino se cambia 
//legacyMode en cualquier lugar
//y gg nadie sabe en q momento fue