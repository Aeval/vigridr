var express = require('express');
var router = express.Router();

router.get('/games', function(req, res) {
  var db = req.db;
  var collection = db.get('games');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

module.exports = router;