const boton_xs = document.getElementById('boton_XS');
const boton_s = document.getElementById('boton_S');
const boton_m = document.getElementById('boton_M');
const boton_l = document.getElementById('boton_L');
const boton_xl = document.getElementById('boton_XL');
const talla_pref = document.getElementById('talla_pref');
var talla;
//botones que cambian la talla preferida, mandan un mensaje al servidor para que se cambie en el json
boton_xs.addEventListener('click', function(e){
    e.preventDefault();
    talla = "XS";
    socket.emit("CAMBIO_TALLA", talla);
    talla_pref.innerHTML = "XS";
})
boton_s.addEventListener('click', function(e){
    e.preventDefault();
    talla = "S";
    socket.emit("CAMBIO_TALLA", talla);
    talla_pref.innerHTML = "S";
})
boton_m.addEventListener('click', function(e){
    e.preventDefault();
    talla = "M";
    socket.emit("CAMBIO_TALLA", talla);
    talla_pref.innerHTML = "M";
})
boton_l.addEventListener('click', function(e){
    e.preventDefault();
    talla = "L";
    socket.emit("CAMBIO_TALLA", talla);
    talla_pref.innerHTML = "L";
})
boton_xl.addEventListener('click', function(e){
    e.preventDefault();
    talla = "XL";
    socket.emit("CAMBIO_TALLA", talla);
    talla_pref.innerHTML = "XL";
})