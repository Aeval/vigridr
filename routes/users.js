var express = require('express');
var router = express.Router();

/* GET users */
router.get('/users', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

// GET specific user by username
router.get('/getuser/:username', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  var userToFind = req.params.username;
  collection.find({'username': userToFind}, function(e,docs){
    res.json(docs);
  });
});

/* POST to adduser */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
  collection.update
});

module.exports = router;
