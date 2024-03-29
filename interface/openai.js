const OpenAI = require("openai");
const cf = require('./chatGPT_functions');
require('dotenv').config()

if(process.env.OPENAI_KEY == "" || process.env.OPENAI_KEY == undefined)
{
    console.error("openAi key is not set");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

class MyOpenAi {

    messages;

    constructor() {
        this.messages = [{ role: "system", content: "you are a helpful assistent that gives short answers if posible" }]
    }

    async call_openAi() {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: this.messages,
            functions: cf.functions,
            function_call: "auto"
        });

        var responseMessage = completion.choices[0].message;

        console.log('-------------------------------------------------------');
        console.log("first response : ");
        console.log(responseMessage);
        console.log('-------------------------------------------------------');

        if (responseMessage.function_call) {

            console.log("calling a function");

            const functionName = responseMessage.function_call.name;
            const functionToCall = cf.availableFunctions[functionName];

            var functionResponse;

            if (functionName == 'get_current_weather') {
                const functionArgs = JSON.parse(responseMessage.function_call.arguments);
                functionResponse = functionToCall(
                    functionArgs.location,
                    functionArgs.unit,
                );
            }
            else if (functionName == 'light_turn_on') {
                
                functionResponse = await functionToCall().then((resp) => { return resp.message }).catch((err) => { return err });
            }
            else if (functionName == 'light_turn_off') {
                
                functionResponse = await functionToCall().then((resp) => { return resp.message }).catch((err) => { return err });
            }
            else {
                functionResponse = "function could not be called, tell the user that the request cannot be completed"
            }

            this.messages.push(responseMessage);  // extend conversation with assistant's reply
            this.messages.push({
                "role": "function",
                "name": functionName,
                "content": functionResponse,
            });

            const secondResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: this.messages,
            });  // get a new response from GPT where it can see the function response

            console.log('-------------------------------------------------------');
            console.log("second response : ");
            console.log(secondResponse.choices[0].message);
            console.log('-------------------------------------------------------');

            return secondResponse.choices[0].message.content;
        }
        else {
            console.log("function not called");
            return completion.choices[0].message.content;
        }
    }

    add_message(message)
    {
        this.messages.push(message);
    }

    get messages()
    {
        return this.messages;
    }

}


module.exports.MyOpenAi = MyOpenAi;