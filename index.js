const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'www')));

let clientSocket;

io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`);
  socket.on("POINTER_CONNECTED", () => {
    console.log(`pointer connected ${socket.id}`);
    socket.emit("ACK_CONNECTION");
    if (clientSocket) clientSocket.emit("NEW_POINTER", { pointerId: socket.id });
  });

  socket.on("PEDIR_LISTA", () => {
    console.log("peticion lista");
    fs.readFile("./www/json/carrito.json", function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(JSON.parse(data));
      socket.emit("RESPUESTA_LISTA",  JSON.parse(data));
    });
  })

  socket.on("CLIENT_CONNECTED", () => {
    clientSocket = socket;
    clientSocket.emit("ACK_CONNECTION");
  })
});

server.listen(3000, () => {
  console.log("Server listening...");
});