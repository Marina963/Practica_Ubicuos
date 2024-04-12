const socket = io();

const qrcode = new QRCode("qrcode", {
  text: "localhost:3000/app/index_app.html",
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});
const qrcode_vidio = new QRCode("qrcode_vidio", {
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
const boton_pago = document.querySelector("#boton_pago");
const code = document.getElementById("qrcode");
const code_vido = document.getElementById("qrcode_vidio");
const qr = document.getElementById("qr");

var lista_pago = [];
let carrito_pago = document.getElementById('lista_productos_cajero');
caja.style.display = "none"


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
                          <div> ${element.cantidad} u</div>`
    new_div.id = "prod_" + element['id'];
    carrito_pago.appendChild(new_div);
    precio = precio + element.cantidad * element.precio;
  });
  total.innerHTML = "Total: " + precio + "€";
}
const mostar_qr_pago =()=>{
  p_caja.style.display = "block";
  code_vido.style.display = "block"
  pago.style.display = "none"
}


socket.on("connect", () => {  

  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    //console.log("ACK", socket.id);
    //console.log("ACK");
  });

  socket.on("NEW_POINTER", (data) => {
    qr.style.display = "none";
    mostar_qr_pago();
    caja.style.display = "block"
    console.log("new pointer");

    socket.on("RESPUESTA_LISTA_PAGO", (data) => {
      pago.style.display = "block";
      p_caja.style.display = "none";
      code_vido.style.display = "none";
      load_pago(data);
    });
    socket.on("HAY_PRODUCTOS_DISPONIBLES", ()=>{
      lista_pago = [];
      socket.emit("SOBRESCRIBE_CARRITO", lista_pago);
      mostar_qr_pago();
      socket.emit("COMPRA_PAGADA");
    });
    socket.on("NO_HAY_PRODUCTOS_DISPONIBLES", ()=>{
      alert("No hay productos disponible");
      mostar_qr_pago();
      
    });

  })

});



boton_pago.addEventListener("click", () =>{
  socket.emit("DISMINUIR_PRODUCTOS", lista_pago);
  mostar_qr_pago();
});

back.addEventListener("click", () => {
  mostar_qr_pago();
})
