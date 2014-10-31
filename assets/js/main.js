wtfMode = true;
legacyMode = false;

$(function() {
	/*$.getJSON('assets/data/invoker.json', function(data) {
		console.log(data);
	});*/	

  var skillUsed = function(index, click) {
    var name = dispatcher.execute('getSkillName', index); 
    if ((name == 'ghost walk' || name == 'forge spirit') || click) {
      dispatcher.execute('useSkill', name); 
    } else {
      var func = function() {
        skillUsed(index, true);
      };
      dispatcher.subscribe('clickTarget', func);
    }
  }
  var data2 = {
    "name": "none",
    skills: [
      {
        "obj": {
          "name": "none",
          fun: function() {}
        },
        "key": "q"
      },
      {
        "obj": {
          "name": "none",
          fun: function() {}
        },
        "key": "w"
      },
      {
        "obj": {
          "name": "none",
          fun: function() {}
        },
        "key": "e"
      },
      {
        "obj": {
          "name": "none",
          fun: function() {}
        },
        "key": "d"
      },
      {
        "obj": {
          "name": "none",
          fun: function() {}
        },
        "key": "f"
      },
      {
        "obj": {
          "name": "none",
          fun: function() {}
        },
        "key": "r"
      }
    ],
    extraSkills: []
  }

	var data = {
  "name": "invoker",
  "skills": [
    {
      "obj": {
        "name": "quas1",
        "abr": "q",
        "key": "q",
        fun: function() {
          eventsLog.addKey('q');
        }
      },
      "key": "q"
    },
    {
      "obj": {
        "name": "wex1",
        "abr": "w",
        "key": "w",
        fun: function() {
          eventsLog.addKey('w');
        }
      },
      "key": "w"
    },
    {
      "obj": {
        "name": "exort1",
        "abr": "e",
        "key": "e",
        fun: function() {
          eventsLog.addKey('e');
        }
      },
      "key": "e"
    },
    {
      "obj": {
        "name": "extra1",
        "key": "d",
        fun: function() {
          skillUsed(3);
        }
      },
      "key": "d"
    },
    {
      "obj": {
        "name": "extra2",
        "key": "f",
        fun: function() {
          skillUsed(4);
        }
      },
      "key": "f"
    },
    {
      "obj": {
        "name": "book",
        "key": "r",
        fun: function() {
          var extraSkills = data.extraSkills;
          var i = 0;
          var lastSkill = dispatcher.execute('getLastSkill', null);
          for (i = 0; i < data.extraSkills.length; i++) {
            var dep =  data.extraSkills[i].dependencies;
            var nameSkill = data.extraSkills[i].name;
            if (lastSkill != nameSkill && eventsLog.isSameState(dep)) {
              dispatcher.execute('changeSkill', i);
              break;
            }
          };
          
        }
      },
      "key": "r"
    }
  ],
  "extraSkills": [
    {
      "name": "cold snap",
      "dependencies": "qqq"
    },
    {
      "name": "sun strike",
      "dependencies": "eee"
    },
    {
      "name": "ghost walk",
      "dependencies": "qqw"
    },
    {
      "name": "ice wall",
      "dependencies": "qqe"
    },
    {
      "name": "emp",
      "dependencies": "www"
    },
    {
      "name": "tornado",
      "dependencies": "wwq"
    },
    {
      "name": "alacrity",
      "dependencies": "wwe"
    },
    {
      "name": "forge spirit",
      "dependencies": "eeq"
    },
    {
      "name": "chaos meteor",
      "dependencies": "eew"
    },
    {
      "name": "defeaning blast",
      "dependencies": "qwe"
    }
  ]
};

	React.renderComponent(
		BaseTemplate({data: data2}),
		document.getElementById('main')
	);
});