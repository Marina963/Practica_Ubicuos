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

/* ----------------------peticion de datos al servidor-------------------- */

// Peticion de listas carrito y de productos disponibles
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

  // Peticion de los datos del perfil
  socket.on("PEDIR_PERFIL", () =>{
    fs.readFile("./www/json/perfil.json", function(err, perfil) {
      if(err) {
        console.log(err);
        return;
      }
      socket.emit("RESPUESTA_PERFIL",  JSON.parse(perfil));})
  });

  // Peticion de los datos de un producto dependiendo de su id. Actualiza el fichero carrito añadiendo el nuevo producto
  socket.on("DATOS_PROD", (id, talla_pref) => {
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
          "talla": talla_pref,
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

  // Peticion al servidor del cajero para recibir el carrito. Si está vacío devolverá un 0 que provocará un mensaje de error
  socket.on("LISTA_PAGO", () => {
    fs.readFile("./www/json/carrito.json", function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      if(JSON.parse(data).length !== 0){
        socketCajero.emit("RESPUESTA_LISTA_PAGO",  JSON.parse(data));
      }
      else{
        socketCajero.emit("RESPUESTA_LISTA_PAGO",  0);
      }
    });
  });

  /*------------------Comunicación del servidor con el cajero y dispositivo para interaccion de pago y dado------------------ */
  // Envia el precio total al móvil para que realice el descuento
  socket.on("MANDAR_TOTAL", (precio) =>{
    socketMovil.emit("ACTIVAR_DADO", precio);
  });

  // Recibe el precio descontado del movil y de lo manda al cajero
  socket.on("NUEVO_TOTAL", (total) =>{
    socketCajero.emit("TOTAL_CAJERO", total);
  });

  // 
  socket.on("PAGAR", () =>{
    socketCajero.emit("MENSAJE_PAGO");
  });

  //
  socket.on("RETORNO", ()=>{
    socketMovil.emit("RETORNO_DADO");
  });

// Recibido al terminar una compra, envía los datos correspondiente al dispositivo para que actualice sus datos
  socket.on("COMPRA_PAGADA", () => {
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
      
      socketMovil.emit("ELIMINAR_CARRITO_PAGADO",  JSON.parse(data), JSON.parse(products));})
    });
  });

/*Comprueba los productos disponibles, compara la cantidad disponible con los productos seleccionados por el cliente
 y provoca un mensaje si no hay suficientes de alguno de ellos. En caso de ser todo correcto actualiza los archivos
 con las nuevas cantidades disponibles*/
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

/* ---------------------------Funciones utilizadas para actualizar los archivos json------------------------- */

//Actualiza el fichero carrito en cualquiera de las funciones de este, recibido desde el dispositivo móvil
  socket.on("SOBRESCRIBE_CARRITO", (lista)=> {
    fs.writeFile("./www/json/carrito.json", JSON.stringify(lista), (error) => {
      if(error){
        reject(error);
      }
    });
  });

  // Actualiza el perfil del usuario tras recibir una petición del móvil, cambia la talla
  socket.on("CAMBIO_TALLA", (talla) =>{
    fs.readFile("./www/json/perfil.json", function(err, perfil) {
      if(err) {
        console.log(err);
        return;
      }
      perfil = JSON.parse(perfil);
      perfil[0]["talla"] = talla;
      fs.writeFile("./www/json/perfil.json", JSON.stringify(perfil), (error) => {
        if(error){
          reject(error);
        }
      });
    });
  });

  // Actualiza el archivo de productos favoritos tras una petición del móvil
  socket.on("ACTUALIZA_FAV", (lista)=> {
    fs.writeFile("./www/json/favoritos.json", JSON.stringify(lista), (error) => {
      if(error){
        reject(error);
      }});
  })

});

// El servicio se ejecutará en el puerto 3000
server.listen(3000, () => {
  console.log("Server listening...");
});