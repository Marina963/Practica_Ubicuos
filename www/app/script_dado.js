const sensorDado = new Accelerometer({ frequency: 60 });
const dice = document.getElementById('dice')
const rollButton = document.getElementById('rollButton')
const options_dado = { threshold: 5};
var tiempo = 0

const rollDice = () =>{
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

        if(dice.classList.contains('rolling'))
            dice.classList.remove('rolling');
    }, tiempo)
}

rollButton.addEventListener('click', function(e){
    e.preventDefault()
    rollDice()
})

sensorDado.addEventListener("reading", () => {
    const deltaX = Math.abs(lastX - sensorAcc.x);
    const deltaZ = Math.abs(lastZ - sensorAcc.z);
    if ((deltaX > options_dado.threshold) && (deltaZ > options_dado.threshold)) {
        console.log('tira_dado');
        rollDice();
        dice.style.display = "none";
        sensorDado.stop();
    }
    lastX = sensorDado.x;
    lastZ = sensorDado.z;
    })