var express = require('express'),
  router = express.Router(),
  Users = require('../models/users'),
  bodyParser = require('body-parser');

router.use( bodyParser.json() );
router.use( bodyParser.urlencoded({ extended: true }) );

router.get('/all', function(req, res) {
  Users.all(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  })
})

router.get('/recent', function(req, res) {
  Users.recent(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  })
})

router.post('/insert', function(req, res) {
  var name = req.body.username;
  var email = req.body.email;
  var date = new Date();

  var user = {
    "nombre": name,
    "email": email,
    "_createdAt": date
  };

  Users.create(user, function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to insert user.");
    } else {
      res.status(200).json(docs);
    }
  })
})

module.exports = router
