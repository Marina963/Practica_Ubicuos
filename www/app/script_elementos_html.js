
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
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
}

const act_pag_maniqui= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'block';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
}

const act_pag_armario= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'block';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'none';
  detenerGrabacion();
}
const act_pag_esc_ropa= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'block';
  ubicacion.style.display = 'none';
  document.dispatchEvent(cambiar_sitio);
  
   // Se inicia la grbacion y se busca el qr,
   iniciar_grabacion()
   .then(valor_qr => {
     add(valor_qr);
     act_pag_armario();
   })
   .catch(error => {
     console.error("Error al iniciar la grabación:", error);
   });
}
const act_pag_ubicacion= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  ubicacion.style.display = 'block';
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
}