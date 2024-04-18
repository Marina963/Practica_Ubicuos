const sensorAcc = new Accelerometer({ frequency: 60 });
let lastX = 0;
let lastY = 0;
let lastZ = 0;

let lastTime =  Date.now();
let shaking = false;
let timer = null;

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

        if ( ((deltaX > options.threshold) && (deltaY > options.threshold)) ||
            ((deltaX > options.threshold) && (deltaZ > options.threshold)) ||
            ((deltaY > options.threshold) && (deltaZ > options.threshold)) ) {
            if (!shaking && ((Date.now()-lastTime) > 1000)) {
                console.log('shake');
                shaking = true;
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
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

