const socket = io();

const qrcode = new QRCode("qrcode", {
  text: "localhost:3000/app/index_app.html",
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});
const caja = document.querySelector("#caja");
const pago = document.querySelector("#pago");
const boton_pago = document.querySelector("#boton_pago");
const boton_cajero = document.querySelector("#boton_cajero_cargar_produtos");

var lista_pago = [];
let carrito_pago = document.getElementById('lista_productos_cajero');

caja.style.display = "none"


const load_pago = (data)=>{
  let prods = document.querySelectorAll('.prod_pago');
  prods.forEach(div => div.remove());
  lista_pago = data;
  lista_pago.forEach(element => { 
    var new_div = document.createElement('div');
    new_div.classList.add("prod_pago");
    new_div.innerHTML =  element['nombre'];
    new_div.id = "prod_" + element['id'];
    carrito_pago.appendChild(new_div);
  });
}


socket.on("connect", () => {  

  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    //console.log("ACK", socket.id);
    //console.log("ACK");
  });

  socket.on("NEW_POINTER", (data) => {
    
    const code = document.getElementById("qrcode");
    code.style.display = "none";
    caja.style.display = "block"
    pago.style.display = "none"
    console.log("new pointer");

    socket.on("RESPUESTA_LISTA_PAGO", (data) => {
      load_pago(data);
    });
    socket.on("HAY_PRODUCTOS_DISPONIBLES", ()=>{
      lista_pago = [];
      socket.emit("SOBRESCRIBE_CARRITO", lista_pago);
      boton_cajero.style.display = "block";
      pago.style.display = "none";
      socket.emit("COMPRA_PAGADA");
    });
    socket.on("NO_HAY_PRODUCTOS_DISPONIBLES", ()=>{
      console.log("No hay productos disponible");
    });

  })

});

boton_cajero.addEventListener("click", () =>{
  boton_cajero.style.display = "none"
  pago.style.display = "block";
  socket.emit("LISTA_PAGO");

})

boton_pago.addEventListener("click", () =>{
  socket.emit("DISMINUIR_PRODUCTOS", lista_pago);
  
});