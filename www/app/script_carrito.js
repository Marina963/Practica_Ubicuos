var lista_carrito = [];
var lista_favs = [];
let carrito = document.getElementById('carrito');


const load = (data)=>{
  console.log("recibida la lista");
  lista_carrito = data;
  lista_carrito.forEach(element => { 
    var new_div = document.createElement('div');
    new_div.classList.add("prod_carrito");
    
    new_div.innerHTML =  element['nombre'];
    new_div.id = "prod_" + element['id'];
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
  new_div.id = "prod_" +  new_data['id'];
  carrito.appendChild(new_div);
  addListeners(new_div);
  lista_carrito.push(new_data);
}

const remove = (id) => {
  lista_carrito.forEach (element => {
    if(element.id == id) {
      element.cantidad -= 1;
      if ("vibrate" in navigator) {
        navigator.vibrate(1000);
      } else {
        console.log("No tiene la vibracion activada o no es posible acceder a ella");
      }
      if (element.cantidad == 0){
        lista_carrito.splice((lista_carrito.indexOf(element)), 1);
        document.getElementById("prod_"+id).remove();
      }
      socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
      return;
    }
  })
}


const marcar_favorito = (element) => {
  if (!element.classList.contains("favorito")){
    transition_color(element);
    element.classList.add("favorito");
    lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=true;
    lista_favs.push(element);
  } else {
    transition_color(element);
    element.classList.remove("favorito");
    console.log(element);
    console.log(lista_carrito);
    console.log(lista_carrito.indexOf(element));
    console.log(lista_carrito[(lista_carrito.indexOf(element))]);
    lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=false;
  }

  socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
  socket.emit("ACTUALIZA_FAV", lista_favs);
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
    if (!item.classList.contains("mostrar_producto")){
        item.classList.remove("prod_carrito");
        item.classList.add("mostrar_producto");
        document.addEventListener("shake", qqe => {
          console.log("shaaaaking");
          console.log(document.querySelector(".mostrar_producto"));
          marcar_favorito(document.querySelector(".mostrar_producto"));
        })
    } else {
        item.classList.remove("mostrar_producto");
        item.classList.add("prod_carrito");
        document.removeEventListener("shake", e);
    }
  });
};


