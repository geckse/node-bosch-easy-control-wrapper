# Node.js Bosch Easy Control Wrapper
Uses Bosch Thermotechnology Device API to control my Bosch Easy Control Thermostat

## Idea
This Node js Server might run in my local network on a Raspberry PI and creates some simple Endpoints via an Express REST API I might utilize in different iot devices or bots. Donnu.

## Prerequisites
You'll need a Bosch Thermotechnology Device, like a Bosch Easy Control.

All the developer resources:
https://developer.bosch.com/web/bosch-thermotechnology-device-api/tryout/product/api#/Gateway3240Hardware41

You also might need to pair your Device with your Bosch Account.

## Setup

The App requires a ```.env``` file with some access codes and passwords.
Just copy and rename the .env.sample and fill in your credentials.

And you'll need a valid JWT from for your requests. I did'nt found a OAuth-Method for my Developer Account since Bosch Thermotechnology’s Energy Management System is in Sandbox mode and not really published yet.

## Endpoints of the REST api

### Home
Returns current Room Temperature Resource of your latest device
Analogous response from Boschs API Gateway *.../temperatureActual*

```
GET /
```

**Example Response:**
```
{
   "id":"/zones/zn1/temperatureActual",
   "type":"floatValue",
   "writeable":0,
   "recordable":0,
   "value":20.2,
   "used":"true",
   "unitOfMeasure":"C",
   "minValue":5,
   "maxValue":30,
   "stepSize":0.5
}
```

### Get current Temperature of Device
Returns current Room Temperature Resource of your given device
Hint: deviceId is the Serial-ID of your Device. Needed to paired to your Bosch Account
Analogous response from Boschs API Gateway *.../temperatureActual*

```
GET /:deviceId
```

**Example Response:**
```
{
   "id":"/zones/zn1/temperatureActual",
   "type":"floatValue",
   "writeable":0,
   "recordable":0,
   "value":20.2,
   "used":"true",
   "unitOfMeasure":"C",
   "minValue":5,
   "maxValue":30,
   "stepSize":0.5
}
```

### Get current Target Temperature of Device
Returns current Setpoint Temperature of your Device
Analogous response from Boschs API Gateway *.../temperatureHeatingSetpoint*

```
GET /:deviceId/targetTemperature
```

**Example Response:**
```
{
   "id":"/zones/zn1/temperatureActual",
   "type":"floatValue",
   "writeable":0,
   "recordable":0,
   "value":20.2,
   "used":"true",
   "unitOfMeasure":"C",
   "minValue":5,
   "maxValue":30,
   "stepSize":0.5
}
```

### Get current Target Temperature of Device
Returns current Setpoint Temperature of your Device
Analogous response from Boschs API Gateway *.../temperatureHeatingSetpoint*

```
GET /:deviceId/targetTemperature
```

**Example Response:**
```
{
   "id":"/zones/zn1/temperatureHeatingSetpoint",
   "type":"floatValue",
   "writeable":0,
   "recordable":0,
   "value":20,
   "used":"true",
   "unitOfMeasure":"C",
   "minValue":5,
   "maxValue":30,
   "stepSize":0.5
}
```

### (WIP) Set current Target Temperature of Device (and enter manual Heating Mode)
Set a new manual temperature for your device.

**currently not working**: I don't know which body is needed. And the Docu of Bosch's API is rather quiet about it. :(

```
GET /:deviceId/targetTemperature/:newTemperature
```

**Example Response:**
```
Donnu.
```
