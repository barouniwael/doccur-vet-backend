
const express = require('express');
const router = express.Router();
const appointementController = require('../controllers/appointement')


router.post('/schedule', appointementController.postSchedule);
router.get('/schedule/:day', appointementController.getSchedule);
router.delete('/schedule/:timeSlot/:day', appointementController.deleteSchedule);


module.exports = router;