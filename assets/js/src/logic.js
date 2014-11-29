/** @jsx React.DOM */

var SkillSlot = React.createClass({
  render: function() {
    var className = 'same-line skill '+this.props.item.srcImg;
    return (
      <li 
        className={className}
        key= {this.props.key}>
      </li>
    );
  }
});

var SkillList = React.createClass({
  getInitialState: function() {
    //dispatcher.subscribe('clearHero', this.clearSkill);
    dispatcher.subscribe('changeSkill', this.changeSkill);
    dispatcher.subscribe('clearSkill', this.clearLastSkill);
    dispatcher.subscribe('getLastSkill', this.getLastSkill);
    dispatcher.subscribe('useExtraSkill', this.useExtraSkill);
    return {
      skills: this.props.list,
      lastSkill: ''
    }
  },
  clearLastSkill: function() {
    this.setState({
      lastSkill: ''
    });
  },
  createFun: function(obj) {
    return function(param) {
      obj.fun(param);
    }
  },
  useExtraSkill: function(index) {
    this.state.skills[index].obj.fun();
  },
  clearSkill: function() {
    var skills = this.state.skills;
    skills[3].obj = new Skill({
      key: 'd'
    })
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
      <div className='hero-skill-slots'>
        <ul className='clear-list'>
          {this.state.skills.map(function(item, i) {
            return ( <SkillSlot 
              key= {i}
              item= {item.obj} />
            )
          }, this)}
        </ul>
      </div>
    );
  }
});

var ItemSlot = React.createClass({
  render: function() {
    var className = 'item same-line '+this.props.item.srcImg;
    return (
      <li 
        className={className}
        key= {this.props.key}>
      </li>
    );
  }
});

var ItemList = React.createClass({
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
      <div
        className='hero-item-slots same-line vert-bot'>
        <ul className='clear-list'>
          {this.state.itemsSlots.slots.map(function(slot ,i) {
            return (
              <ItemSlot
                key= {i}
                item= {slot.item} />
            )
          }, this)}
        </ul>
      </div>
    );
  }
});

var InvokerStatus = React.createClass({
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
      <ul className='clear-list'>
        {this.state.status.map(function(state ,i) {
          var className = 'zoom-status same-line '+ state.srcImg;
          return (
            <li 
              key= {i}
              className= {className}> {state.key}
            </li>
          )
        }, this)}
      </ul>
    );
  }
});

var HeroTemplate = React.createClass({
  render: function() {
    var imgHero = 'hero-img '+this.props.heroData.srcImg;
    return (
      <div className='hero-block same-line-top'>
        <div className='hero-details same-line-top'>
          <div 
            className='hero-name'>
            {this.props.heroData.name}
          </div>
          <div 
            className={imgHero}>
          </div>
        </div>
        <div className='same-line vert-bot'>
          <InvokerStatus />
          <SkillList 
            list={this.props.heroData.skills}
            extraSkills= {this.props.heroData.extraSkills} />
        </div>
      </div>
    );
  }
});

var ChallengeStep = React.createClass({
  render: function() {
    var opacity = '';
    if (!this.props.item.done) {
      opacity=' no-used'
    }
    var className='same-line zoom-challenge '+ this.props.item.srcImg +
        opacity;
    return (
      <li 
        className={className}
        key= {this.props.key}>
      </li>
    );
  }
});

var StepToChooseFrom = React.createClass({
  render: function() {
    var className = 'same-line zoom-challenge ' + this.props.item.srcImg;
    return (
      <li 
        className = {className}
        key= {this.props.key}
        onClick={this.props.addStep.bind(null, this.props.item)}>
        
      </li>
    );
  }
});

var SelectChallenge = React.createClass({
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
  clearChallenge: function() {
    this.setState({
      steps: []
    });
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
      <div className='select-challenge same-line-top'>
        <button onClick={this.setChallenge}>Set challenge</button>
        <button onClick={this.clearChallenge}>Clear</button>
        <ul className='clear-list'>
          {this.state.steps.map(function(step ,i) {
            var className ='same-line zoom-challenge '+ step.srcImg;
            return (
              <li
                className= {className}
                key= {i}>
              </li>
            )
          }, this)}
        </ul>
        <div>
          <label>Challenge list</label>
          <ul className='challenge-list'>
            {this.state.listChallenge.map(function(challenge ,i) {
              return (
                <li onClick={this.selectListChallenge.bind(null, i)}>
                  {challenge.map(function(step ,i) {
                    var className ='same-line zoom-challenge '+ step.srcImg;
                    return (
                      <span
                        className= {className}
                        key= {i}>
                      </span>
                    )
                  }, this)}
                </li>
              )
            }, this)}
          </ul>
        </div>
        <label>Custom skills to add to challenge</label>
        <ul class='custom-step'>
          {skillsToChooseFrom.map(function(step ,i) {
            return (
              <StepToChooseFrom
                key= {i}
                item={step}
                addStep={this.addStep} />
            )
          }, this)}
          {extraSkillsToChooseFrom.map(function(step ,i) {
            return (
              <StepToChooseFrom
                key= {i}
                item={step}
                addStep={this.addStep} />
            )
          }, this)}
          {itemsToChooseFrom.map(function(step ,i) {
            return (
              <StepToChooseFrom
                key= {i}
                item={step}
                addStep={this.addStep} />
            )
          }, this)}
        </ul>
      </div>
    );
  }

});

