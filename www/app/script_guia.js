/*-------------Script con la guía de uso------------------- */

const guia = document.querySelector("#guia");
const app = document.querySelector("#app");
const guia_navegacion = document.querySelector("#guia_navegacion");
const guia_armario = document.querySelector("#guia_armario");
const guia_scanner = document.querySelector("#guia_scanner");
const guia_maniqui = document.querySelector("#guia_maniqui");
const guia_favoritos = document.querySelector("#guia_favoritos");
const guia_perfil = document.querySelector("#guia_perfil");
const guia_pago = document.querySelector("#guia_pago");
const siguiente = document.querySelector(".siguiente");
const acceptar = document.querySelector("#acceptar");


//Funión que ocualta la app y muestra la guía
const inicio = () =>{
    app.style.display = "none";
    guia.style.display = "block";
    cambiar_navegación();
}

//Funciones que se encargan de mosntras las distintas páginas de la guía
const cambiar_navegación = () =>{
    guia_navegacion.style.display = "block";
    guia_armario.style.display = "none";
    guia_scanner.style.display = "none";
    guia_maniqui.style.display = "none";
    guia_favoritos.style.display = "none";
    guia_perfil.style.display = "none";
    guia_pago.style.display = "none";
}
const cambiar_armario = () =>{
    guia_navegacion.style.display = "none";
    guia_armario.style.display = "block";
    guia_scanner.style.display = "none";
    guia_maniqui.style.display = "none";
    guia_favoritos.style.display = "none";
    guia_perfil.style.display = "none";
    guia_pago.style.display = "none";
}
const cambiar_scanner = () =>{
    guia_navegacion.style.display = "none";
    guia_armario.style.display = "none";
    guia_scanner.style.display = "block";
    guia_maniqui.style.display = "none";
    guia_favoritos.style.display = "none";
    guia_perfil.style.display = "none";
    guia_pago.style.display = "none";
}
const cambiar_maniqui = () =>{
    guia_navegacion.style.display = "none";
    guia_armario.style.display = "none";
    guia_scanner.style.display = "none";
    guia_maniqui.style.display = "block";
    guia_favoritos.style.display = "none";
    guia_perfil.style.display = "none";
    guia_pago.style.display = "none";
}
const cambiar_favritos = () =>{
    guia_navegacion.style.display = "none";
    guia_armario.style.display = "none";
    guia_scanner.style.display = "none";
    guia_maniqui.style.display = "none";
    guia_favoritos.style.display = "block";
    guia_perfil.style.display = "none";
    guia_pago.style.display = "none";
}
const cambiar_perfil = () =>{
    guia_navegacion.style.display = "none";
    guia_armario.style.display = "none";
    guia_scanner.style.display = "none";
    guia_maniqui.style.display = "none";
    guia_favoritos.style.display = "none";
    guia_perfil.style.display = "block";
    guia_pago.style.display = "none";
}
const cambiar_pago = () =>{
    guia_navegacion.style.display = "none";
    guia_armario.style.display = "none";
    guia_scanner.style.display = "none";
    guia_maniqui.style.display = "none";
    guia_favoritos.style.display = "none";
    guia_perfil.style.display = "none";
    guia_pago.style.display = "block";
    siguiente.style.display = "none";
}

//Función que se encarga de pasar entre las páginas de la guía al pulsar siguiente
siguiente.addEventListener("touchend", ()=>{
    if(guia_navegacion.style.display === "block"){
        cambiar_armario();
    }
    else if(guia_armario.style.display === "block"){
        cambiar_scanner();
    }
    else if(guia_scanner.style.display === "block"){
        cambiar_maniqui();
    }
    else if(guia_maniqui.style.display === "block"){
        cambiar_favritos();
    }
    else if(guia_favoritos.style.display === "block"){
        cambiar_perfil();
    }
    else if(guia_perfil.style.display === "block"){
        cambiar_pago();
    }
    

});


//Función que cierra la guía y abre la app al pulsar la x
cerrar.addEventListener("touchend", ()=>{
    app.style.display = "block";
    guia.style.display = "none";
    act_pag_armario();
});

//Función que cierra la guía y abre la app al pulsar acceptar en la última página
acceptar.addEventListener("touchend", ()=>{
    app.style.display = "block";
    guia.style.display = "none";
    act_pag_armario();
});
