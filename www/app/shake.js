const shakeEvent = new Event("shake");


let lastX = 0;
let lastY = 0;
let lastZ = 0;

let lastTime =  Date.now();
let shaking = false;
let timer = null;

const options = { threshold: 5};


if ('Accelerometer' in window) {
    try {
        const acc = new Accelerometer({ frequency: 60 });
        //acc.addEventListener("reading", function(){ })
        acc.onreading = () => {
        const deltaX = Math.abs(lastX - acc.x);
        const deltaY = Math.abs(lastY - acc.y);
        const deltaZ = Math.abs(lastZ - acc.z);

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
                document.dispatchEvent(shakeEvent);
                lastTime = Date.now();
            }
        } else {
            if (shaking) {
            shaking = false;
            /*timer = setTimeout(() => {
                console.log("stop");
            }, 500);*/
            }
        }

        lastX = acc.x;
        lastY = acc.y;
        lastZ = acc.z;
        }

        acc.start();
    } catch (err) { console.log(err); }
}

