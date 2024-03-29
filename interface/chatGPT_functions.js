const { HalDeviceManager } = require('./HalDeviceManager')

const hdm = new HalDeviceManager();

const functions = [
    {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA",
          },
          "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
        },
        "required": ["location"],
      },
    },
    {
      "name": "light_turn_on",
      "description": "Turns on the light in the room if its dark or if the user requests the light to be turned on",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
      },
    },
    {
      "name": "light_turn_off",
      "description": "Turns off the light in the room if the user requests the light to be turned off",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
      },
    }
  ];

  function getCurrentWeather(location, unit = "fahrenheit") {
    const weatherInfo = {
      "location": location,
      "temperature": "72",
      "unit": unit,
      "forecast": ["sunny", "windy"],
    };
    return JSON.stringify(weatherInfo);
  }
  
  function lightTurnOn() {
    
    return hdm.ledOn();
    
  }
  
  function lightTurnOff() {
  
    return hdm.ledOff();
  }
  
  const availableFunctions = {
    get_current_weather: getCurrentWeather,
    light_turn_on: lightTurnOn,
    light_turn_off: lightTurnOff
  };

/*
  (async () => {
    //var a = await lightTurnOn().then((resp) => { return resp.message }).catch((err) => { return err });
    //console.log(a)
})();
*/
  

  module.exports.functions = functions
  module.exports.availableFunctions = availableFunctions;
  module.exports.getCurrentWeather = getCurrentWeather;
  module.exports.lightTurnOn = lightTurnOn;
  module.exports.lightTurnOff = lightTurnOff;