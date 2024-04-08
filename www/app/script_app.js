const socket = io();

socket.on("connect", () => {
  const h = document.querySelector("body");
  h.style.backgroundColor = "blue"; 
  socket.emit("POINTER_CONNECTED");
});

socket.on("ACK_CONNECTION", () => {
  console.log("ack_movil");
});

socket.on("RESPUESTA_LISTA", (data) => {
  load(data);
}); 

socket.on("RESPUESTA_PROD", (data) => {
  new_product(data);
}); 

const footer_favoritos = document.querySelector("#footer_favoritos");
const favoritos = document.querySelector("#favoritos");
const footer_maniqui = document.querySelector("#footer_maniqui");
const maniqui = document.querySelector("#maniqui");
const footer_armario = document.querySelector("#footer_armario");
const armario = document.querySelector("#armario");
const footer_esc_ropa = document.querySelector("#footer_esc_ropa");
const esc_ropa = document.querySelector("#esc_ropa");
const footer_ubicacion = document.querySelector("#footer_ubicacion");
const ubicacion = document.querySelector("#ubicacion");

window.addEventListener("load", () =>{
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'block';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none'; 
  
  socket.emit("PEDIR_LISTA");
  console.log("hizo peticion");
});
footer_favoritos.addEventListener("click", () => {
  favoritos.style.display = 'block';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
  remove(2);
});
footer_maniqui.addEventListener("click", () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'block';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
});
footer_armario.addEventListener("click", () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'block';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
});
footer_esc_ropa.addEventListener("click", () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'block';
  ubicacion.style.display = 'none';
  add(2);
  //iniciar_grabacion();
  
});
footer_ubicacion.addEventListener("click", () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'block';
});
