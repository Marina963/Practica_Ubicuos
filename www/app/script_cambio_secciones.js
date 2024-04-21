/*---------------Script para cambiar entre seciones------------------------ */
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



//Funciones para poder cambiar entre las ditintas seciones de la paguina
//Cada sección es un elemento del footer

//Función para cambiar a la sección de favoritos
const act_pag_favoritos = () => {
  //Se ocultan todas las secciones menos favorito
  favoritos.style.display = 'block';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'none';

  //Cambio de color en el footer de favoritos para que usuario sepa que se encuentra en esa sección
  footer_favoritos.style.backgroundColor = "#dbbde4";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#EBDCF0";

  //Se detienen las dos camaras, se apagan los sensores del carrito y se quita el maniqui
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
  detenerGrabacion_ropa();
  quitarModelo();
}

//Función para cambiar a la sección de maniquí
const act_pag_maniqui= () => {
  //Se ocultan todas las secciones menos maniquí
  favoritos.style.display = 'none';
  maniqui.style.display = 'block';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'none';
  
  //Cambio de color en el footer de maniquí para que usuario sepa que se encuentra en esa sección
  footer_favoritos.style.backgroundColor ="#EBDCF0";
  footer_maniqui.style.backgroundColor = "#dbbde4";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#EBDCF0";

   //Se detienen las dos camaras, se apagan los sensores del carrito y crea el maniqui
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
  quitarModelo();
  modelo();
  detenerGrabacion_ropa();

}

//Función para cambiar a la sección de armario
const act_pag_armario= () => {
   //Se ocultan todas las secciones menos armario
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'block';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'none';

  //Cambio de color en el footer de armario para que usuario sepa que se encuentra en esa sección
  footer_favoritos.style.backgroundColor = "#EBDCF0";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#dbbde4"
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#EBDCF0";

  //Se detienen las dos camaras y se quita el maniqui
  detenerGrabacion();
  detenerGrabacion_ropa();
  quitarModelo();
}

//Función para cambiar a la sección de scanner
const act_pag_esc_ropa= () => {
   //Se ocultan todas las secciones menos scanner
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'block';
  perfil.style.display = 'none';

  //Cambio de color en el footer del scanner para que usuario sepa que se encuentra en esa sección
  footer_favoritos.style.backgroundColor = "#EBDCF0";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#dbbde4";
  footer_perfil.style.backgroundColor = "#EBDCF0";

   //Se detienela camara del probador, se apagan los sensores del carrito, se quita el maniqui y se activa el scanner
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion_ropa();
  quitarModelo();
  iniciar_grabacion()
  
}

//Función para cambiar a la sección de perfil
const act_pag_perfil= () => {
   //Se ocultan todas las secciones menos perfil
  favoritos.style.display = 'none';
  maniqui.style.display = 'none';
  armario.style.display = 'none';
  esc_ropa.style.display = 'none';
  perfil.style.display = 'block';

  //Cambio de color en el footer de perfil para que usuario sepa que se encuentra en esa sección
  footer_favoritos.style.backgroundColor = "#EBDCF0";
  footer_maniqui.style.backgroundColor = "#EBDCF0";
  footer_armario.style.backgroundColor = "#EBDCF0";
  footer_esc_ropa.style.backgroundColor = "#EBDCF0";
  footer_perfil.style.backgroundColor = "#dbbde4";

  //Se detienen las dos camaras, se apagan los sensores del carritoy se quita el maniqui
  document.dispatchEvent(cambiar_sitio);
  detenerGrabacion();
  detenerGrabacion_ropa();
  quitarModelo();
}