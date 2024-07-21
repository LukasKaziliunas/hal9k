const { HalDeviceManager } = require('./HalDeviceManager')
const { getWeather } = require('./weather_service')

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
          }
          
        },
        "required": ["location"],
      },
    },
    {
      "name": "light_turn_on",
      "description": "Use this function if the light needs to be turned on or if theres too dark",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
      },
    },
    {
      "name": "light_turn_off",
      "description": "Use this function if the light needs to be turned off",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
      },
    },
    {
      "name": "cart_deliver",
      "description": "Use this function to deliver food cart to the user",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
      },
    },
    {
      "name": "cart_return",
      "description": "Use this function to return the food cart",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
      },
    }
  ];

  function getCurrentWeather(location) {
    return new Promise((resolve, reject) => {
      console.log('***************************************')
      console.log('Getting weather forcast in Kaunas')
      console.log('***************************************')
      getWeather('kaunas').then(res => resolve({ message: JSON.stringify(res) })).catch(err => reject(err))

    })
    
  }
  
  function lightTurnOn() {
    
    return hdm.lightOn();
    
  }
  
  function lightTurnOff() {
  
    return hdm.lightOff();
  }

  function cartDeliver(){
    return hdm.CartDeliver();
  }

  function cartReturn(){
    return hdm.CartReturn();
  }
  
  const availableFunctions = {
    get_current_weather: getCurrentWeather,
    light_turn_on: lightTurnOn,
    light_turn_off: lightTurnOff,
    cart_deliver: cartDeliver,
    cart_return: cartReturn
  };
  

  module.exports.functions = functions
  module.exports.availableFunctions = availableFunctions;
  module.exports.getCurrentWeather = getCurrentWeather;
  module.exports.lightTurnOn = lightTurnOn;
  module.exports.lightTurnOff = lightTurnOff;
  module.exports.cartDeliver = cartDeliver;
  module.exports.cartReturn = cartReturn;