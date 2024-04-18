const mostrar_recomendaciones = (elem_div) => {
        let recomendados = 0;
        lista_carrito.forEach (element => {
            if(element['id'] + element['talla'] == elem_div.id) {
                lista_prod.forEach(recomend => {

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

const cerrar_recomend = () => {
    document.querySelector(".seccion_recomendados").remove();
    /*
    recomendaciones = document.getElementsByClassName("recomendacion");
    while(recomendaciones[0]){
        recomendaciones[0].parentNode.removeChild(recomendaciones[0]);
    }*/
}


    