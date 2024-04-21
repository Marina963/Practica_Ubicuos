const sensorDado = new Accelerometer({ frequency: 60 });
const dice = document.getElementById('dice');
const boton_pago = document.getElementById('boton_pago');
const sacude = document.getElementById('sacude');
const options_dado = { threshold: 5};
var tiempo = 0;
let total;
/** Funcion que simula el rodar el dado. Calcula el resultado aleatorio y dependiendo de esto
* dura más o menos la animación para que termine en la cara correcta. Cuando ha terminado, cambia 
* el texto al de descuento, muestra el boton de pago y manda el nuevo valor con un emit al servidor.
*
* @param total precio de la compra antes del descuento
*/
const rollDice = (total) =>{
    if(!dice.classList.contains('rolling'))
        dice.classList.add('rolling');

    var diceVal = Math.floor( (Math.random() * 6) + 1 )
    switch (diceVal){
        case 1:
            tiempo = 2300;
            break;
        case 2:
            tiempo = 2000;
            break;
        case 3:
            tiempo = 3700;
            break;
        case 4:
            tiempo = 2450;
            break;
        case 5:
            tiempo = 2780;
            break;
        case 6:
            tiempo = 2150;
            break;
    }
    setTimeout(()=>{
        dice.dataset.face = diceVal;
        total = document.getElementById('total').textContent;
        total = total - total*((diceVal*5)/100);
        sacude.innerHTML = "¡Felicidades! Has ganado un descuento del " + diceVal*5 + "%. Tu nuevo total es: " + total + "€";
        boton_pago.style.display = "inline-block";
        if(dice.classList.contains('rolling'))
            dice.classList.remove('rolling');
        socket.emit("NUEVO_TOTAL", total)
    }, tiempo)
}

// Funcion de pago, avisa al servidor y resetea la pantalla de dado y la oculta
const pagar = () =>{
    socket.emit("PAGAR");
    navigator.vibrate(1000);
    dado.style.display = "none";
    sacude.innerHTML = "¡Sacude el movil para tirar el dado y conseguir un descuento!";
    boton_pago.style.display = "none";
}
// Botón de pago
boton_pago.addEventListener('click', function(e){
    e.preventDefault();
    pagar();
})

/* Funcion que detecta cuando se sacude el movil para tirar el dado, utiliza la api de acelerometro
* y comprueba el desplazamiento del movil. Cuando detecta una sacudida inicia la funcion de rodar dado 
* y detiene el sensor.
*/
sensorDado.addEventListener("reading", () => {
    const deltaX = Math.abs(lastX - sensorDado.x);
    const deltaY = Math.abs(lastY - sensorDado.y);
    const deltaZ = Math.abs(lastZ - sensorDado.z);
    if ( ((deltaX > options.threshold) && (deltaY > options.threshold)) ||
        ((deltaX > options.threshold) && (deltaZ > options.threshold)) ||
        ((deltaY > options.threshold) && (deltaZ > options.threshold)) ) {
        console.log('tira_dado');
        rollDice();
        sensorDado.stop();
    }
    lastX = sensorDado.x;
    lastZ = sensorDado.z;
    })