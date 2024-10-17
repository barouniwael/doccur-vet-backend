
const express = require('express');
const router = express.Router();

const appointementController = require('../controllers/appointement')


router.post('/appointement', appointementController.reqAppointment)
module.exports = router;