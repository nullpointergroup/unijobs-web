var db = require('../db')

exports.all = function(callback) {
  var collection = db.get().collection('users')

  collection.find().toArray(function(err, docs) {
    callback(err, docs)
  })
}

exports.recent = function(callback) {
  var collection = db.get().collection('users')

  collection.find().sort().limit(100).toArray(function(err, docs) {
    callback(err, docs)
  })
}

exports.create = function(user, callback) {
  console.log(user);
  var collection = db.get().collection('users')
  collection.insertOne(user, function(err, result) {
    callback(err, result);
  })
}
