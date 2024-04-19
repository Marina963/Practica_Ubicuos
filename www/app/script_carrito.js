var lista_carrito = [];
var lista_favs = [];
var lista_prod = [];
let carrito = document.getElementById('carrito');
let div_favoritos = document.getElementById('lista_favs');


const load = (data, products)=>{
  let prods = document.querySelectorAll('.prod_carrito');
  prods.forEach(div => div.remove());
  let favs = document.querySelectorAll('.prod_fav');
  favs.forEach(div => div.remove());
  lista_carrito = data;
  lista_prod = products;
  console.log(lista_prod);
  lista_carrito.forEach(element => { 
    var new_div  = document.createElement('div');
    new_div.innerHTML = `<img class="imagen_carrito" src="${element.imagen}" alt="imagen_del_producto">
                        <div class="texto_prod">
                          <div class="nombre_talla">
                            <div class="nombre_prod">${element.nombre}</div>
                            <div class="talla_prod">Talla:  ${element.talla}</div>
                          </div>
                          <div class="cant_precio">
                            <div class="cantidad_prod"> Cantidad: ${element.cantidad} ud</div>
                            <div class="precio_prod">Precio: ${element.precio} €/ud</div>
                          </div>
                        </div>`
    new_div.id = element['id'] + element['talla'];
    if(element.favorito == true){
      new_div.classList.add('favorito');
      var new_fav = document.createElement('div');
      new_fav.innerHTML = new_div.innerHTML;
      new_fav.querySelector(".cantidad_prod").remove();
      new_fav.querySelector(".cant_precio").style.marginLeft = "0";
      new_fav.id = new_div.id + "fav";
      new_fav.classList.add('prod_fav');
      div_favoritos.appendChild(new_fav);
      lista_favs.push(element);
    }
    new_div.classList.add("prod_carrito");
    addListeners(new_div);
    carrito.appendChild(new_div);
});
}


const add = (id) => {
  var existe = 0;
  var talla_pref = document.getElementById('talla_pref').textContent;
  lista_carrito.forEach(element => {
    if(element.id == id && element.talla == talla_pref) {
      element.cantidad += 1;
      elem_div = document.getElementById(element.id + element.talla);
      cant_prod_div = elem_div.querySelector(".cantidad_prod");
      cant_prod_div.innerHTML = element.cantidad + " ud";
      socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
      existe = 1;
      return;
    } 
  });
  if (existe == 0){
    socket.emit("DATOS_PROD", id, talla_pref);
  }
}


const new_product = (new_data) => {
  console.log("recibida el producto");
  var new_div = document.createElement('div');
  new_div.classList.add("prod_carrito");

  new_div.innerHTML =   `<img class="imagen_carrito" src="${new_data.imagen}" alt="imagen_del_producto">
                        <div class="texto_prod">
                          <div class="nombre_talla">
                            <div class="nombre_prod">${new_data.nombre}</div>
                            <div class="talla_prod">Talla:  ${new_data.talla}</div>
                          </div>
                          <div class="cant_precio">
                            <div class="cantidad_prod">Cantidad:  ${new_data.cantidad} ud</div>
                            <div class="precio_prod">Precio:  ${new_data.precio} €/ud</div>
                          </div>
                        </div>`
  new_div.id = new_data['id'] + new_data['talla'];

  carrito.appendChild(new_div);
  addListeners(new_div);
  lista_carrito.push(new_data);
}

const remove = (elem_div) => {
  lista_carrito.forEach (element => {
    if(element['id'] + element['talla'] == elem_div.id) {
      element.cantidad -= 1;
      cant_prod_div = elem_div.querySelector(".cantidad_prod");
      cant_prod_div.innerHTML = "Cantidad: " + element.cantidad + " ud";

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
    var new_fav = document.createElement('div');
    new_fav.innerHTML = elem_div.querySelector(".datos_prod").innerHTML;
    new_fav.querySelector(".texto_prod").style.gridTemplateRows= "none";
    new_fav.querySelector(".cantidad_prod").remove();
    new_fav.querySelector(".cant_precio").style.gridTemplateRows= "none";
    new_fav.querySelector(".cant_precio").style.marginLeft = "0";
    new_fav.classList.add('prod_fav');
    lista_carrito.forEach(element => {
      if (elem_div.id == element['id'] + element['talla']){
        lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=true;
        new_fav.id = elem_div.id + "fav";
        if (!document.getElementById(new_fav.id)) {
          div_favoritos.appendChild(new_fav);
          lista_favs.push(element);
        }
      }
    });
  } else {
    elem_div.classList.remove("favorito");
    elem_fav = document.getElementById(elem_div.id + "fav")
    lista_carrito.forEach(element => {
      if (elem_div.id == element['id'] + element['talla']){
        lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=false;
      }
    lista_favs.forEach(elem_fav => {
      if (elem_div.id == elem_fav['id'] + elem_fav['talla']){
        fav_div = document.getElementById(elem_div.id + "fav");
        if (fav_div) {
          fav_div.remove();
          lista_favs.splice((lista_favs.indexOf(element)), 1);
        }
      }
    })
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
        item.innerHTML = `<div class="datos_prod">${item.innerHTML}</div>
                          <div class="seccion_recomendados">Otros productos del mismo estilo, presione para añadir:<div class="recomendaciones"></div></div>`
        sensorABS.start();
        sensorAcc.start();
        div_nombre_talla = item.querySelector(".nombre_talla");
        div_nombre_talla.style.gridTemplateColumns= "none";
        div_nombre_talla.style.gridTemplateRows= "3fr 4fr";
        div_cant_precio = item.querySelector(".cant_precio");
        div_cant_precio.style.gridTemplateRows= "1fr 2fr";
        div_cant_precio.style.marginLeft= 0;
        mostrar_recomendaciones(item);
    } else {
        item.classList.remove("mostrar_producto");
        item.classList.add("prod_carrito");
        item.innerHTML = item.querySelector(".datos_prod").innerHTML;
        sensorABS.stop();
        sensorAcc.stop();
        div_nombre_talla = item.querySelector(".nombre_talla");
        div_nombre_talla.style.gridTemplateColumns= "3fr 1fr";
        div_nombre_talla.style.gridTemplateRows= "none";
        div_cant_precio = item.querySelector(".cant_precio");
        div_cant_precio.style.gridTemplateRows= "1fr 1fr";
        div_cant_precio.style.marginLeft= "30%";
        //cerrar_recomend();
    }
  });
};

document.addEventListener("cambio_nav", e => {
  item = document.querySelector(".mostrar_producto");
  if (item != null) {
    item.classList.remove("mostrar_producto");
    item.innerHTML = item.querySelector(".datos_prod").innerHTML;
    item.classList.add("prod_carrito");
  }
  //cerrar_recomend();
  sensorABS.stop();
  sensorAcc.stop();
})


