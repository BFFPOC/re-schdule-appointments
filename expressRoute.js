'use strict';
const rescheduleConroller = require('./controllers/reschedule.controller');
const cancelController = require('./controllers/cancelAppointment');
const getAppointments=require('./controllers/getAppointments')
const express = require('express'),
router = express.Router();

router.get('/Appointment/:id', getAppointments.getAppointments);
router.put('/Appointment', rescheduleConroller.rescheduleAppointment);
router.put('/cancelAppointment', cancelController.cancelAppt);

module.exports = router;
