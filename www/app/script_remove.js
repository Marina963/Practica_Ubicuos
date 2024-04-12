let posicion = []
const options = { frequency: 1, referenceFrame: "device" };
const sensorABS = new AbsoluteOrientationSensor(options);
let cont = 0;
let item;
let id = "";

sensorABS.addEventListener("reading", () => {
  
  posicion = sensorABS.quaternion;
  if (posicion[3] <= 0.1 && posicion[2] <= 0.1){
    cont += 1;
    console.log("mirando abajo");
    if (cont >=4){
      navigator.vibrate(1000);
      item = document.getElementsByClassName("mostrar_producto");
      id = item[0].id
      remove(id[5]);
      sensorABS.stop();
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