var express = require('express');
var http = require('http');
var logger = require('morgan');
var app = express();
app.use(logger());

app.get('/', function (req, res) {
  res.render('index.html');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 5000);
