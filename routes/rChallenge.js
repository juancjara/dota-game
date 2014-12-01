var mongoose = require('mongoose');
var ChaFriend = require('./../models/challengeFriend');
var config = require('./../config');

exports.create = function(req, res) {
  ChaFriend.create(req.body.data, 
    function(err, data) {
      err = err || 'OK';
      res.send({
        msg: err,
        url: data._id
      });
    }
  );
};

exports.search = function(req, res) {
  ChaFriend.findById(req.body.id, {}, 
    function(err, challenge) {
      err = err || 'OK';
      challenge = challenge || {};
      res.send({
        msg: err,
        data: challenge
      });
    }
  );
};