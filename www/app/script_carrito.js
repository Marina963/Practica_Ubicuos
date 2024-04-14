var lista_carrito = [];
var lista_favs = [];
let carrito = document.getElementById('carrito');


const load = (data)=>{
  console.log(data);
  lista_carrito = data;
  lista_carrito.forEach(element => { 
    var new_div = document.createElement('div');
    new_div.classList.add("prod_carrito");
    if(element.favorito == true){
      new_div.classList.add('favorito');
    }
    new_div.innerHTML =  element['nombre'];
    new_div.id = element['id'] + element['talla'];
    addListeners(new_div);
    carrito.appendChild(new_div);
});
}


const add = (id) => {
  var existe = 0;
  lista_carrito.forEach(element => {
    if(element.id == id) {
      element.cantidad += 1;
      socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
      existe = 1;
      return;
    } 
  });
  if (existe == 0){
    socket.emit("DATOS_PROD", id);
  }
}


const new_product = (data) => {
  new_data = data;
  console.log("recibida el producto");
  var new_div = document.createElement('div');
  new_div.classList.add("prod_carrito");
  new_div.innerHTML =  new_data['nombre'];
  new_div.id = new_data['id'] + new_data['talla'];
  carrito.appendChild(new_div);
  addListeners(new_div);
  lista_carrito.push(new_data);
}

const remove = (elem_div) => {
  lista_carrito.forEach (element => {
    if(element['id'] + element['talla'] == elem_div.id) {
      element.cantidad -= 1;
      if ("vibrate" in navigator) {
        navigator.vibrate(1000);
      } else {
        console.log("No tiene la vibracion activada o no es posible acceder a ella");
      }
      if (element.cantidad == 0){
        lista_carrito.splice((lista_carrito.indexOf(element)), 1);
        elem_div.remove();
      }
      socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
      return;
    }
  })
}


const marcar_favorito = (elem_div) => {
  if (!elem_div.classList.contains("favorito")){
    elem_div.classList.add("favorito");
    lista_carrito.forEach(element => {
      if (elem_div.id == element['id'] + element['talla']){
        lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=true;
        lista_favs.push(element);
      }
    });
  } else {
    elem_div.classList.remove("favorito");
    lista_carrito.forEach(element => {
      if (elem_div.id == element['id'] + element['talla']){
        lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=false;
      }
  });
  }
  socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
  socket.emit("ACTUALIZA_FAV", lista_favs);
}

const addListeners = (item) => {
  item.addEventListener("touchstart", e => {
    e.preventDefault();
  });

  item.addEventListener("touchend", e => {
    e.preventDefault();
    if (!item.classList.contains("mostrar_producto")){
        item.classList.remove("prod_carrito");
        item.classList.add("mostrar_producto");
        sensorABS.start();
        sensorAcc.start();
    } else {
        item.classList.remove("mostrar_producto");
        item.classList.add("prod_carrito");
        sensorABS.stop();
        sensorAcc.stop();
    }
  });
};

document.addEventListener("cambio_nav", e => {
  item = document.querySelector(".mostrar_producto");
  console.log(item);
  if (item != null) {
    item.classList.remove("mostrar_producto");
    item.classList.add("prod_carrito");
  }
  sensorABS.stop();
  sensorAcc.stop();
})


