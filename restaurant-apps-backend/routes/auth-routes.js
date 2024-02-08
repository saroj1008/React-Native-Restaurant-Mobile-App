// Require the Express package and create a router object
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controllers');

router.post('/login', authController.loginOwner);


module.exports = router;