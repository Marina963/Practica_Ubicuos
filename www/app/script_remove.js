let posicion = []
const sensorABS = new AbsoluteOrientationSensor({ frequency: 2, referenceFrame: "device" });
let cont = 0;
let item;
let id = "";

sensorABS.addEventListener("reading", () => {
  posicion = sensorABS.quaternion;
  if (posicion[3] <= 0.1 && posicion[2] <= 0.1){
    if (cont == 0){
      navigator.vibrate(500);
    }
    cont += 1;
    console.log("mirando abajo");
    if (cont >=6){
      navigator.vibrate(1000);
      item = document.getElementsByClassName("mostrar_producto");
      remove(item[0]);
      cont = 0;
      sensorABS.stop();
      sensorAcc.stop();
    }
  }else{
    cont = 0
  }
});

sensorABS.addEventListener("error", (error) => {
  if (event.error.name === "NotReadableError") {
    console.log("Sensor is not available.");
  }
});