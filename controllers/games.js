const md5 = require('md5');
const jwt = require('jsonwebtoken');
const keys = require('../keys.js');

exports.getGames = function(req, res) {
    var db = req.db;
    var collection = db.get('games');
    collection.find({},{},function(e,docs){
      res.json(docs);
    });
  }

  exports.submitVote = function(req, res){
    var db = req.db;
    var collection = db.get('votes');
    var gameid =  req.body.gameid;
    var vote = getInt(req.body.vote);
    collection.update({'gameid': gameid}, {$inc: {'votes': vote}}, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    }); 
  }

  function getInt(num, base){
    var parsed = parseInt(num, base);
    if (isNaN(parsed)) { return 0 }
    return parsed;
  }