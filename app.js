var express = require('express');
var app = express();
var rMain = require('./routes/rMain');

//app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/assets', express.static(__dirname + '/assets'));

var env = process.env.NODE_ENV || 'dev';
var port = (env == 'pro') ? 7777: 7771;
app.listen(port);

app.get('/', rMain.index);

console.log("Dota practice");
console.log("Environment " + env);
console.log('Listenning '+ port);