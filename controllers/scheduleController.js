"use strict";
const rp = require('request-promise');
const scheduleAppointments = function (req, res) {
    if (validateParms(req)) {
        let options = buildOptions(req)
        rp(options)
            .then(function (parsedBody) {
                res.send(parsedBody);
            })
            .catch(function (err) {
                res.status(err.statusCode);
                res.send(err);
            });
    } else {
        res.status(400).send('invalid data input');
    }
};

const buildOptions = function (req) {
    const options = {
        method: 'POST',
        uri: 'https://appointmentserviceapp-1591774967422.azurewebsites.net/schedule',
        headers: {
            "Content-Type": "application/json",
            "X-correlationid": req.get('X-correlationid')
        },
        body: {
            "memberId": req.body.memberId,
            "token": req.headers.authorization,
            "appointmentSlot": req.body.appointmentSlot,
            "facilityId": req.body.facilityId
        },
        json: true
    };
    return options;
}

const validateParms = function (req) {
    const corelationid = req.get('X-correlationid');
    const token = req.headers.authorization;
    if ((corelationid && token && req.body.facilityId && req.body.appointmentSlot && req.body.memberId)) {
        return true;
    } else {
        return false
    }
}

module.exports = scheduleAppointments;