/** @jsx React.DOM */

var SkillSlot = React.createClass({displayName: 'SkillSlot',
  render: function() {
    return (
      React.DOM.li({key: this.props.key}, 
        this.props.item.name
      )
    );
  }
});

var SkillList = React.createClass({displayName: 'SkillList',
  getInitialState: function() {
    dispatcher.subscribe('changeSkill', this.changeSkill);
    dispatcher.subscribe('getLastSkill', this.getLastSkill);
    dispatcher.subscribe('getSkillName', this.getSkillName);
    return {
      skills: this.props.list,
      extraSkills: this.props.extraSkills,
      lastSkill: ''
    }
  },
  getSkillName: function(index) {
    return this.state.skills[index].obj.name;
  },
  getLastSkill: function() {
    return this.state.lastSkill;
  },
  componentDidMount: function() {
    for (var i = 0; i < this.state.skills.length; i++) {
      var actualSkill = this.state.skills[i];
      var keyBind = actualSkill.key;
      dispatcher.subscribeKey(keyBind, actualSkill.obj.fun);
    };
  },
  changeSkill: function(index) {
    var extraSkills = this.state.extraSkills;
    var skills = this.state.skills;
    skills[4].obj.name = skills[3].obj.name;
    var newSkill = extraSkills[index].name;
    skills[3].obj.name = newSkill;
    this.setState({
      skills: skills,
      lastSkill: newSkill
    });
  },
  render: function() {
    return (
      React.DOM.ul(null, 
        this.state.skills.map(function(item, i) {
          return ( SkillSlot({
            key: i, 
            item: item.obj})
          )
        }, this)
      )
    );
  }
});

var ItemSlot = React.createClass({displayName: 'ItemSlot',
  render: function() {
    return (
      React.DOM.li({key: this.props.key}, 
        this.props.item.name
      )
    );
  }
});

var ItemList = React.createClass({displayName: 'ItemList',
  getInitialState: function() {
    return {
      itemsSlots: new ItemsSlots()
    }
  },
  componentDidMount: function() {
    var elm;
    var fun = this.state.itemsSlots.launch;
    for (var i = 0; i < this.state.itemsSlots.slots.length; i++) {
      elm = this.state.itemsSlots.slots[i];
      dispatcher.subscribeKey(elm.key, 
        this.createLaunch(fun,this.state.itemsSlots, i));
    }
  },
  createLaunch: function(fun, ctx, index) {
    return function() {
      fun.bind(ctx, index)();
    }
  },
  render: function() {
    return (
      React.DOM.ul(null, 
        this.state.itemsSlots.slots.map(function(slot ,i) {
          return (
            ItemSlot({
              key: i, 
              item: slot.item})
          )
        }, this)
      )
    );
  }
});

var Hero = React.createClass({displayName: 'Hero',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.div(null, this.props.heroData.name), 
        SkillList({
          list: this.props.heroData.skills, 
          extraSkills: this.props.heroData.extraSkills})
      )
    );
  }
});

var ChallengueStep = React.createClass({displayName: 'ChallengueStep',
  render: function() {
    return (
      React.DOM.li({key: this.props.key}, 
        this.props.item
      )
    );
  }
});

var SelectChallenge = React.createClass({displayName: 'SelectChallenge',
  getInitialState: function() {
    var stepsToChooseFrom = ['1', '2', '3', '4', '5', '6', 'cold snap',
        'sun strike', 'ghost walk', 'ice wall', 'emp', 'tornado',
        'alacrity', 'forge spirit', 'chaos meteor', 'defeaning blast'];
    return {
      steps: [],
      stepsToChooseFrom: stepsToChooseFrom
    }
  },
  addStep: function(index) {
    var steps = this.state.steps;
    steps.push(this.state.stepsToChooseFrom[index]);
    this.setState({
      steps: steps
    });
  },
  setChallenge: function() {
    this.props.setChallenge(this.state.steps);
  },
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.label(null, "to do"), 
        React.DOM.button({onClick: this.setChallenge}, "Setear reto"), 
        React.DOM.ul(null, 
          this.state.steps.map(function(step ,i) {
            return (
              React.DOM.li({
                key: i}, 
                step
              )
            )
          }, this)
        ), 
        React.DOM.label(null, "escoger de aca"), 
        React.DOM.ul(null, 
          this.state.stepsToChooseFrom.map(function(step ,i) {
            return (
              React.DOM.li({
                key: i, 
                onClick: this.addStep.bind(null, i)}, 
                step
              )
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
    var a = new Challenge();
    //var steps = ['3', 'cold snap', 'sun strike', '1', '2'];
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
  },
  selectHero: function() {
    //TODO
  },
  start: function() {
    eventsLog.clear();
    dispatcher.unsubscribe('clickTarget');
    this.setState({
      challenge: this.state.challenge.start()
    });
  },
  clickTarget: function() {
    console.log('onclick');
    dispatcher.execute('clickTarget');
  },
  render: function() {
    return (
      React.DOM.div({class: "list"}, 
        SelectChallenge({
          setChallenge: this.setChallenge}), 
        React.DOM.button({
          onClick: this.start}, "Iniciar"), 
        React.DOM.div(null, "Tiempo ", this.state.challenge.timer.time, " segundos"), 
        React.DOM.label(null, "Challengue"), 
        React.DOM.ul(null, 
          this.state.challenge.expectedSteps.map(function(step ,i) {
            return (
              ChallengueStep({
                key: i, 
                item: step})
            )
          }, this)
        ), 
        React.DOM.div({
          className: "target", 
          onClick: this.clickTarget}, 
          "Enemigo"
          )
      )
    );
  }  
});

var BaseTemplate = React.createClass({displayName: 'BaseTemplate',
  getInitialState: function() {
    return {
      data: this.props.data
    };
  },
  render: function() {
    return (
      React.DOM.div(null, 
        ChallengeTemplate(null), 
        React.DOM.span(null, "INVOKER GAME"), 
        Hero({heroData: this.state.data}), 
        ItemList(null)
      )
    );
  }
});