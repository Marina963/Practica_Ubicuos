/*
 * Script encargado de controlar todo el funcionamiento de la interfaz del carrito. Incluye funciones para 
 * cargar las listas de productos, actualizar todos los elementos html correspondientes al armario y lista 
 * favoritos, mandar peticiones al servidor sobre la cesta, y controlar todas las interacciones del usuario 
 * con la sección armario. 
 */

//Inicialización de variables
var lista_carrito = [];
var lista_favs = [];
var lista_prod = [];
let carrito = document.getElementById('carrito');
let div_favoritos = document.getElementById('lista_favs');


/** Función encargada de reiniciar los elementos html, cargar los datos recibidos del servidor en listas locales,
 *  y crear todos los elementos divs necesarios en el carrito y lista de favoritos para los productos cargados.
 * 
 * @param data: Lista de productos del carrito cargada de carrito.json
 * @param products: Lista de todos los productos disponibles cargada de productos.json, necesaria para recomendaciones. 
 */ 
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
    // Datos del nuevo div producto
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
    // Si el producto está marcado como favorito crear un div y añadirlo a las listas necesarias.
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


/** Función que añade un producto al carrito. Si este ya existe se aumenta la cantidad del elemento 
 * y se manda una petición al servidor para actualizar el fichero correspondiente. Si no, se manda una
 * petición al servidor para recibir los datos del producto, que se añadirá en la función new_product.
 * 
 * @param id: Identificador del producto que se quiere añadir al carrito. 
 */
const add = (id) => {
  var existe = 0;
  var talla_pref = document.getElementById('talla_pref').textContent;
  lista_carrito.forEach(element => {
    // Si ya está añadido el producto
    if(element.id == id && element.talla == talla_pref) {
      element.cantidad += 1;
      elem_div = document.getElementById(element.id + element.talla);
      cant_prod_div = elem_div.querySelector(".cantidad_prod");
      cant_prod_div.innerHTML = "Cantidad: " + element.cantidad + " ud";
      socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
      existe = 1;
      return;
    } 
  });
  if (existe == 0){
    socket.emit("DATOS_PROD", id, talla_pref);
  }
}


/** Esta función se encarga de crear el elemento html correspondiente al nuevo producto recibido
 * por parámetro y añadirlo al carrito. 
 * 
 * @param new_data: Datos del nuevo producto a añadir al carrito. 
 */
const new_product = (new_data) => {
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

  //Control de errores, hay ocasiones en el que las APIs mandan señales seguidas no detectadas en la función add.
  let exist_div = document.getElementById(new_data['id'] + new_data['talla']);
  if (!exist_div) {
    new_div.id = new_data['id'] + new_data['talla'];
    carrito.appendChild(new_div);
    addListeners(new_div);
    lista_carrito.push(new_data);
  }
}


/** Recibe un elemento div, encuentra el correspondiente en la lista, y reduce la cantidad en 1 unidad.
 * En caso de que la cantidad resultante sea 0 se elimina el elemento div y su entrada en lista. Envía una 
 * petición al servidor para actualizar el fichero. Se actualiza la cantidad mostrada en el div. 
 * 
 * @param elem_div Elemento div que se quiere eliminar, se traduce a su correspondiente en las listas.
 */
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
      // Actualiza el json del servidor
      socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
      return;
    }
  })
}


/** Recibe un elemento html, comprueba si está marcado como favorito mirando su listado de clases, y añade
 * o elimina la clase dependiendo de si existe. Además crea o elimina el elemento html correspondiente de 
 * la lista de favoritos y actualiza todas las listas, enviando peticiones al servidor para actualizar ficheros. 
 * 
 * @param elem_div: div del elemento a marcar como favorito
 */
