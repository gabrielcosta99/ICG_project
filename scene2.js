const scene2 = {
    loadObjects: function (sceneGraph) {

        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        const sun = new THREE.PointLight('rgb(255, 255, 255)', 5000);
        sun.position.set(100, 20, 0);
        sun.shadow.mapSize.width = 4000;
        sun.shadow.mapSize.height = 4000;
        sun.castShadow = true;
        sun.name = "sun";
        sceneElements.sceneGraph.add(sun);

        const light = new THREE.PointLight('rgb(255, 255, 255)', 5000);
        light.position.set(0, 50, 0);
        light.shadow.mapSize.width = 4000;
        light.shadow.mapSize.height = 4000;
        light.castShadow = true;
        light.name = "light";
        sceneElements.sceneGraph.add(light);/**/

        // ************************** //
        // Create the ground
        // ************************** //
        // Load a texture
        const groundTexture = textureLoader.load('./textures/grass.avif');
        // Adjust the repeat factor to control the tiling of the texture
        groundTexture.repeat.set(6, 10); // Adjust as needed
        // Adjust the wrap mode to repeat the texture
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;

        // ************************** //
        // Add platform
        // ************************** //
        const platform = new THREE.BoxGeometry(60, 100, 2);
        const platformMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });

        //const platformMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,255,0)', side: THREE.DoubleSide });
        const platformObject = new THREE.Mesh(platform, platformMaterial);
        //platformObject.position.set(0, 59, 0);
        platformObject.position.set(0, -1, 0);
        platformObject.rotation.x = Math.PI / 2;
        sceneGraph.add(platformObject);
        // Set shadow property
        platformObject.receiveShadow = true;



        // ************************** //
        // Create a cube
        // ************************** //
        // cube center is at (0,0,0)
        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const cubeObject = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeObject.name = "cube";
        cubeObject.position.set(-30, 0.25, 0);
        cubeObject.castShadow = true;
        sceneGraph.add(cubeObject);



        // ************************** //
        // Add a road
        // ************************** //
        const road = createRoad()
        road.position.set(0, 0.002, 0)
        road.receiveShadow = true
        road.name = "road";
        sceneGraph.add(road)

        //add lines to the road
        const lineGeometry = new THREE.PlaneGeometry(0.1, 2.5);
        const lineMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,255,255)', side: THREE.DoubleSide });
        for (let i = 0; i < 5; i++) {
            const line1 = new THREE.Mesh(lineGeometry, lineMaterial);
            line1.position.set(-25 + i * 5, 0.003, 0);
            line1.rotation.x = Math.PI / 2;
            line1.rotation.z = Math.PI / 2;
            sceneGraph.add(line1);
        }
        for (let i = 0; i < 5; i++) {
            const line1 = new THREE.Mesh(lineGeometry, lineMaterial);
            line1.position.set(5 + i * 5, 0.003, 0);
            line1.rotation.x = Math.PI / 2;
            line1.rotation.z = Math.PI / 2;
            sceneGraph.add(line1);
        }

        // ************************** //
        // Add mountains
        // ************************** //
        const mountain3 = createMountain()
        sceneGraph.add(mountain3)

        mountain3.position.set(-23, 7.5, 25)
        mountain3.receiveShadow = true


    }
}