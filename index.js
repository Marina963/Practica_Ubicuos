const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const { stringify } = require('querystring');
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


  socket.on("DATOS_PROD", (id) => {
    console.log("peticion producto");
    fs.readFile("./www/json/productos.json", function(err, lista_productos) {
      if(err) {
        console.log(err);
        return;
      }
      lista_productos = JSON.parse(lista_productos);
      lista_productos.forEach(element => {
        if (element.id == id){
          let nuevo_prod = {"id": id,
          "nombre": element.nombre,
          "imagen": element.imagen,
          "talla": "S",
          "cantidad": 1,
          "precio": element.precio,
          "favorito": "false"}
          socket.emit("RESPUESTA_PROD",  nuevo_prod);
          fs.readFile("./www/json/carrito.json", function(err, carrito) {
            if(err) {
              console.log(err);
              return;
            }
            carrito = JSON.parse(carrito);
            carrito.push(nuevo_prod);
            fs.writeFile("./www/json/carrito.json", JSON.stringify(carrito), (error) => {
              if(error){
                reject(error);
              }});
          });
        }
      });
    });
    });

    socket.on("SOBRESCRIBE_CARRITO", (lista)=> {
      fs.writeFile("./www/json/carrito.json", JSON.stringify(lista), (error) => {
        if(error){
          reject(error);
        }});
    })

    socket.on("ACTUALIZA_FAV", (lista)=> {
      fs.writeFile("./www/json/favoritos.json", JSON.stringify(lista), (error) => {
        if(error){
          reject(error);
        }});
    })

  socket.on("CLIENT_CONNECTED", () => {
    clientSocket = socket;
    clientSocket.emit("ACK_CONNECTION");
  });
});

server.listen(3000, () => {
  console.log("Server listening...");
});