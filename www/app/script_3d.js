let maniqui = document.querySelector("#maniqui");
let model;

//SE crean las varibles del modelo ·D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
const sensorAbs = new AbsoluteOrientationSensor({ frequency: 20, referenceFrame: "device" });

//FUncion que muestra el modelo ·D
const modelo= () =>{ 
    renderer.setSize(window.innerWidth, window.innerHeight);
    maniqui.appendChild(renderer.domElement);
    scene.add(directionalLight);

   //Se ccarga el modelo
    let loader = new THREE.GLTFLoader();
    loader.load(
        '../modelo_3d/maniqui.glb',
        function (gltf) {
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

    camera.position.z = 10;
    renderer.render(scene, camera);
    animate();

    sensorAbs.start();  
}

//Función que renderiza el modelo
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//funcio que detecta si se mueve el movil a la derecha o la izquierda para rotar el maniqui
sensorAbs.addEventListener("reading", () => {
    let posicionX = sensorAbs.quaternion[0];
    let posicionY = sensorAbs.quaternion[1];
    if (Math.abs(posicionX) > 0.3 ) { 
        scene.traverse((object)=> {
            if (object.isMesh) {
                if (posicionY > 0.1 ){
                    // Rotación hacia la derecha
                    object.rotation.y += 0.2 ;
                } else if (posicionY < -0.1) {
                    // Rotación hacia la izquierda
                    object.rotation.y -= 0.2 ;
                }
            }
        });
        renderer.render(scene, camera);
    }

});



const quitarModelo = () => {
    sensorAbs.stop();
    if (model) {
        scene.remove(model); 
        model = null; 
        renderer.render(scene, camera);
        
    }
};