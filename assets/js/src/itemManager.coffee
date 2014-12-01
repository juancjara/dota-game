ItemManager = () ->
  this.items = {}
  return

ItemManager::create = () ->
  this.items['dagon'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon',
    endDurationDmg: 800
  }
  this.items['ethereal'] = new Item {
    name: 'ethereal',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'ethereal',
    endDurationDmg: 75

  }
  this.items['eul'] = new Item {
    name: 'eul',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'eul',
    duration: 2.5,
    endDurationDmg: 50,
    effect: 'invulnerable'
  }
  this.items['scythe'] = new Item {
    name: 'scythe',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'scythe',
    duration: 3.5,
    effect: 'hex'
  }
  this.items['shiva'] = new Item {
    name: 'shiva',
    clickNeeded: false,
    secondsCd: 2,
    srcImg: 'shivas',
    endDurationDmg: 200,
    effect: 'slow'
  }
  this.items['no-item'] = new Item {
    name: '',
    clickNeeded: false,
    srcImg: 'no-item'
  }
  return this