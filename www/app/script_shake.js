/**
 * Sensor de acelerometro utilizado para detectar cuando se sacude el dispositivo para marcar un producto como favorito.
 * Comprueba que se haya movido lo suficiente el dispositivo y tiene un periodo de bloqueo que evita que detecte otro
 * marcado antes de que pase 1 segundo, y así evitar marcar y desmarcar el producto accidentalmente. 
 */
const sensorAcc = new Accelerometer({ frequency: 60 });
let lastX = 0;
let lastY = 0;
let lastZ = 0;

let lastTime =  Date.now();
let shaking = false;

const options = { threshold: 10};


if ('Accelerometer' in window) {
    try {
        sensorAcc.addEventListener("reading", () => { 
            let lastX = 0;
            let lastY = 0;
            let lastZ = 0;
        const deltaX = Math.abs(lastX - sensorAcc.x);
        const deltaY = Math.abs(lastY - sensorAcc.y);
        const deltaZ = Math.abs(lastZ - sensorAcc.z);
        //Comprueba si está siendo sacudido
        if ( ((deltaX > options.threshold) && (deltaY > options.threshold)) ||
            ((deltaX > options.threshold) && (deltaZ > options.threshold)) ||
            ((deltaY > options.threshold) && (deltaZ > options.threshold)) ) {
            // Comprueba que no esté ya marcado como sacudido y que haya pasado 1 segundo
            if (!shaking && ((Date.now()-lastTime) > 1000)) {
                shaking = true;
                console.log('shake');

                lastTime = Date.now();
                item = document.querySelector(".mostrar_producto");
                marcar_favorito(item);
            }
        } else {
            if (shaking) {
            shaking = false;
            }
        }

        lastX = sensorAcc.x;
        lastY = sensorAcc.y;
        lastZ = sensorAcc.z;
        })

    } catch (err) { console.log(err); }
}

