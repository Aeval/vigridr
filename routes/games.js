const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');

router.get('/games', gamesController.getGames);

module.exports = router;