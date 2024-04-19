let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d', {willReadFrequently: true,});
let animacion = null;
let quaggaStarted = false; 
let videoStream;

const iniciar_grabacion = () => {
  //Promesa para poder devolver codigo qr
  return new Promise((resolve, reject) =>{
    //Se activa la camara frontal
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      videoStream  = stream;
      video.srcObject = stream;
      video.play();
      
      video.onloadedmetadata = () => {
        //Inicaliza la api que le los codigos de barras
        Quagga.init({
          inputStream: {
          name: "Live",
          type: "LiveStream",
          target:video
          },
          decoder: {
          readers: ["code_128_reader"] 
          }
      }, function(err) {
          if (err) {
          console.error('Error al iniciar Quagga:', err);
          return;
          }
          Quagga.start();
          quaggaStarted = true; 
      });
        //Se llama a la funcion de escaneo hasta que se encuentre la función
        animacion  = setInterval(() => detectQRCode(resolve), 100);
      }
    })
    .catch(err => {
      reject(err);
     });
    })
  
}

//Función que detecta el qr
const detectQRCode = (resolve) =>{
  try{
    //Se hace una captura y la api detecta si hay un codigo qr
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let code = jsQR(imageData.data, imageData.width, imageData.height, imageData.height, {inversionAttempts: 'dontInvert',});
    //Si detecta un qr la promesa devuelve el valor del qr,  se para el setInterval y se detine la grabacion
    if (code) {
      setInterval(animacion);
      resolve(code.data);
      detenerGrabacion();
    }else {
      // Si no detecta un QR, intenta detectar un código de barras
      Quagga.onDetected(function(result) {
        const code = result.codeResult.code;
        console.log('Código de barras detectado:', code);
        Quagga.stop();
        quaggaStarted = false; 
        resolve(code);
        detenerGrabacion();
      });
  }
  } catch(error){}
}
    
  
  
//Función que apaga la campara si esta encendida
const detenerGrabacion = () => {
  if (videoStream) {
    videoStream.getTracks().forEach(track => {
      track.stop();
      video.srcObject = null;
    });
  }
  
  if (quaggaStarted) {
    Quagga.stop();
  }
}

