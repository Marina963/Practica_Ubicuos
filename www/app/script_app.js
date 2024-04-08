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
  console.log("recibida la lista");
  lista_carrito = data;
  lista_carrito.forEach(element => { 
    var new_div = document.createElement('div');
    new_div.classList.add("prod_carrito");
    
    new_div.innerHTML =  element['nombre'];
    new_div.id = "prod_" + element['id'];
    addListeners(new_div);
    carrito.appendChild(new_div);
});
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
  favoritos.style.display = 'block';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none'; 
});
footer_favoritos.addEventListener("click", () => {
  favoritos.style.display = 'block';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
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
});
footer_ubicacion.addEventListener("click", () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'block';
});
