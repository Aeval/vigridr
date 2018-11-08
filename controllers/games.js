exports.getGames = function(req, res) {
    var db = req.db;
    var collection = db.get('games');
    collection.find({},{},function(e,docs){
      res.json(docs);
    });
  }