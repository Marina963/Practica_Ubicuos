const maniqui_camara = document.querySelector("#maniqui_camara");
const camara_maniqui = document.querySelector("#camara_maniqui");
let video_ropa = document.getElementById('video_ropa');
const div_video_ropa = document.getElementById('div_video_ropa');
const ropa = document.getElementById('ropa');
let lista_maniqui = document.getElementById('lista_maniqui');
let videoStream_ropa;

//Función para cambiar la ropa que te quieres probar
const addListeners_maniqui = (item) => {
    item.addEventListener("touchend", e => {
      if(item.id == 1){
        ropa.style.top = "13vh";
        ropa.style.right = "13vh";
        ropa.style.height = "25vh";
        ropa.src = "../images/camiseta_negra.png" 
      }
      else if(item.id == 3){
        ropa.style.top = "10vh";
        ropa.style.right = "10vh";
        ropa.style.height = "35vh";
        ropa.src = "../images/blusa_blanca.png"
      }
      else if (item.id == 2){
        ropa.style.top = "27vh";
        ropa.style.right = "21vw";
        ropa.style.height = "35vh";
        ropa.src = "../images/pantalones.png"
      }
    });
  };

//Función para mostar las distintas prendas 
const productos_camara = () =>{
  let prods = document.querySelectorAll('.prod_maniqui');
  prods.forEach(div => div.remove());
    lista_prod.forEach(element => { 
        var new_div = document.createElement('div');
        new_div.classList.add("prod_maniqui");
        new_div.innerHTML = `<img class="imagen_maniqui" src="${element.imagen}" alt="imagen_del_producto">`    
        new_div.id = element['id'] ;
        addListeners_maniqui(new_div);
        lista_maniqui.appendChild(new_div);
    });
}

const cambiar_probador = () =>{
  quitarModelo();
  div_video_ropa.style.display = "block";
  maniqui_camara.style.display = "none";
  iniciar_grabacion_ropa();
  productos_camara();
}


//Funciones para cambiar entre la pesta de maniqui y la de probador
maniqui_camara.addEventListener("touchend", ()=>{
   cambiar_probador();
})
camara_maniqui.addEventListener("touchend", ()=>{
    modelo();
    detenerGrabacion_ropa();
    
})

//Función que inicia la grabación del probador con la camara frontal
const iniciar_grabacion_ropa = () => {
    navigator.mediaDevices.getUserMedia({ video:  { facingMode: 'user' }  })
    .then(stream => {
        video_ropa.srcObject = stream;
        videoStream_ropa = stream;
        video_ropa.play();

    })
    .catch(err => {
        console.log('Error al acceder a la cámara:', err);
    });
}


//Función par
const detenerGrabacion_ropa = () => {
    div_video_ropa.style.display = "none";
    maniqui_camara.style.display = "block";
    camara_maniqui.style.display = "block";
    if (videoStream_ropa) {
      videoStream_ropa.getTracks().forEach(track => {
        track.stop();
    
      });
      video_ropa.srcObject = null;
      videoStream_ropa = null;
    }
}



