let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d', {willReadFrequently: true,});
let animacion = null;

const iniciar_grabacion = () => {
  //Promesa para poder devolver codigo qr
  return new Promise((resolve, reject) =>{
    //Se activa la camara
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      video.onloadedmetadata = () => {
        //Se llama a la funcion hasta que se encuentre la función
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
    }
  } catch(error){}
}
    
  
  
//Función que apaga la campara si esta encendida
const detenerGrabacion = () => {
  if (video.srcObject && video.srcObject.active) {
    video.pause();
    video.srcObject = null;
  }
  /*
  if (video.srcObject && video.srcObject.active) {
    console.log("1 - camara activa");
    video.pause();
    video.srcObject = null;
  } else {
    console.log("1 - camara no activa");
  }
  
  if (video.srcObject && video.srcObject.active) {
    console.log("2 - camara activa");
  } else {
    console.log("2 - camara no activa");
  }
  */
}
