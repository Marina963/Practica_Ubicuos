const socket = io();

// Conexión con el servidor y carga inicial datos
socket.on("connect", () => {
  socket.emit("PHONE_CONNECTED", { id: 2 });
});

socket.on("ACK_CONNECTION", () => {
  console.log("ack_movil");
});

window.addEventListener("load", () =>{
  act_pag_armario();
  socket.emit("PEDIR_LISTA");
  voz();
});

// Recibir respuestas del servidor
socket.on("RESPUESTA_LISTA", (data) => {
  load(data);
}); 

socket.on("RESPUESTA_PROD", (data) => {
  new_product(data);
}); 

socket.on("ELIMINAR_CARRITO_PAGADO", (data) => {
  let prods = document.querySelectorAll('.prod_carrito');
  prods.forEach(div => div.remove());
  load(data);
}); 


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
footer_ubicacion.addEventListener("touchend", () => {
  act_pag_ubicacion();
});
