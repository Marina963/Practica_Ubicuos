var lista_carrito = [];
let carrito = document.getElementById('carrito');


const loadTasks = async()=>{
    socket.emit("PEDIR_LISTA");
        
    socket.on("RESPUESTA_LISTA", (data) => {
        lista_carrito = data;
        console.log("recibida la lista");
    }); 

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
    socket.emit("DATOS_PROD", id);
        
    socket.on("RESPUESTA_PROD", (data) => {
        new_data = data;
        console.log("recibida el producto");
    }); 
    
    var new_div = document.createElement('div');
    new_div.classList.add("prod_carrito");
    new_div.innerHTML =  new_data['nombre'];
    new_div.id = new_data['id'];
    carrito.appendChild(new_div);
    addListeners(new_div);
    lista_carrito.push(new_data);
}

loadTasks();


const remove = (element) => {
  lista_carrito.splice((element.id -1), 1);
  element.remove();

  socket.emit("ACTUALIZAR_CARRITO", lista_carrito);
}


const marcar_favorito = (element) => {
  if (!element.classList.contains("favorito")){
    element.s
    element.classList.add("task_done");
    taskList[(element.id -1)]['done']=true;
  } else {
    transition_color(element);
    element.classList.remove("task_done");
    taskList[(element.id -1)]['done']=false;
  }

  if ("vibrate" in navigator) {
    navigator.vibrate(1000);
  } else {
    console.log("No tiene la vibracion activada o no es posible acceder a ella");
  }

  fetch('/tasks/update', 
      {method: "POST", 
      body: JSON.stringify(taskList), 
      headers: {'Content-Type': 'application/json'}})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);});
}


const addListeners = (item) => {
  item.addEventListener("touchstart", e => {
    e.preventDefault();
  });

  item.addEventListener("touchend", e => {
    e.preventDefault();
  });
};
