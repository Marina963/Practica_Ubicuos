var lista_carrito = [];
let carrito = document.getElementById('carrito');


const load = ()=>{
    socket.emit("PEDIR_LISTA");
    console.log("hizo peticion");
}

load();

const add = (id) => {
    socket.emit("DATOS_PROD", id);
        
    socket.on("RESPUESTA_PROD", (data) => {
        new_data = data;
        console.log("recibida el producto");
    }); 
    
    var new_div = document.createElement('div');
    new_div.classList.add("prod_carrito");
    new_div.innerHTML =  new_data['nombre'];
    new_div.id = "prod_" +  new_data['id'];
    carrito.appendChild(new_div);
    addListeners(new_div);
    lista_carrito.push(new_data);
}




const remove = (element) => {
  lista_carrito.splice((element.id -1), 1);
  element.remove();

  socket.emit("ACTUALIZAR_CARRITO", lista_carrito);
}


const marcar_favorito = (element) => {
  if (!element.classList.contains("favorito")){
    transition_color(element);
    element.classList.add("favorito");
    lista_carrito[(element.id -1)]['favorito']=true;
  } else {
    transition_color(element);
    element.classList.remove("favorito");
    lista_carrito[(element.id -1)]['favorito']=false;
  }

  if ("vibrate" in navigator) {
    navigator.vibrate(1000);
  } else {
    console.log("No tiene la vibracion activada o no es posible acceder a ella");
  }

  socket.emit("ACTUALIZAR_CARRITO", lista_carrito);
}

const transition_color = (element) => {
  if (!element.classList.contains("favorito")){
    if(element.classList.contains("old-color")){
      element.classList.remove("old-color");
    } else {
      element.classList.add("new-color");
    }
  } else {
    if(element.classList.contains("new-color")){
      element.classList.remove("new-color");
    } else {
      element.classList.add("old-color");
    }
  }
}

const addListeners = (item) => {
  item.addEventListener("touchstart", e => {
    e.preventDefault();
  });

  item.addEventListener("touchend", e => {
    e.preventDefault();
  });
};


