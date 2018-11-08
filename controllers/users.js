var md5 = require('md5');
var jwt = require('jsonwebtoken');
var keys = require('../keys.js');

exports.login = function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({'username': req.body.username.toUpperCase()}, function(e,user){
      var inputPass = md5(req.body.password);
      var userPass = '';
      if(user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed!'
        });
      }else{
        userPass = user[0].password;
  
        if(userPass !== inputPass){
          return res.status(401).json({
            message: 'Incorrect Password!'
          });
        }else{
          var token = jwt.sign({
            user: user[0].username,
            email: user[0].email,
            first: user[0].firstname,
            last: user[0].lastname,
            company: user[0].company
          }, keys, {
            expiresIn: "1h" 
          })
          //look at video "form data"
          return res.status(200).json({
            message: 'Auth successful!',
            token: token,
            user: user[0].username
          });
        }
      }
    });
  }

  exports.addUser = function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    var user = {
      username: req.body.username.toUpperCase(),
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      company: req.body.company,
      password: md5(req.body.password)
    };
    collection.insert(user, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    }); 
  }

  exports.getUser = function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    var userToFind = req.params.username.toUpperCase();
    collection.find({'username': userToFind}, function(e,docs){
      res.json(docs);
    });
  }

  exports.getAllUsers = function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
      res.json(docs);
    });
  }