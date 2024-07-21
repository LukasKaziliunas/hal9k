//const { getWeather } = require('./weather_service')

//getWeather('kaunas').then(res => console.log(res)).catch(err => console.log( err ))


const { HalDeviceManager } = require('./HalDeviceManager')

const hdm = new HalDeviceManager();
hdm.lightOff();
/*const { MyOpenAi } = require('./openai');
S
const openai = new MyOpenAi();

let new_msg = { role: "user", content: "whats the weather in Lithuania right now" };

  openai.add_message(new_msg)

  openai.call_openAi().then((res)=> {
    console.log(openai.messages);
    console.log(res)
  });
  */