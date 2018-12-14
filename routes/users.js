const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

//const checkAuth = require('../middleware/check-auth');

/* GET users */
router.get('/users', userController.getAllUsers);

// GET specific user by username
router.get('/getuser/:username', userController.getUser);

// Update user cookie
router.post('/updateCookie', userController.updateCookie);

/* POST to adduser */
router.post('/adduser', userController.addUser);

// Login
router.post('/login', userController.login);

module.exports = router;
