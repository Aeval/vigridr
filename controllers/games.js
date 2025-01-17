const md5 = require('md5');
const jwt = require('jsonwebtoken');
const keys = require('../keys.js');

exports.getGames = function (req, res) {
  var db = req.db;
  var collection = db.get('games');
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
}

exports.submitVote = function (req, res) {
  var db = req.db;
  var userdb = db.get('users');
  var votesdb = db.get('votes');
  var gameid = req.body.gameid;
  var user = req.body.user;
  var key = 'gamevotes.' + gameid;
  var obj = {};
  var vote = getInt(req.body.vote);
  obj[key] = vote;
  userdb.update({
    'username': user
  }, {
    $inc: obj
  }, function (err, result) {
    votesdb.update({
      'gameid': gameid
    }, {
      $inc: {
        'votes': vote
      }
    }, function (err, result) {});
    res.send(
      (err === null) ? {
        msg: ''
      } : {
        msg: err
      }
    );
  });
}

exports.getGameChart = function (req, res) {
  var db = req.db;
  var collection = db.get('votes');
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
}

exports.getTop5Games = function (req, res) {
  var db = req.db;
  var collection = db.get('votes');
  collection.find({}, {
    limit: 3,
    sort: {
      votes: -1
    }
  }, function (e, docs) {
    res.json(docs);
  });
}

function getInt(num, base) {
  var parsed = parseInt(num, base);
  if (isNaN(parsed)) {
    return 0
  }
  return parsed;
}