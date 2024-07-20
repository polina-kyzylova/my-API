
// ---------- WEBSOCKET SERVER ----------
const http = require('http');
const { WebSocketServer } = require('ws');
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const WSPORT = 5050;

server.listen(WSPORT, () => {
  console.log(`WebSocket working at ${WSPORT} port `);
});

wsServer.on('connection', function connection(ws) {
    wsServer.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

// ---------- Setup WebSocket Server
function broadcastMessage(message) {
    wsServer.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
    console.log(message);
}





// ---------- EXPRESS HTTP SERVER ----------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = 5005;


// ----- GET request for testing server
const users = {
    "user": "Daniel",
    "car": "Cheuvrolete Comaro",
    "age": "23 years old",
}

app.get('/users', (req, res) => {
    res.json(users)
    broadcastMessage(users)
})


// ----- POST request for accept data from external Servers
const urlencodedParser = express.urlencoded({extended: false});
let order;

app.post("/notif", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    order = request.body;
    console.log(order);
    broadcastMessage(order);
    response.send('Thank you for your data');
});


// ---------- Setup Express HTTP Server
app.listen(PORT, () => {
    console.log(`Express working at ${PORT} port`);
});


