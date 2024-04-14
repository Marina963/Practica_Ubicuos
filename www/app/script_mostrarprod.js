const mostrar_recomendaciones = (elem_div) => {
    socket.emit("PEDIR_TODOS");

    socket.on("RESPUESTA_TODOS", (data) => {
        lista_prod = data;

        lista_carrito.forEach (element => {
        if(element['id'] + element['talla'] == elem_div.id) {
            lista_prod.forEach(recomend => {

                if (recomend.estilo == element.estilo && element.id != recomend.id) {
                    var new_div = document.createElement('div');
                    new_div.classList.add("recomendacion");

                    new_div.innerHTML = ` <div class="div_imagen_recomendacion">
                                            <img class="imagen_recomendacion" src="${recomend.imagen}" alt="imagen_del_producto">
                                            </div>
                                            <div>${recomend.nombre}</div>
                                            <div class="precio"> ${recomend.precio} €</div>`
                    new_div.id = "prod_" + recomend['id'];
                    elem_div.appendChild(new_div);
                    new_div.addEventListener("touchend", e =>{
                        console.log(recomend.id);
                        add(recomend.id);
                    })
                }
            });
        }
        })
      }); 
  }

const cerrar_recomend = () => {
    recomendaciones = document.getElementsByClassName("recomendacion");
    console.log(recomendaciones);
    while(recomendaciones[0]){
        recomendaciones[0].parentNode.removeChild(recomendaciones[0]);
    }
}


    