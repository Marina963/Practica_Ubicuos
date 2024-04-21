/** Recibe un producto que se ha abierto, encuentra sus datos en las listas locales, y recupera todo el resto de productos
 * con el mismo estilo para recomendarlos al usuario. Todos los productos se introducen en la sección de recomendados 
 * con su imagen, nombre y precio, y se pueden presionar para añadirlos al carrito. En caso de no existir ningún producto
 * del mismo estilo aparecerá un texto que avise al usuario. 
 * 
 * @param  elem_div: div del producto del carrito que se ha abierto
 */
const mostrar_recomendaciones = (elem_div) => {
        let recomendados = 0;
        lista_carrito.forEach (element => {
            if(element['id'] + element['talla'] == elem_div.id) {
                lista_prod.forEach(recomend => {
                //Busqueda de recomendaciones
                if (recomend.estilo == element.estilo && element.id != recomend.id) {
                    var new_div = document.createElement('div');
                    new_div.classList.add("recomendacion");

                    new_div.innerHTML = `<img class="imagen_recomendacion" src="${recomend.imagen}" alt="imagen_del_producto">
                                            <div>${recomend.nombre}</div>
                                            <div class="precio"> ${recomend.precio} €</div>`
                    new_div.id = "prod_" + recomend['id'];

                    elem_div.querySelector(".recomendaciones").appendChild(new_div);
                    recomendados = recomendados +1;
                    new_div.addEventListener("touchend", e =>{
                        console.log(recomend.id);
                        add(recomend.id);
                    })
                }
            });
            //En caso de no existir ningún otro producto del mismo estilo.
            if (recomendados === 0) {
                var new_div = document.createElement('div');
                new_div.classList.add("recomendacion");
                new_div.innerHTML = `No se encuentra disponible ningún producto de este estilo`
                new_div.style.width = "85vw";
                elem_div.querySelector(".recomendaciones").appendChild(new_div);
            }
        }
        
        })
      }; 


    