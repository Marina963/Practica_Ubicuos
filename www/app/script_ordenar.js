/*---------------Script con las funciones de ordenar------------------------ */

//Función que se encarga de ordenar los produtos por favoritos
const ordenar_favorito = ()=>{
    //Borra todos los divs del armario
    let prods = document.querySelectorAll('.prod_carrito');
    prods.forEach(div => div.remove());

    //Crea una lista neuva con los elementos del carrito
    let lista_nueva = [];

    //Añade los que están marcados como favoritos
    lista_carrito.forEach(element => { 
        if(element.favorito == true){
            lista_nueva.push(element);
            lista_carrito.splice((lista_carrito.indexOf(element)), 1);
        }
    });

    //Añade los que no están marcados como favoritos
    lista_carrito.forEach(element => { 
        lista_nueva.push(element);
    });

    //Cambia la lista antigua por la nueva
    lista_carrito = lista_nueva;
    
    //Muestra los productos ordenados en el armario
    load(lista_carrito);
  }