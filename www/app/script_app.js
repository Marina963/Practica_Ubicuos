const socket = io();

// Conexión con el servidor y carga inicial datos
socket.on("connect", () => {
  socket.emit("PHONE_CONNECTED", { id: 2 });
});

socket.on("ACK_CONNECTION", () => {
  console.log("ack_movil");
});

// Inicio de la aplicacion, comienza a detectar comandos de voz, manda peticiones al servidor, y carga la guía de usuario
window.addEventListener("load", () =>{
  inicio();
  socket.emit("PEDIR_LISTA");
  socket.emit("PEDIR_PERFIL");
  voz();
});

// Recibir respuestas del servidor para el load
socket.on("RESPUESTA_LISTA", (data, products) => {
  load(data, products);
}); 

// Respuesta de servidor con los datos de un producto a añadir
socket.on("RESPUESTA_PROD", (data) => {
  new_product(data);
}); 

// Mensaje del servidor después de pagar para eliminar todos los productos del carrito.
socket.on("ELIMINAR_CARRITO_PAGADO", (data, products) => {
  let prods = document.querySelectorAll('.prod_carrito');
  prods.forEach(div => div.remove());
  load(data,products);
}); 

// Activa la pantalla del dado y el sensor. Guarda el total de la compra para que se pueda acceder a ello y aplicar el descuento después
socket.on("ACTIVAR_DADO", (precio)=>{
  let total = document.getElementById('total');
  total.innerHTML = precio;
  let dado = document.getElementById('dado');
  dado.style.display = "block";
  sensorDado.start();
});

// Mensaje del servidor cuando se presiona "ir atrás" en el cajero, oculta el dado volviendo a la pagina principal
socket.on("RETORNO_DADO", ()=>{
  let dado = document.getElementById('dado');
  dado.style.display = "none";
  let sacude = document.getElementById('sacude');
  sacude.innerHTML = "¡Sacude el movil para tirar el dado y conseguir un descuento!";
  let boton_pago = document.getElementById('boton_pago');
  boton_pago.style.display = "none";
  sensorDado.stop();
});

// Actualiza o crea el perfil con los datos recibidos del servidor. 
socket.on("RESPUESTA_PERFIL", (perfil)=>{
  let nombre_usuario = document.getElementById('nombre_usuario');
  nombre_usuario.innerHTML = perfil[0]["usuario"];
  let talla_pref = document.getElementById('talla_pref');
  talla_pref.innerHTML = perfil[0]["talla"];
})

//Funciones para cambiar de página mediate el footer
const cambiar_sitio = new Event("cambio_nav");

footer_favoritos.addEventListener("touchend", () => {
  act_pag_favoritos();
});
footer_maniqui.addEventListener("touchend", () => {
  act_pag_maniqui();
});
footer_armario.addEventListener("touchend", () => {
  act_pag_armario();
});
footer_esc_ropa.addEventListener("touchend", () => {
  act_pag_esc_ropa();
});
footer_perfil.addEventListener("touchend", () => {
  act_pag_perfil();
});
