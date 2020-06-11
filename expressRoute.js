'use strict';
const rescheduleConroller = require('./controllers/reschedule.controller');
const express = require('express'),
router = express.Router();

router.put('/rescheduleAppointment', rescheduleConroller.rescheduleAppointment);

module.exports = router;
