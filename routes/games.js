const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');
const checkAuth = require('../middleware/check-auth');

router.get('/games', gamesController.getGames);

router.post('/submitVote', checkAuth, gamesController.submitVote);

module.exports = router;