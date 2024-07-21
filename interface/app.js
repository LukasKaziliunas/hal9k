const express = require('express')
const app = express()
const port = 3000

const { MyOpenAi } = require('./openai');

app.use(express.json());
app.use(express.static('resources'));
const server = require('http').createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const openai = new MyOpenAi();


io.on('connection', (socket) => {
  console.log('a user connected' + socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/interface', async (req, res) => {

  res.sendFile(__dirname + '/index.html');

})

app.get('/test', async (req, res) => {
  console.log("test endpoint hit")
res.send();
})

app.post('/query', async (req, res) => {
  var q = req.body["query"];
  console.log("new query: " + q)

  let new_msg = { role: "user", content: q };

  openai.add_message(new_msg)

  openai.call_openAi().then((message) => {
    console.log(openai.messages);
    console.log(message)
    io.emit('add_query', message);
  });
  
  res.send("recieved");
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})