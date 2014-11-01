wtfMode = true;
legacyMode = false;
heroMng = new HeroManager();
itemMng = new ItemManager();

listChallenge = [
  [
    {name:'emp', srcImg: 'emp', src: 'extraSkills'}, 
    {name:'tornado', srcImg: 'tornado', src: 'extraSkills'},
    {name:'sun strike', srcImg: 'sun_strike', src: 'extraSkills'}, 
    {name:'chaos meteor', srcImg: 'chaos_meteor', src: 'extraSkills'},
    {name:'deafening blast', srcImg: 'deafening_blast', src: 'extraSkills'}
  ],
  [
    {name:'forge spirit', srcImg: 'forge_spirit', src: 'extraSkills'}, 
    {name:'cold snap', srcImg: 'cold_snap', src: 'extraSkills'},
    {name:'emp', srcImg: 'emp', src: 'extraSkills'}, 
    {name:'ice wall', srcImg: 'ice_wall', src: 'extraSkills'},
    {name:'alacrity', srcImg: 'alacrity', src: 'extraSkills'}
  ]
]

$(function() {
  heroMng.create();
  itemMng.create();

  var data = {
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
  };
	React.renderComponent(
		BaseTemplate({data: data}),
		document.getElementById('main')
	);
});