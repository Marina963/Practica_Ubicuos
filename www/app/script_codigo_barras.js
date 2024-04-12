//let video = document.getElementById('video');
const leer_cb =() =>{
    //let canvas = document.getElementById('canvas');
    //let context = canvas.getContext('2d', {willReadFrequently: true,});
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      /*
      video.onloadedmetadata = () => {
        //Se llama a la funcion hasta que se encuentre la función
        //animacion  = setInterval(() => detectQRCode(resolve), 100);
      }
      */
    })
    .catch(err => {
      reject(err);
     });
    
    
    Quagga.onDetected(function(result) {
        const code = result.codeResult.code;
        console.log('Código de barras detectado:', code);
        
      });
}

