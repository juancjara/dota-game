exports.index = function(req, res) {
  res.render('index');
};

exports.getChallenge = function(req, res) {
  res.render('index', {
    id: req.params.id
  });
};