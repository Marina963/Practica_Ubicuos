const maniqui_camara = document.querySelector("#maniqui_camara");
const camara_maniqui = document.querySelector("#camara_maniqui");
const video_ropa = document.getElementById('video_ropa');
const div_video_ropa = document.getElementById('div_video_ropa');
const ropa = document.getElementById('ropa');
const lista_maniqui = document.getElementById('lista_maniqui');
maniqui_camara.addEventListener("touchend", ()=>{
    quitarModelo();
    div_video_ropa.style.display = "block";
    maniqui_camara.style.display = "none";
    iniciar_grabacion_ropa();
})
camara_maniqui.addEventListener("touchend", ()=>{
    modelo();
    detenerGrabacion_ropa();
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
    camara_maniqui.style.display = "block";
    if (video_ropa.srcObject && video_ropa.srcObject.active) {
        video_ropa.pause();
        video_ropa.srcObject = null;
    }
}

const productos_camara = () =>{
    lista_carrito.forEach(element => { 
        var new_div = document.createElement('div');
        new_div.classList.add("prod_maniqui");
        new_div.innerHTML = `<img class="imagen_carrito" src="${element.imagen}" alt="imagen_del_producto">`    
        new_div.id = element['id'] + element['talla'];
        addListeners(new_div);
        lista_maniqui.appendChild(new_div);
    });
}

