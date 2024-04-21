/*-----Sript que se encarga de la deteción d codigos qr y codigos de barras ----------------- */

//Inicalizar el scanner y las variables 
const qr = new Html5Qrcode("video");

//Configuración del scanner
const config = { fps: 10, qrbox: { width: 600, height: 600 } };

//Funición que inicia el scanner
const iniciar_grabacion = () => { 
  qr.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
}

//Función que detiene el scanner si está activo
const detenerGrabacion = () => {
  if(qr.isScanning === true){
    qr.stop()
  }
}

//Función que se llama si se detacta un qr o un codigo de barras
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  //Si detecta el qr del pago hace un emit para motar el resumente en la caja de cobro
  //Si detecta un codigo de barra añade el produto al armario
  if(decodedText =="pago"){
    socket.emit("LISTA_PAGO");
  }else{
    add(decodedText);
  }

  //Detiene la garbación y cambia al aramrio
  detenerGrabacion();
  act_pag_armario();
};

