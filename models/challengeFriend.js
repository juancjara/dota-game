var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var challengeFriendSchema = new Schema({
  time: String,
  list: Schema.Types.Mixed,
  createAt: { type: Date, default: Date.now }
});

challengeFriendSchema.create = function(data, cb) {
  var challenge = new ChallengeFriend(data);
  challenge.save(function(err) {
    if (err) return cb(err);
    return cb(null, challenge);
  });
};

var ChallengeFriend = module.exports =
    mongoose.model('ChallengeFriend', challengeFriendSchema);