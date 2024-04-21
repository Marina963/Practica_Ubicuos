/*-----------Script del modelo 3D-------------------- */


//Se crean las varibles del modelo 3D, se crea la escena se añade la camara, la luz y el renderizador .
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();

//Seleciona la páuina donde se va a posicionar el modelo
let maniqui = document.querySelector("#maniqui");
let model;

//Se inicializa sensor de movimineto
const sensorAbs = new AbsoluteOrientationSensor({ frequency: 20, referenceFrame: "device" });


//Función que muestra el modelo 3D
const modelo= () =>{ 
    //Se inidca donde se va incluir y se le añade la luz
    renderer.setSize(window.innerWidth, window.innerHeight);
    maniqui.appendChild(renderer.domElement);
    scene.add(directionalLight);

   //Se carga el modelo con el formato GLB
    let loader = new THREE.GLTFLoader();
    loader.load(
        '../modelo_3d/maniqui.glb',
        function (gltf) {
            //Se adapta la posicion y la escala del modelo y se añade a la escena.
            model = gltf.scene;
            model.scale.set(20, 20, 20);
            model.position.set(23, -8, 0);
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ map: child.material.map });
                }
            });
            scene.add(model);
            
        },
        undefined,
        function (error) {
            console.error('Error al cargar el modelo GLB', error);
        }
    );

    //Se establece la posición de la cámara, se renderiza y se iniciael sensor de movimineto
    camera.position.z = 10;
    renderer.render(scene, camera);
    animate();
    sensorAbs.start();  
}

//Función que renderizar el modelo
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


//Función que eliminar el modelo
const quitarModelo = () => {
    sensorAbs.stop();
    if (model) {
        scene.remove(model); 
        model = null; 
        renderer.render(scene, camera);
        
    }
};



//Evento que detecta si el dispositivo se inclina hacia  la derecha o la izquierda para rotar el maniqui
sensorAbs.addEventListener("reading", () => {
    //Se seleciona las cordenadas corresponidnetes
    let posicionX = sensorAbs.quaternion[0];
    let posicionY = sensorAbs.quaternion[1];

    //Comprueba si el dispositivo esta en posición vertical
    if (Math.abs(posicionX) > 0.3 ) { 
        scene.traverse((object)=> {
            if (object.isMesh) {
                //Comrueba el dispositivo hace un movimiento a la derecha o hacia la izquierda
                if (posicionY > 0.1 ){
                    // Rotación hacia la derecha
                    object.rotation.y += 0.2 ;
                } else if (posicionY < -0.1) {
                    // Rotación hacia la izquierda
                    object.rotation.y -= 0.2 ;
                }
            }
        });
        //Se actualiza la posición del maniqui
        renderer.render(scene, camera);
    }

});
