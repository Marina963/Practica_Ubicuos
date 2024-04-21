let posicion = []
const sensorABS = new AbsoluteOrientationSensor({ frequency: 2, referenceFrame: "device" });
let cont = 0;
let item;
let id = "";

/* Función que detecta si el movil está boca abajo. Cuando lo detecta por primera vez hace una 
vibración corta y cuando se mantiene 3 segundos vibra durante un segundo, elimina el objeto y para el sensor*/
sensorABS.addEventListener("reading", () => {
  posicion = sensorABS.quaternion;
  if (posicion[3] <= 0.1 && posicion[2] <= 0.1){
    if (cont == 0){
      navigator.vibrate(200);
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

//Función de error del sensor
sensorABS.addEventListener("error", (error) => {
  if (event.error.name === "NotReadableError") {
    console.log("Sensor is not available.");
  }
});