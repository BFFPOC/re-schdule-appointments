const request = require('request-promise');
const getAppointments = (req, res, next) => {
  const options = {
    method: 'GET',
    uri: 'https://appointmentserviceapp-1591774967422.azurewebsites.net/getAppointments/' + req.params.id
  }
  request(options)
    .then(function (response) {
      res.send(response)
    })
    .catch(function (err) {
      var errorObject = {
        "statusCode": 404,
        "Message": "Some error occured with the service"
      }
      res.send(errorObject);
    })


}




module.exports.getAppointments = getAppointments;