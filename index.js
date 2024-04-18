const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const { stringify } = require('querystring');
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use('/', express.static(path.join(__dirname, 'www')));

// Conexion de los clientes al servidor
let socketCajero;
let socketMovil;

io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`);
  socket.on("PHONE_CONNECTED", (data) => {
    console.log(`phone connected ${socket.id}`);
    socket.emit("ACK_CONNECTION");
    socketMovil = socket;
    if (socketCajero) socketCajero.emit("NEW_CLIENT", { pointerId: socket.id });
  });

socket.on("CAJERO_CONNECTED", () => {
  socketCajero = socket;
  socketCajero.emit("ACK_CONNECTION");
});

// Peticion de datos al servidor
  socket.on("PEDIR_LISTA", () => {
    console.log("peticion lista");
    fs.readFile("./www/json/carrito.json", function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      fs.readFile("./www/json/productos.json", function(err, products) {
        if(err) {
          console.log(err);
          return;
        }
      socket.emit("RESPUESTA_LISTA",  JSON.parse(data), JSON.parse(products));})
    });
  });

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
          let nuevo_prod = {"id": parseInt(id),
          "nombre": element.nombre,
          "imagen": element.imagen,
          "talla": "S",
          "cantidad": 1,
          "precio": element.precio,
          "favorito": "false",
          "estilo": element.estilo}
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
              }
            });
          });
        }
      });
    });
  });

  socket.on("LISTA_PAGO", () => {
    fs.readFile("./www/json/carrito.json", function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      socketCajero.emit("RESPUESTA_LISTA_PAGO",  JSON.parse(data));
    });
  });

  socket.on("MANDAR_TOTAL", (precio) =>{
    socketMovil.emit("ACTIVAR_DADO", precio);
  });

  socket.on("NUEVO_TOTAL", (total) =>{
    socketCajero.emit("TOTAL_CAJERO", total);
  });

  socket.on("PAGAR", () =>{
    socketCajero.emit("MENSAJE_PAGO");
  });

// Actualizar json
  socket.on("SOBRESCRIBE_CARRITO", (lista)=> {
    fs.writeFile("./www/json/carrito.json", JSON.stringify(lista), (error) => {
      if(error){
        reject(error);
      }
    });
  });

  socket.on("ACTUALIZA_FAV", (lista)=> {
    fs.writeFile("./www/json/favoritos.json", JSON.stringify(lista), (error) => {
      if(error){
        reject(error);
      }});
  })

  socket.on("COMPRA_PAGADA", () => {
    fs.readFile("./www/json/carrito.json", function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      socketMovil.emit("ELIMINAR_CARRITO_PAGADO",  JSON.parse(data));
    });
  });

  socket.on("DISMINUIR_PRODUCTOS", (lista_prod_compr) => {
    fs.readFile("./www/json/productos.json", function(err, lista_prod_disp) {
      if(err) {
        console.log(err);
        return;
      }
      lista_prod_disp = JSON.parse(lista_prod_disp)

      lista_prod_compr.forEach (elem_compr => {
        lista_prod_disp.forEach(elem_disp => {
          if (elem_compr.id == elem_disp.id ){
            var tal = elem_compr.talla;
            console.log(tal);
            console.log(elem_disp.tallas[tal]);
            
            if((elem_disp.tallas[tal] - elem_compr.cantidad) >= 0){
              elem_disp.tallas[tal] = elem_disp.tallas[tal]- elem_compr.cantidad;
              socketCajero.emit("HAY_PRODUCTOS_DISPONIBLES");

              fs.writeFile("./www/json/productos.json", JSON.stringify(lista_prod_disp), (error) => {
                if(error){
                  reject(error);
                }
              });
            }
            else{
              socketCajero.emit("NO_HAY_PRODUCTOS_DISPONIBLES");
            }
          }
        });
      });
      
    });
  });
});

server.listen(3000, () => {
  console.log("Server listening...");
});