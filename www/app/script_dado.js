const sensorDado = new Accelerometer({ frequency: 60 });
const dice = document.getElementById('dice');
const boton_pago = document.getElementById('boton_pago');
const sacude = document.getElementById('sacude');
const options_dado = { threshold: 5};
var tiempo = 0;
let total;

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
        console.log(total);
        total = total - total*((diceVal*5)/100);
        sacude.innerHTML = "¡Felicidades! Has ganado un descuento del " + diceVal*5 + "%. Tu nuevo total es: " + total + "€";
        boton_pago.style.display = "inline-block";
        if(dice.classList.contains('rolling'))
            dice.classList.remove('rolling');
        socket.emit("NUEVO_TOTAL", total)
    }, tiempo)
}

const pagar = () =>{
    
    socket.emit("PAGAR");
    navigator.vibrate(1000);
    dado.style.display = "none";
    sacude.innerHTML = "¡Sacude el movil para tirar el dado y conseguir un descuento!";
}
boton_pago.addEventListener('click', function(e){
    e.preventDefault();
    pagar();
})

sensorDado.addEventListener("reading", () => {
    const deltaX = Math.abs(lastX - sensorAcc.x);
    const deltaY = Math.abs(lastY - sensorAcc.y);
    const deltaZ = Math.abs(lastZ - sensorAcc.z);
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