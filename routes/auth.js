const express = require('express');
const authController = require('../public/controllers/auth.js');
const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router;