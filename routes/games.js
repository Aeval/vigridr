const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');
const checkAuth = require('../middleware/check-auth');

router.get('/games', gamesController.getGames);

router.post('/submitVote', checkAuth, gamesController.submitVote);

router.get('/getChart', gamesController.getGameChart);

router.get('/getTop5Games', gamesController.getTop5Games);

router.get('/getCalledGames', gamesController.getCalledGames);

module.exports = router;