var express = require('express');
var http = require('http');
var logger = require('morgan');
var app = express();

app.use(logger());

app.configure(function(){
  app.use(express.static(path.join(__dirname, '/')));
});

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/hello', function (req, res) {
  res.send('Hellow');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 5000);
