const express = require('express');
const dotenv = require('dotenv').config();
const request = require('request');

const BOSCH_GATEWAY_URL = 'https://ews-emea.api.bosch.com/home/sandbox/pointt/v1/gateways';

/* check setup */
if(!process.env.DEVICE_SERIAL_NUMBER
|| !process.env.DEVICE_ACCESS_CODE
|| !process.env.DEVICE_PASSWORD){
  console.log("Missing variables in .env. Please check your .env");
  process.exit();
}

/* currently the JWT is only defined in config, since Bosch's API is currently only in tryout */
const token = process.env.TOKEN;


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

/*
  Default Endpoint is current Room Temperature
*/
app.get("/", function (req, res) {

  /*
    get Getways
  */
  request({
    url: BOSCH_GATEWAY_URL,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/json',
      'Authorization': token
    }
  }, (err, ares, body) => {
    if (err) { return res.json({status: 500, message: err}); }
    if (!body) { return res.json({status: 500, message: body}); }
    // get the last device, probably our registered device. Who has more than one Thermostates?
    let defaultDevice = body.pop();

    request({
      url: BOSCH_GATEWAY_URL+"/"+defaultDevice.deviceId+'/resource/zones/'+process.env.ZONEID+'/temperatureActual',
      json: true,
      headers: {
        'User-Agent': 'request',
        'Accept': 'application/json',
        'Authorization': token
      }
    }, (err, ares, body) => {
      if (err) { return res.json({status: 500, message: err}); }
      return res.json(body);
    });
  });
});

/*
  get current Room Temperature by Device Id
  Hint: Device ID is your serial number
  You might need to pair your Device with your Bosch account to have access on it
*/
app.get("/:deviceId", function (req, res) {

  let deviceId = req.params.deviceId;

  request({
    url: BOSCH_GATEWAY_URL+"/"+deviceId+'/resource/zones/'+process.env.ZONEID+'/temperatureActual',
    json: true,
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/json',
      'Authorization': token
    }
  }, (err, ares, body) => {
    if (err) { return res.json({status: 500, message: err}); }
    return res.json(body);
  });

});

/*
  get target Temperature by Device Id
  Hint: Device ID is your serial number
  You might need to pair your Device with your Bosch account to have access on it
*/
app.get("/:deviceId/targetTemperature", function (req, res) {

  let deviceId = req.params.deviceId;

  request({
    url: BOSCH_GATEWAY_URL+"/"+deviceId+'/resource/zones/'+process.env.ZONEID+'/temperatureHeatingSetpoint',
    json: true,
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/json',
      'Authorization': token
    }
  }, (err, ares, body) => {
    if (err) { return res.json({status: 500, message: err}); }
    return res.json(body);
  });

});

/*
  get target Temperature by Device Id
  Hint: Device ID is your serial number
  You might need to pair your Device with your Bosch account to have access on it
*/
app.get("/:deviceId/targetTemperature/:value", function (req, res) {

  let deviceId = req.params.deviceId;
  let targetTemperature = req.params.value;

  /*
    TODO. Set temperature won't work. I don't know that body it supposed to be.. boschs API documentation sucks at that point
  */

  request({
    method: 'PUT',
    url: BOSCH_GATEWAY_URL+"/"+deviceId+'/resource/zones/'+process.env.ZONEID+'/manualTemperatureHeating',
    json: true,
    body: '{
        "id": "/zones/zn1/userMode",
        "type": "stringValue",
        "writeable": 1,
        "recordable": 0,
      }',/*{}{
      "id": "/zones/"+process.env.ZONEID+"/manualTemperatureHeating",
      "type": "floatValue",
      "writeable": 1,
      "recordable": 0,
      "value": targetTemperature,
      "unitOfMeasure": "C"
    },*/
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }, (err, ares, body) => {
    if (err) { return res.json({status: 500, message: err}); }
    return res.json(body);
  });

});

/*
  start the server
*/
const server = app.listen((process.env.PORT ? process.env.PORT : 80), function() {
  console.log('Bosch-Node-Thermostat-Wrapper is listening on port ' + server.address().port);
});
