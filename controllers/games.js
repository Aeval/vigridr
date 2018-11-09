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
    var collection = db.get('users');
    var user = req.body.user
    var key =  'gamevotes.' + req.body.gameid;
    var obj = {};
    var vote = getInt(req.body.vote);
    obj[key] = vote;
    collection.update({'username': user}, {$inc: obj}, function(err, result){
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