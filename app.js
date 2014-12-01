var express = require('express');
var app = express();
var rMain = require('./routes/rMain');
var rChallenge = require('./routes/rChallenge');
var config = require('./config');
var mongoose = require('mongoose');
var session = require("express-session");
var bodyParser = require('body-parser');

mongoose.connect(config.db.connectionString);

//app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/assets', express.static(__dirname + '/assets'));
app.use(session({secret: config.session.secret, saveUninitialized: true, resave: true}));
app.use(bodyParser.json()); 


var env = process.env.NODE_ENV || 'dev';
var port = (env == 'pro') ? 7777: 7771;
app.listen(port);

app.get('/', rMain.index);
app.get('/:id', rMain.getChallenge);

app.post('/challenge/create', rChallenge.create);
app.post('/challenge/search', rChallenge.search);

console.log("Dota practice");
console.log("Environment " + env);
console.log('Listenning '+ port);