var ChallengeTemplate = React.createClass({
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
  action: function(skill) {
    this.setState({
      challenge: this.state.challenge.step(skill)
    });
    if (!this.state.challenge.active) {
      dispatcher.offEvents();
    }
  },
  setMessage: function(message) {
    this.setState({
      message: message
    });
  },
  clearChallenge: function() {
    dispatcher.execute('clearInvokerState');
    dispatcher.unsubscribe('clickTarget');
  },
  startChallenge: function() {
    this.clearChallenge();
    dispatcher.onEvents();
    this.setState({
      challenge : this.state.challenge.start(),
      message: '',
      startButton: 'Restart'
    });
  },
  onStart: function() {
    dispatcher.execute('clearHero');
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
    this.clearChallenge();
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
      <div className='challenge-block'>
        <button 
          onClick={this.start}>
          {this.state.startButton}
        </button>
        <div 
          className={show}>
          Tiempo {this.state.challenge.challengeLog.time} segundos
        </div>
        <ul className='clear-list'>
          {this.state.challenge.wishSteps.map(function(step ,i) {
            return (
              <ChallengeStep
                key= {i}
                item= {step} />
            )
          }, this)}
        </ul>
        <div className='field'>
          <div className='message-block'>
            <div className='message'>
              {this.state.message}
            </div>
          </div>
          <div 
          className='target'
          onClick={this.clickTarget}>
          </div>
        </div>
      </div>
    );
  }  
});

var BaseTemplate = React.createClass({
  getInitialState: function() {
    dispatcher.subscribe('clearHero', this.clearHero);
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
  createFun: function(obj) {
    return function(param) {
      obj.fun(param);
    }
  },
  updateHero: function(newHero) {
    var skills;
    var actualSkill;
    var keyBind;
    var data;
    data = this.state.data;
    
    skills = newHero.skills;

    for (var i = 0; i < skills.length; i++) {
      data.skills[i].obj = skills[i];
      actualSkill = skills[i];
      keyBind = actualSkill.key;
      dispatcher.subscribeKey(keyBind, 
        this.createFun(actualSkill));
    };
    data.name = newHero.name;
    data.srcImg = newHero.srcImg;
    data.extraSkills = newHero.extraSkills;

    var createFun = function createFun(obj) {
      return function(param) {
        obj.fun(param);
      }
    }

    this.setState({
      data: data
    });
  },
  clearHero: function() {
    
    dispatcher.execute('clearSkill');
    dispatcher.subscribeKey('d', function() {
      dispatcher.execute('useExtraSkill', 3);
    });
    dispatcher.subscribeKey('f', function() {
      dispatcher.execute('useExtraSkill', 4);
    });
    var data = this.state.data;
    data.skills[3].obj = new Skill({
      key: 'd',
      customFun: function() {
        
      }
    });
    data.skills[4].obj = new Skill({
      key: 'f',
      customFun: function() {
        
      }
    });
    this.setState({
      data: data
    });

  },
  render: function() {
    return (
      <div>
        <h1 className='game-title'>DOTA PRACTICE</h1>
        <div className='main-block same-line'>
          <ChallengeTemplate 
            updateHero={this.updateHero}
            heroSelected={this.state.data}
            itemsSelected={this.state.itemsSlots} />
          <div className='hero-data'>
            <HeroTemplate 
              heroData={this.state.data} />
            <ItemList 
            itemsSlots={this.state.itemsSlots} />
          </div>
          <div className='topics'>
            Some skills require a click on an enemy(red circle) to be use.
          </div>
        </div>
        <SelectChallenge
          heroSelected={this.state.data}
          itemsSelected={this.state.itemsSlots} />
      </div>
    );
  }
});


//TODO setear skill a key solo una vz xq sino se cambia 
//legacyMode en cualquier lugar
//y gg nadie sabe en q momento fue