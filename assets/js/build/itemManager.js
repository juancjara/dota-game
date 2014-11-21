var ItemManager;

ItemManager = function() {
  this.items = {};
};

ItemManager.prototype.create = function() {
  this.items['dagon'] = new Item({
    name: 'dagon',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'dagon'
  });
  this.items['ethereal'] = new Item({
    name: 'ethereal',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'ethereal'
  });
  this.items['eul'] = new Item({
    name: 'eul',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'eul'
  });
  this.items['scythe'] = new Item({
    name: 'scythe',
    clickNeeded: true,
    secondsCd: 2,
    srcImg: 'scythe'
  });
  this.items['shivas'] = new Item({
    name: 'shivas',
    clickNeeded: false,
    secondsCd: 2,
    srcImg: 'shivas'
  });
  this.items['no-item'] = new Item({
    name: '',
    clickNeeded: false,
    srcImg: 'no-item'
  });
  return this;
};
