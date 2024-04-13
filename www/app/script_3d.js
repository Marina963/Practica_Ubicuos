const modelo= () =>{
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    let model;
    let loader = new THREE.GLTFLoader();


    loader.load(
        '../modelo_3d/maniqui.glb',
        function (gltf) {
            model = gltf.scene;
            //scene.add(model);
            model.scale.set(5, 5, 5);
            model.position.set(2, -4, 0);
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

    
    // Update mesh rotation using quaternion.
    const sensorAbs = new AbsoluteOrientationSensor();
    sensorAbs.onreading = () => {
        const tilt = sensorAbs.quaternion[2];

        // Definir un umbral para detectar un movimiento significativo
        const tiltThreshold = 0.4;
        
        // Si la inclinación supera el umbral, rotar el modelo hacia la izquierda o derecha
        if (Math.abs(tilt) > tiltThreshold) {
            console.log(Math.abs(tilt) );
            if (tilt > 0) {
                // Inclinación hacia la derecha
            
                console.log("derecha");
                    model.rotation.y += 0.1; // Ajusta la velocidad de rotación según sea necesario
            
            } else {
                // Inclinación hacia la izquierda
            
                    console.log("izqa");
                    model.rotation.y -= 0.1; // Ajusta la velocidad de rotación según sea necesario
            
            }
        }
        
        
      
        renderer.render(scene, camera);
    }

    sensorAbs.start();
    
    
}

