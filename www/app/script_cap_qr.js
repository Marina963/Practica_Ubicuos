
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
.then(stream => {
  const video = document.getElementById('video');
  video.srcObject = stream;
  video.play();
})
.catch(err => console.error('Error al acceder a la cámara:', err));

// Capturar el fotograma de la cámara y buscar un código QR
function capturarQR() {
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
const imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);
const qrCode = new QRCode();
qrCode.callback = function(result) {
  if (result) {
    document.getElementById('resultado').innerText = 'Código QR encontrado: ' + result;
  } else {
    document.getElementById('resultado').innerText = 'No se encontraron códigos QR.';
  }
};
qrCode.decode(imageData);
requestAnimationFrame(capturarQR);
};
 // Iniciar la captura de QR cuando la cámara esté lista
video.onloadedmetadata = () => {
  requestAnimationFrame(capturarQR);
};