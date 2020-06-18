const rp = require('request-promise');
var jwt = require('jsonwebtoken');
const cancelAppt = (req, res, next) => {

  if (checkingForValidParams(req)) {
    var tokenkey = req.headers.authorization;
    var  token = GenarateToken(
        tokenkey,
        req.body.memberId);
        console.log("token",token)
    var options = {
      method: 'PUT',
      url: "https://appointmentserviceapp-1591774967422.azurewebsites.net/cancel",
      headers: {
        "Content-Type": "application/json",
        "X-correlationid": req.get('X-correlationId')
      },
      body: {
        "id": req.body.id, //"333303", //"333301",
        "memberId": req.body.memberId, //"222205", //"222204", //
        "token": token

      },
      json: true
    };
    rp(options)
      .then(function (response) {
        var successObject = {
          "statusCode": 200,
          "Message": "Cancelled "
        }
        res.send(successObject)
      })
      .catch(function (err) {

        var errorObject = {
          "statusCode": 404,
          "Message":  err.response.data.message ? err.response.data.message : "Some error occured with the service"
        }
        res.send(errorObject);

      })
  }
  else {
    var errorObject = {
      "statusCode": 400,
      "Message": "Missing Input"
    }
    res.send(errorObject);
  }

}
const checkingForValidParams = (req) => {
  const corelationid = req.get('X-correlationid');
  const token = req.headers.authorization;
  if ((corelationid && corelationid != null) && (token && token != null)) {
    return true;
  } else {
    return false
  }
}

const GenarateToken = function (key, memberId) {

  let genaratedToken = jwt.sign({
      token: key
  }, memberId.toString());

  return genaratedToken;

}



module.exports.cancelAppt = cancelAppt;