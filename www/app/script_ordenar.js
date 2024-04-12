
const ordenar_favorito = ()=>{
    let prods = document.querySelectorAll('.prod_carrito');
    prods.forEach(div => div.remove());
    //lista_carrito = data;
    let lista_nueva = [];
    lista_carrito.forEach(element => { 
        if(element.favorito == true){
            lista_nueva.push(element);
            lista_carrito.splice((lista_carrito.indexOf(element)), 1);
        }
    });
    lista_carrito.forEach(element => { 
        lista_nueva.push(element);
    });
    lista_carrito = lista_nueva;
    
    load(lista_carrito);
  }