var mongoose = require('mongoose');
var Contact = require('./../models/contact');
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "jcdevelopment1991@gmail.com",
        pass: "recontragg703"
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols

// send mail with defined transport object
function sendMail(mailOptions) {

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
}

exports.index = function(req, res) {
  res.render('index');
};

exports.getChallenge = function(req, res) {
  res.render('index', {
    id: req.params.id
  });
};

exports.sendMessage = function(req, res) {
  var mailOptions = {
    from: "Dota practice <jcdevelopment1991@gmail.com>",
    to: "juanc.jara@pucp.pe",
    subject: "Dota practice "+ req.body.sup,
    text: 'gg',
    html: req.body.feel+' '+req.body.content
  };
  sendMail(mailOptions);
  Contact.create(req.body,
    function(err, data) {
      err = err || 'OK';
      res.send({
        msg: err,
        url: data._id
      });
    }
  );
};