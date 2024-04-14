const maniqui_camara = document.querySelector("#maniqui_camara");
const video_ropa = document.getElementById('video_ropa');
const div_video_ropa = document.getElementById('div_video_ropa');
const ropa = document.getElementById('ropa');

maniqui_camara.addEventListener("touchend", ()=>{
    quitarModelo();
    div_video_ropa.style.display = "block";
    maniqui_camara.style.display = "none";
    iniciar_grabacion_ropa();
})


const iniciar_grabacion_ropa = () => {
    navigator.mediaDevices.getUserMedia({ video:  { facingMode: 'user' }  })
    .then(function(stream) {
        video_ropa.srcObject = stream;
    })
    .catch(function(err) {
        console.log('Error al acceder a la cámara:', err);
    });
}


  
const detenerGrabacion_ropa = () => {
    div_video_ropa.style.display = "none";
    maniqui_camara.style.display = "block";
    if (video_ropa.srcObject && video_ropa.srcObject.active) {
        video_ropa.pause();
        video_ropa.srcObject = null;
    }


  }