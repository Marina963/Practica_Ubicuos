var lastResult, countResults = 0;
const html5QrCode = new Html5Qrcode("video");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  if (decodedText !== lastResult) {
    ++countResults;
    lastResult = decodedText;
    
    console.log(`Scan result ${decodedText}`, decodedResult);
    if(decodedText =="pago"){
      socket.emit("LISTA_PAGO");
    }else{
      add(decodedText);
    }
    detenerGrabacion();
    act_pag_armario();
    
}
};
const config = { fps: 10, qrbox: { width: 600, height: 600 } };

const iniciar_grabacion = () => { 
  html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
}
const detenerGrabacion = () => {
  if(html5QrCode.isScanning === true){
    html5QrCode.stop()
  }
}
