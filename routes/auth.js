
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')




router.post('/register', authController.register)
router.post('/verify', authController.verify)
router.post('/login', authController.login)
router.post('/loginPhone', authController.loginPhone)
module.exports = router;