ItemManager = () ->
  this.items = {}
  return

ItemManager::create = () ->
  this.items['dagon'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  this.items['dagon 1'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  this.items['dagon 2'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  this.items['dagon 3'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  this.items['dagon 4'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  this.items['dagon 5'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  this.items['dagon 6'] = new Item {
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  }
  return this