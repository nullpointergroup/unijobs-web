var express = require('express'),
  http = require('http'),
  path = require('path'),
  bodyParser = require("body-parser"),
  mongodb = require("mongodb"),
  logger = require('morgan'),
  app = express(),
  db = require('./server/db'),
  mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/unijobs2016',
  ObjectID = mongodb.ObjectID;

app.use(logger("combined"));
app.use(express.static(__dirname + "/app"));
app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());

// Controladores
var userController = require('./server/controllers/users.js');

app.use('/users', require('./server/controllers/users'))

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/all', function(req, res) {
  var collection = db.get().collection('foods');
  var taco = { name: "taco3", tasty: false, createdAt: new Date() };
  collection.insert(taco, function(err, result) {
    collection.find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    })
  })
})

app.get('/hello', function (req, res) {
  res.send('Hellow');
});

// Connect to Mongo on start
db.connect(mongoUri, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 5000, function() {
      console.log('Listening on port 3000...')
    });
  }
});
