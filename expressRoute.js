'use strict';
const rescheduleConroller = require('./controllers/reschedule.controller');
const cancelController = require('./controllers/cancelAppointment');
const express = require('express'),
router = express.Router();

router.put('/Appointment', rescheduleConroller.rescheduleAppointment);
router.post('/Appointment', require('./controllers/scheduleController'));
router.put('/cancelAppointment', cancelController.cancelAppt);

module.exports = router;
