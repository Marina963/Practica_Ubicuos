let maniqui = document.querySelector("#maniqui");
let model;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
const sensorAbs = new AbsoluteOrientationSensor({ frequency: 1, referenceFrame: "device" });
const modelo= () =>{ 
    renderer.setSize(window.innerWidth, window.innerHeight);
    maniqui.appendChild(renderer.domElement);
    scene.add(directionalLight);

   
    let loader = new THREE.GLTFLoader();


    loader.load(
        '../modelo_3d/maniqui.glb',
        function (gltf) {
            model = gltf.scene;
            //scene.add(model);
            model.scale.set(6, 6, 6);
            model.position.set(3, -4, 0);
            model.traverse((child) => {
                if (child.isMesh) {
                    // Aquí puedes ajustar el material según tus necesidades
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

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


sensorAbs.addEventListener("reading", () => {
    let posicionX = sensorAbs.quaternion[0];
    let posicionY = sensorAbs.quaternion[1];
    if (Math.abs(posicionX) > 0.3 ) { 
        scene.traverse((object)=> {
            if (object.isMesh) {
                if (posicionY > 0.1 ){
                    // Rotación hacia la derecha
                    object.rotation.y += 0.4 ;
                } else if (posicionY < -0.1) {
                    // Rotación hacia la izquierda
                    object.rotation.y -= 0.4 ;
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