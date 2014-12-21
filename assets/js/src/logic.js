/** @jsx React.DOM */

var SkillSlot = React.createClass({
  render: function() {
    var className = 'same-line skill '+this.props.item.obj.srcImg;
    return (
      <li 
        className={className}
        key= {this.props.key}>
        <div 
          className='key-bind'>
          {this.props.item.key}
        </div>
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
              item= {item} />
            )
          }, this)}
        </ul>
      </div>
    );
  }
});

var ItemSlot = React.createClass({
  render: function() {
    var className = 'item same-line '+this.props.slot.item.srcImg;
    return (
      <li 
        className={className}
        key= {this.props.key}>
        <div 
          className='key-bind'>
          {this.props.slot.key}
        </div>
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
                slot= {slot} />
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
        for (var k = 0; k < items.length; k++) {
          if (name == items[k].item.name) {
            steps.push(items[k].item);
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
    var showChallengeEmpty = 'clear-list ';

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
    if (this.state.steps.length) {
      showChallengeEmpty += 'hide';
    }

    return (
      <div 
        id='tab-set-challenge'
        className='select-challenge same-line-top tab-content'>
        <h2
          className='tab-title text-center'>
          Create your own challenge or use defaults
        </h2>
        <section className='center-block'>
          <label>Custom skills to add to challenge</label>
          <ul className='custom-step clear-list'>
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
          <div className='top-10'>
            <label>Default challenges</label>
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
          <div className='preview-challenge'>
            <h4>Preview challenge</h4>
            <ul className={showChallengeEmpty}>
              <li className='same-line zoom-challenge no-item-challenge'></li>
              <li className='same-line zoom-challenge no-item-challenge'></li>
              <li className='same-line zoom-challenge no-item-challenge'></li>
              <li className='same-line zoom-challenge no-item-challenge'></li>
              <li className='same-line zoom-challenge no-item-challenge'></li>
            </ul>
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
            <button 
              onClick={this.clearChallenge}
              className='button btn-default'>
              Clear
            </button>
            <button 
              onClick={this.setChallenge}
              className='button btn-default'>
              Set challenge
            </button>
          </div>
        </section>
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
      countDown: null,
      urlChallenge: '<- Challenge your friend',
      wasChallenge: false,
      friendData: {
        msg: '',
        time: ''
      }
    };
  },
  componentDidMount: function() {
    var id = $('#challenge').text() || '';
    if (id.length) {
      API.consume('getChallenge', 
        {id: id},
        this.searchChallenge);
    }
  },
  searchChallenge: function(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    if (res.msg != 'OK') {
      console.log(res.msg);
      return;
    }
    var data = res.data;
    var steps = data.list;
    var friendData = this.state.friendData;
    friendData.time = data.time;
    this.setState({
      friendData: friendData
    });
    this.setChallenge(steps, true);
  },
  setChallenge: function(steps, wasChallenge) {
    this.props.changeTabGame();
    wasChallenge = wasChallenge || false;
    this.stop();
    this.setState({
      challenge: this.state.challenge.set(steps),
      startButton: 'Start',
      wasChallenge: wasChallenge
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
  generateUrl: function() {
    var data = {};
    data.time = this.state.challenge.challengeLog.time;
    data.list = this.state.challenge.wishSteps;

    API.consume('createChallenge',
      {data: data}, this.setUrlChallenge);
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
    var challenge = this.state.challenge.stop();
    
    this.setState({
      challenge: challenge
    });
  },
  setUrlChallenge: function(err, res) { 
    if (err) {
      console.log(err);
      return;
    }
    if (res.msg != 'OK') {
      console.log(res.msg);
      return;
    }
    console.log(res);
    var url = window.location.host +'/'+res.url;
    this.setState({
      urlChallenge: url
    });
  },
  clickTarget: function() {
    dispatcher.execute('clickTarget');
  },
  render: function() {
    var show = this.state.challenge.isOver? '': 'hide';
    var classMessage = 'message-block ';
    if (this.state.message.length == 0 ){
      classMessage = ' hide'
    }
    var showFriendData= this.state.wasChallenge? '': 'hide';
    return (
      <div className='challenge-block'>
        <h2 
          className='tab-title text-center'> 
          Start your challenge
        </h2>
        <button 
          className='button btn-default'
          onClick={this.start}>
          {this.state.startButton}
        </button>
        <ul className='clear-list'>
          {this.state.challenge.wishSteps.map(function(step ,i) {
            return (
              <ChallengeStep
                key= {i}
                item= {step} />
            )
          }, this)}
        </ul>
        <div 
          className={show}>
          <div>
            Time {this.state.challenge.challengeLog.time} seconds
          </div>
          <div className={showFriendData}>
            Your friend finished this 
            <span className='cross-out'> stupid </span>
             challenge in {this.state.friendData.time} seconds
          </div>
          <button 
            className='button btn-default'
            onClick={this.generateUrl}>
            Generate Url  
          </button>
          <span>
            <b> {this.state.urlChallenge}</b>
          </span>
          <SummaryView 
            summary = {this.state.challenge.challengeLog}/>
        </div>
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

SummaryView = React.createClass({
  format3Decimals: function(num) {
    return num/ 1000;
  },
  render: function() {
    var self = this;
    var actions = this.props.summary.listSkills.map(function (action) {
      var className ='same-line zoom-challenge '+ action.srcImg;
      var castTime = self.format3Decimals(action.castTime);
      var hitTime = self.format3Decimals(action.hitTime);
      var duration = self.format3Decimals(action.duration);
      var statusClass ='fa fa-' + (action.status ? 'check': 'close')
      return( 
        <tr>
          <td>
            <div className={className}>
            </div>
          </td>
          <td>{castTime}</td>
          <td>{hitTime}</td>
          <td>{duration}</td>
          <td>
            <i className={statusClass}>
            </i>
          </td>
        </tr>
      );
    });
    return (
      <div className='summary'>
        <h3>Summary</h3>
        <table className='summary-table'>
          <thead>
            <tr>
              <th>Action</th>
              <th>cast time</th>
              <th>hit time</th>
              <th>duration time</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {actions}
          </tbody>
        </table>    
      </div>
    )
  }
});

var PickHeroView = React.createClass({
  render: function() {
    return(
      <section id='tab-pick-hero'
        className='tab-content'>
        <h2
          className='tab-title text-center'>
          Choose a hero
        </h2>
        <div 
          className='soon text-center'>
          Coming soon
        </div>
      </section>
    );
  }
});

var PickItemView = React.createClass({
  render: function() {
    return(
      <section id='tab-pick-item'
        className='tab-content'>
        <h2
          className='tab-title text-center'>
          Choose your items
        </h2>
        <div 
          className='soon text-center'>
          Coming soon
        </div>
      </section>
    );
  }
});

var SettingsView = React.createClass({
  render: function() {
    return(
      <section id='tab-settings'
        className='tab-content'>
        <h2
          className='tab-title text-center'>
          Set your custom keys and moregit
        </h2>
        <div 
          className='soon text-center'>
          Coming soon
        </div>
      </section>
    );
  }
});

var BaseTemplate = React.createClass({
  getInitialState: function() {
    dispatcher.subscribe('clearHero', this.clearHero);
    var tm = new TabsManager([
      new Tab({
        name: 'pickHero',
        text: '1) Pick hero',
        target: '#tab-pick-hero'
      }), new Tab({
        name: 'pickItem',
        text: '2) Pick items',
        target: '#tab-pick-item'
      }), new Tab({
        name: 'settings',
        text: '3) Settings',
        target: '#tab-settings'
      }), new Tab({
        name: 'setChallenge',
        text: '4) Set Challenge',
        target: '#tab-set-challenge'
      }), new Tab({
        name: 'goGame',
        text: '5) Go game',
        target: '#tab-game'
      })
    ]);
    return {
      tabsMng: tm,
      data: this.props.data,
      itemsSlots: new ItemsSlots()
    };
  },
  componentDidMount: function() {
    var heroSelected;
    heroSelected = heroMng.heros['invoker'];
    this.updateHero(heroSelected);
    this.changeTab(3);
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
      actualSkill = skills[i];
      data.skills[i].obj = actualSkill;
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
    
    if (this.state.data.name == 'invoker') {
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
    }
  },
  changeTabGame: function() {
    this.changeTab(4);
  },
  changeTab: function(index) {
    var activeTab = this.state.tabsMng.activeTab;
    var tabs = this.state.tabsMng.tabs;
    var id;
    if (activeTab > -1) {
      id = tabs[activeTab].target;
      $(id).removeClass('tab-show');
    }
    id = tabs[index].target;
    $(id).addClass('tab-show');

    this.setState({
      tabsMng: this.state.tabsMng.changeTab(index)
    });
  },
  render: function() {
    var self = this;
    var activeTab = this.state.tabsMng.activeTab;

    var tabs = this.state.tabsMng.tabs.map(function(item, i) {
      var itemClass = 'tab-item button ';
      if (i == activeTab) {
        itemClass+= 'selected';
      }
      return (
        <li 
          className='same-line-top'>
          <span 
            className={itemClass}
            onClick={self.changeTab.bind(null, i)}>{item.name}
          </span>
        </li>
      )
    });
    return (
      <div>
        <h1 className='game-title text-center'>DOTA PRACTICE</h1>
        
        <section>
          <ul className='clear-list text-center'>
            {tabs}
          </ul>
        </section>

        <PickHeroView />
        <PickItemView />
        <SettingsView />
        <SelectChallenge
          heroSelected={this.state.data}
          itemsSelected={this.state.itemsSlots} />

        <div 
          id='tab-game'
          className='main-block same-line tab-content'>
          <ChallengeTemplate 
            changeTabGame= {this.changeTabGame}
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

      </div>
    );
  }
});
