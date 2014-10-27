/** @jsx React.DOM */

var SkillSlot = React.createClass({
  render: function() {
    return (
      <li key= {this.props.key}>
        {this.props.item.name}
      </li>
    );
  }
});

var SkillList = React.createClass({
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
  getSkillName: function(index) {
    console.log('getSkillName');
    return this.state.skills[index].obj.name;
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
    var extraSkills = this.state.extraSkills;
    var skills = this.state.skills;
    var keyBind;
    var temp4fun = skills[4].obj.fun;
    var temp3fun = skills[3].obj.fun;

    /*for (var i = 3; i <=4 ; i++) {
      keyBind = skills[i].key;
      dispatcher.unsubscribeKey(keyBind);
    };

    skills[4].obj = skills[3].obj;
    skills[3].obj = extraSkills[index];



    skills[4].obj = skills[3].obj;
    skills[4].obj.fun = temp4fun;
    skills[3].obj = extraSkills[index];
    skills[3].obj.fun = temp3fun;
    */
    //TODO no funciona xq custom no existe para el contexto deseado hay que pensar
    //se puede actualizar solo los datos internos necesarios o tener un listener especial
    // para manjear nuevos keys
/*
    for (var i = 3; i <=4 ; i++) {
      keyBind = skills[i].key;
      dispatcher.subscribeKey(keyBind,
        this.createFun(skills[i].obj));
    };*/
    
    this.setState({
      skills: skills,
      lastSkill: extraSkills[index].name
    });
  },
  render: function() {
    return (
      <ul>
        {this.state.skills.map(function(item, i) {
          return ( <SkillSlot 
            key= {i}
            item= {item.obj} />
          )
        }, this)}
      </ul>
    );
  }
});

var ItemSlot = React.createClass({
  render: function() {
    return (
      <li key= {this.props.key}>
        {this.props.item.name}
      </li>
    );
  }
});

var ItemList = React.createClass({
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
      <ul>
        {this.state.itemsSlots.slots.map(function(slot ,i) {
          return (
            <ItemSlot
              key= {i}
              item= {slot.item} />
          )
        }, this)}
      </ul>
    );
  }
});

var HeroTemplate = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    console.log('newData', nextProps)
  },
  render: function() {
    return (
      <div>
        <div>{this.props.heroData.name}</div>
        <SkillList 
          list={this.props.heroData.skills}
          extraSkills= {this.props.heroData.extraSkills} />
      </div>
    );
  }
});

var ChallengueStep = React.createClass({
  render: function() {
    return (
      <li key= {this.props.key}>
        {this.props.item}
      </li>
    );
  }
});

var SelectChallenge = React.createClass({
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
      <div>
        <label>to do</label>
        <button onClick={this.setChallenge}>Setear reto</button>
        <ul>
          {this.state.steps.map(function(step ,i) {
            return (
              <li
                key= {i}>
                {step}
              </li>
            )
          }, this)}
        </ul>
        <label>escoger de aca</label>
        <ul>
          {this.state.stepsToChooseFrom.map(function(step ,i) {
            return (
              <li
                key= {i}
                onClick={this.addStep.bind(null, i)} >
                {step}
              </li>
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
  selectHero: function() {
    var heroSelected, heroMng;
    heroMng = new HeroManager();
    heroMng.create();
    heroSelected = heroMng.heros[0];
    this.props.updateHero(heroSelected);
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
    return (
      <div class='list'>
        <button 
          onClick={this.selectHero}>cambiar hero</button>
        <SelectChallenge 
          setChallenge={this.setChallenge} />
        <button 
          onClick={this.start}>Iniciar</button>
        <div>Tiempo {this.state.challenge.timer.time} segundos</div>
        <label>Challengue</label>
        <ul>
          {this.state.challenge.expectedSteps.map(function(step ,i) {
            return (
              <ChallengueStep
                key= {i}
                item= {step} />
            )
          }, this)}
        </ul>
        <div 
          className='target'
          onClick={this.clickTarget}>
          Enemigo
          </div>
      </div>
    );
  }  
});

var BaseTemplate = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    };
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

    this.setState({
      data: data
    });
  },
  render: function() {
    return (
      <div>
        <ChallengeTemplate 
          updateHero={this.updateHero} />
        <span>INVOKER GAME</span>
        <HeroTemplate heroData={this.state.data} />
        <ItemList />
      </div>
    );
  }
});

//TODO setear skill a key solo una vz xq sino se cambia legacyMode en cualquier lugar
//y gg nadie sabe en q momento fue