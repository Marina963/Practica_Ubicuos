const socket = io();

socket.on("connect", () => {
  //const h = document.querySelector("body");
  //h.style.backgroundColor = "blue"; 
  socket.emit("POINTER_CONNECTED", { id: 2 });
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
socket.on("ELIMINAR_CARRITO_PAGADO", (data) => {
  let prods = document.querySelectorAll('.prod_carrito');
  prods.forEach(div => div.remove());
  load(data);
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


//Funciones para poder cambiar de paguinas en la aplicación
const act_pag_favoritos = () => {
  favoritos.style.display = 'block';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
}

const act_pag_maniqui= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'block';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
}

const act_pag_armario= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'block';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
}
const act_pag_esc_ropa= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'block';
  ubicacion.style.display = 'none';
}
const act_pag_ubicacion= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'block';
}

//Funciones para cuendo se recarge la paguina y se pulse añgún boton del footer cambie de paguina
window.addEventListener("load", () =>{
  act_pag_armario();
  socket.emit("PEDIR_LISTA");
  console.log("hizo peticion");
});
footer_favoritos.addEventListener("touchend", () => {
  act_pag_favoritos();
  detenerGrabacion();
  //remove(2);
});
footer_maniqui.addEventListener("touchend", () => {
  act_pag_maniqui();
  detenerGrabacion();
});
footer_armario.addEventListener("touchend", () => {
  act_pag_armario();
  detenerGrabacion();
});
footer_esc_ropa.addEventListener("touchend", () => {
  act_pag_esc_ropa();
  // Se inicia la grbacion y se busca el qr,
  iniciar_grabacion()
  .then(valor_qr => {
    add(valor_qr);
    act_pag_armario();
  })
  .catch(error => {
    console.error("Error al iniciar la grabación:", error);
  });
  
});
footer_ubicacion.addEventListener("touchend", () => {
  act_pag_ubicacion();
  detenerGrabacion();
});
