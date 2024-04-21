const socket = io();

//Muestra el codigo qr de conexión al cliente
const qrcode = new QRCode("qrcode", {
  text: "localhost:3000/app/index_app.html",
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

//Código qr para el pago
const qrcode_video = new QRCode("qrcode_video", {
  text: "pago",
  width: 256,
  height: 256,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

const total = document.querySelector("#total");
const back = document.querySelector("#back");
const caja = document.querySelector("#caja");
const p_caja = document.querySelector("#p_cajero");
const pago = document.querySelector("#pago");
const code = document.getElementById("qrcode");
const code_video = document.getElementById("qrcode_video");
const qr = document.getElementById("qr");
const pagado = document.getElementById('pagado');

var lista_pago = [];
let carrito_pago = document.getElementById('lista_productos_cajero');
caja.style.display = "none"

/** Funcion para cargar pantalla de pago, muestra los productos en el carrito, calcula el total 
 * y se lo manda al cliente.
 * 
 * @param data productos del carrito 
 */ 
const load_pago = (data)=>{
  let precio = 0;
  let prods = document.querySelectorAll('.prod_pago');
  prods.forEach(div => div.remove());
  lista_pago = data;
  lista_pago.forEach(element => { 
    var new_div = document.createElement('div');
    new_div.classList.add("prod_pago");
    new_div.innerHTML = ` <div class="contenedor_imagen">
                            <img src="${element.imagen}" alt="imagen_del_producto">
                          </div>
                          <div>${element.nombre}</div>
                          <div class="precio"> ${element.precio} €</div>
                          <div >Talla:  ${element.talla} </div>
                          <div> ${element.cantidad} u</div>`
    new_div.id = "prod_" + element['id'];
    carrito_pago.appendChild(new_div);
    precio = precio + element.cantidad * element.precio;
  });
  socket.emit("MANDAR_TOTAL", precio);
  total.innerHTML = "Total: " + precio + "€";
}

// Funcion que recibe el nuevo total tras aplicar el descuento
socket.on("TOTAL_CAJERO", (precio) =>{
  total.innerHTML = "Total: " + precio + "€";
});

// Muetra el qr de pago y oculta el resto de elementos
const mostar_qr_pago =()=>{
  p_caja.style.display = "block";
  code_video.style.display = "block"
  pago.style.display = "none"
}

//Conexión con el servidor
socket.on("connect", () => {  

  socket.emit("CAJERO_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    console.log("ACK_cajero");
  });
  //Cuando se conecta un cliente muestra el qr de pago
  socket.on("NEW_CLIENT", (data) => {
    qr.style.display = "none";
    mostar_qr_pago();
    caja.style.display = "block"
    console.log("new pointer");
    //Muestra los productos en el carrito cuandos se recibe el mensaje de pago
    socket.on("RESPUESTA_LISTA_PAGO", (data) => {
      if(data === 0){
        alert("ningún producto seleccionado")
      } else {
        pago.style.display = "block";
        p_caja.style.display = "none";
        code_video.style.display = "none";
        load_pago(data);
      }
    });
    //Manda un mensaje para vaciar el carrito si hay suficientes productos
    socket.on("HAY_PRODUCTOS_DISPONIBLES", ()=>{
      lista_pago = [];
      socket.emit("SOBRESCRIBE_CARRITO", lista_pago);
      mostar_qr_pago();
      socket.emit("COMPRA_PAGADA");
    });
    //Avisa si no hay suficientes productos en stock
    socket.on("NO_HAY_PRODUCTOS_DISPONIBLES", ()=>{
      alert("No hay productos disponible");
      mostar_qr_pago();
    });
  })
});

/*Recibe mensaje de que el cliente ha pagado, informa al servidor para que disminuya el stock de productos,
 muestra un mensaje informando al cliente de que se ha realizado la operación exitosamente y vuelve al qr de pago*/
socket.on("MENSAJE_PAGO", () =>{
  socket.emit("DISMINUIR_PRODUCTOS", lista_pago);
  console.log(pagado)
  pagado.style.display = "block";
  caja.style.display = "none";
  setTimeout(()=>{
    pagado.style.display = "none";
    caja.style.display = "block";
    mostar_qr_pago();
  },4000)
});

//Boton para retorno en la pantalla con los productos, hace un emit para avisar al cliente de que desactive el dado
back.addEventListener("click", () => {
  socket.emit("RETORNO");
  mostar_qr_pago();
})