const marcar_favorito = (elem_div) => {
  // El elemento no estaba marcado como favorito
  if (!elem_div.classList.contains("favorito")){
    elem_div.classList.add("favorito");
    // Se crea el elemento div para la sección de favoritos
    var new_fav = document.createElement('div');
    new_fav.innerHTML = elem_div.querySelector(".datos_prod").innerHTML;
    new_fav.querySelector(".texto_prod").style.gridTemplateRows= "none";
    new_fav.querySelector(".cantidad_prod").remove();
    new_fav.querySelector(".cant_precio").style.gridTemplateRows= "none";
    new_fav.querySelector(".cant_precio").style.marginLeft = "0";
    new_fav.classList.add('prod_fav');
    //Actualizar listas y añadir elementos
    lista_carrito.forEach(element => {
      if (elem_div.id == element['id'] + element['talla']){
        lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=true;
        new_fav.id = elem_div.id + "fav";
        // Control de errores de varias mediciones seguidas de la API
        if (!document.getElementById(new_fav.id)) {
          div_favoritos.appendChild(new_fav);
          lista_favs.push(element);
        }
      }
    });
  } else {
    // Si el elemento estaba marcado se desmarca y elimina el correspondiente de la sección de favoritos
    elem_div.classList.remove("favorito");
    elem_fav = document.getElementById(elem_div.id + "fav");
    lista_carrito.forEach(element => {
      if (elem_div.id == element['id'] + element['talla']){
        lista_carrito[(lista_carrito.indexOf(element))]["favorito"]=false;
      }
    lista_favs.forEach(elem_fav => {
      if (elem_div.id == elem_fav['id'] + elem_fav['talla']){
        // Conntrol de errores de API
        fav_div = document.getElementById(elem_div.id + "fav");
        if (fav_div) {
          fav_div.remove();
          lista_favs.splice((lista_favs.indexOf(element)), 1);
        }
      }
    })
  });
  }
  // Actualizar los dos ficheros json correspondientes con las nuevas listas
  socket.emit("SOBRESCRIBE_CARRITO", lista_carrito);
  socket.emit("ACTUALIZA_FAV", lista_favs);
}


/** Añade a los productos del carrito los eventlistener correspondientes para que se puedan abrir e
 * interaccionar con ellos. Al presionar un elemento se cambiará el estilo para que se muestre toda la
 * información de este en pantalla completa, y se añadirá la sección de recomendados correspondiente. Además, 
 * los sensores correspondientes empezarán a realizar mediciones para poder marcar como favorito o eliminar un 
 * producto. Al cerrar el producto todo esto parará y se volverá al estado anterior. 
 * 
 * @param item: cada uno de los elementos div del carrito.
 */
const addListeners = (item) => {
  item.addEventListener("touchstart", e => {
    e.preventDefault();
  });
  // Presionar un producto
  item.addEventListener("touchend", e => {
    e.preventDefault();
    // El producto estaba cerrado
    if (!item.classList.contains("mostrar_producto")){
        item.classList.remove("prod_carrito");
        item.classList.add("mostrar_producto");
        // Comenzar medición de sensores
        sensorABS.start();
        sensorAcc.start();
        // Cambiar estilo e información mostrada 
        item.innerHTML = `<div class="datos_prod">${item.innerHTML}</div>
                          <div class="seccion_recomendados">Otros productos del mismo estilo, presione para añadir:<div class="recomendaciones"></div></div>`
        div_nombre_talla = item.querySelector(".nombre_talla");
        div_nombre_talla.style.gridTemplateColumns= "none";
        div_nombre_talla.style.gridTemplateRows= "3fr 4fr";
        div_cant_precio = item.querySelector(".cant_precio");
        div_cant_precio.style.gridTemplateRows= "1fr 2fr";
        div_cant_precio.style.marginLeft= 0;
        mostrar_recomendaciones(item);
    } else {
      // Si el producto ya estaba abierto
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
    }
  });
};

/**
 * Event listener encargado de parar todos los sensores y cerrar los productos si se 
 * cambia de sección en la app sin haber cerrado una página de muestra del producto.
 */
document.addEventListener("cambio_nav", e => {
  item = document.querySelector(".mostrar_producto");
  if (item != null) {
    item.classList.remove("mostrar_producto");
    item.innerHTML = item.querySelector(".datos_prod").innerHTML;
    item.classList.add("prod_carrito");
  }
  sensorABS.stop();
  sensorAcc.stop();
})


