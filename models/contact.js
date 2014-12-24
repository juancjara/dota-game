var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ContactSchema = new Schema({
  sup: String,
  feel: String,
  content: String,
  createAt: { type: Date, default: Date.now }
});

ContactSchema.create = function(data, cb) {
  var contact = new Contact(data);
  contact.save(function(err) {
    if (err) return cb(err);
    return cb(null, contact);
  });
};

var Contact = module.exports =
    mongoose.model('Contact', ContactSchema);