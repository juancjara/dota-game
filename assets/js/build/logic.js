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
  componentDidMount: function() {
    
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
      React.DOM.div({className: "hero-skill-slots same-line vert-bot"}, 
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
        key: this.props.key}, 
        this.props.item.name
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

var HeroTemplate = React.createClass({displayName: 'HeroTemplate',
  render: function() {
    var imgHero = 'hero-img '+this.props.heroData.srcImg;
    return (
      React.DOM.div({className: "hero-block same-line-top"}, 
        React.DOM.div({id: "actualState"}), 
        React.DOM.div({className: "hero-details same-line-top"}, 
          React.DOM.div({
            className: "hero-name"}, 
            this.props.heroData.name
          ), 
          React.DOM.div({
            className: imgHero}
          )
        ), 
        SkillList({
          list: this.props.heroData.skills, 
          extraSkills: this.props.heroData.extraSkills})
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
    }
  },
  addStep: function(step) {
    var steps = this.state.steps;
    steps.push(step);
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
      if (skills[0].obj.canBeChallenge) {
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
      itemsToChooseFrom.push(items[i].item);
    };

    return (
      React.DOM.div({className: "select-challenge same-line-top"}, 
        React.DOM.label(null, "to do"), 
        React.DOM.button({onClick: this.setChallenge}, "Setear reto"), 
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
        React.DOM.label(null, "escoger de aca"), 
        React.DOM.ul(null, 
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
      challenge: a
    };
  },
  setChallenge: function(steps) {
    console.log("steps", steps);
    this.setState({
      challenge: this.state.challenge.set(steps)
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
  start: function() {
    eventsLog.clear();
    dispatcher.unsubscribe('clickTarget');
    dispatcher.onEvents();
    this.setState({
      challenge: this.state.challenge.start()
    });
  },
  clickTarget: function() {
    console.log('onclick');
    dispatcher.execute('clickTarget');
  },
  render: function() {
    var show = this.state.challenge.finish? '': 'hidden';
    return (
      React.DOM.div({className: "challenge-block"}, 
        React.DOM.button({
          onClick: this.start}, 
          "Iniciar"
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
    var heroSelected, heroMng;
    heroMng = new HeroManager();
    heroMng.create();
    heroSelected = heroMng.heros[0];
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