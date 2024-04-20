
const footer_favoritos = document.querySelector("#footer_favoritos");
const favoritos = document.querySelector("#favoritos");
const footer_maniqui = document.querySelector("#footer_maniqui");
maniqui = document.querySelector("#maniqui");
const footer_armario = document.querySelector("#footer_armario");
const armario = document.querySelector("#armario");
const footer_esc_ropa = document.querySelector("#footer_esc_ropa");
const esc_ropa = document.querySelector("#esc_ropa");
const footer_perfil = document.querySelector("#footer_perfil");
const perfil = document.querySelector("#perfil");


//Funciones para poder cambiar de paginas en la aplicación
const act_pag_favoritos = () => {
  favoritos.style.display = 'block';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'none';

  footer_favoritos.style.backgroundColor = "#dbbde4";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#EBDCF0";

  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
  detenerGrabacion_ropa();
  quitarModelo();
}

const act_pag_maniqui= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'block';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'none';
  
  footer_favoritos.style.backgroundColor ="#EBDCF0";
  footer_maniqui.style.backgroundColor = "#dbbde4";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#EBDCF0";

  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
  quitarModelo();
  modelo();
  detenerGrabacion_ropa();

}

const act_pag_armario= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'block';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'none';

  footer_favoritos.style.backgroundColor = "#EBDCF0";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#dbbde4"
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#EBDCF0";

  detenerGrabacion();
  detenerGrabacion_ropa();
  quitarModelo();
}
const act_pag_esc_ropa= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'block';
  perfil.style.display = 'none';

  footer_favoritos.style.backgroundColor = "#EBDCF0";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#dbbde4";
  footer_perfil.style.backgroundColor = "#EBDCF0";

  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion_ropa();
  quitarModelo();
  
  // Se inicia la grbacion y se busca el qr,
  iniciar_grabacion()
  .then(valor_qr => {
  if(valor_qr =="pago"){
    socket.emit("LISTA_PAGO");
  }else{
    add(valor_qr);

  }
    act_pag_armario();
  })
  .catch(error => {
    console.error("Error al iniciar la grabación:", error);
  });
   
}
const act_pag_perfil= () => {
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'block';

  footer_favoritos.style.backgroundColor = "#EBDCF0";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#dbbde4";

  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
  detenerGrabacion_ropa();
  quitarModelo();
}