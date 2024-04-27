import * as THREE from "three";
import "./js/mountain.js";

const textureLoader = new THREE.TextureLoader()

// FUCNTIONS FOR BUILDING THE SCENE
function createTree(scaleX = 1, scaleY = 1, scaleZ = 1) {
    // Creating a model by grouping basic geometries

    // Cylinder centered at the origin
    const cylinderRadius = 0.25;
    const cylinderHeight = 1;
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
    const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(cylinderGeometry, redMaterial);
    // Move base of the cylinder to y = 0
    cylinder.position.y = cylinderHeight / 2.0;
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    // Cone
    const baseConeRadius = 0.5;
    const coneHeight = 1.5;
    const coneGeometry = new THREE.ConeGeometry(baseConeRadius, coneHeight, 32);
    const greenMaterial = new THREE.MeshPhongMaterial({ color: 0x33cc33 });
    const cone = new THREE.Mesh(coneGeometry, greenMaterial);
    // Move base of the cone to the top of the cylinder
    cone.position.y = cylinderHeight + coneHeight / 2.0;
    cone.castShadow = true;
    cone.receiveShadow = true;

    // Tree
    const tree = new THREE.Group();
    tree.add(cylinder);
    tree.add(cone);
    tree.scale.set(scaleX, scaleY, scaleZ);
    return tree;
}

let riverTexture;
function createRiver() {
    const riverGeometry = new THREE.PlaneGeometry(5, 101);
    //const waterTexture = textureLoader.load('./textures/Water_1_M_Normal.jpg');
    //const waterNormalMap = textureLoader.load('./textures/Water_2_M_Normal.jpg');
    const waterTexture = textureLoader.load('./textures/Water_2_M_Normal.jpg');

    // Adjust the repeat factor to control the tiling of the texture
    //waterTexture.repeat.set(6, 100); // Adjust as needed

    // Adjust the repeat factor to control the tiling of the texture
    waterTexture.repeat.set(4, 40); // Adjust as needed
    riverTexture = waterTexture;
    // Adjust the wrap mode to repeat the texture
    waterTexture.wrapS = THREE.RepeatWrapping;
    waterTexture.wrapT = THREE.RepeatWrapping;

    const riverMaterial = new THREE.MeshPhongMaterial({
        map: waterTexture,
        //normalMap: waterNormalMap,
        side: THREE.DoubleSide,
    });
    //const riverMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,255)', side: THREE.DoubleSide });
    const riverObject = new THREE.Mesh(riverGeometry, riverMaterial);
    riverObject.rotation.x = Math.PI / 2;
    return riverObject
}
function createRoad() {
    const roadGeometry = new THREE.PlaneGeometry(60, 5);
    const roadMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,0)', side: THREE.DoubleSide });
    const roadObject = new THREE.Mesh(roadGeometry, roadMaterial);
    roadObject.rotation.x = Math.PI / 2;
    return roadObject
}
function createBridge() {
    // create planks
    const plankGeometry = new THREE.BoxGeometry(1, 0.1, 3);
    const plankMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const plank1 = new THREE.Mesh(plankGeometry, plankMaterial);
    const plank2 = new THREE.Mesh(plankGeometry, plankMaterial);
    const plank3 = new THREE.Mesh(plankGeometry, plankMaterial);

    plank1.position.set(-1.5, 0.05, 0);
    plank2.position.set(0, 0.05, 0);
    plank3.position.set(1.5, 0.05, 0);

    // add structure to planks
    const structureGeometry = new THREE.BoxGeometry(0.1, 0.2, 5);
    const structureMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const structure1 = new THREE.Mesh(structureGeometry, structureMaterial);
    const structure2 = new THREE.Mesh(structureGeometry, structureMaterial);
    const structure3 = new THREE.Mesh(structureGeometry, structureMaterial);
    const structure4 = new THREE.Mesh(structureGeometry, structureMaterial);
    const structure5 = new THREE.Mesh(structureGeometry, structureMaterial);
    const structure6 = new THREE.Mesh(structureGeometry, structureMaterial);

    structure1.rotation.y = Math.PI / 2;
    structure2.rotation.y = Math.PI / 2;
    structure3.rotation.y = Math.PI / 2;
    structure4.rotation.y = Math.PI / 2;
    structure5.rotation.y = Math.PI / 2;
    structure6.rotation.y = Math.PI / 2;

    structure1.position.set(0, 0.15, 1.5);
    structure2.position.set(0, 0.15, -1.5);
    structure3.position.set(0, 0.8, 1.5);
    structure4.position.set(0, 0.8, -1.5);
    structure5.position.set(0, 1.5, 1.5);
    structure6.position.set(0, 1.5, -1.5);

    // add aditional support
    const supportGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
    const supportMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const support1 = new THREE.Mesh(supportGeometry, supportMaterial);
    const support2 = new THREE.Mesh(supportGeometry, supportMaterial);
    const support3 = new THREE.Mesh(supportGeometry, supportMaterial);
    const support4 = new THREE.Mesh(supportGeometry, supportMaterial);

    support1.position.set(-2.5, 0.25, -1.5);
    support2.position.set(-2.5, 0.25, 1.5);
    support3.position.set(2.5, 0.25, -1.5);
    support4.position.set(2.5, 0.25, 1.5);





    // create bridge
    const bridge = new THREE.Group();
    bridge.add(plank1);
    bridge.add(plank2);
    bridge.add(plank3);
    bridge.add(structure1);
    bridge.add(structure2);
    bridge.add(structure3);
    bridge.add(structure4);
    bridge.add(structure5);
    bridge.add(structure6);
    bridge.add(support1);
    bridge.add(support2);
    bridge.add(support3);
    bridge.add(support4);
    bridge.receiveShadow = true;

    /*
    const bridgeGeometry = new THREE.BoxGeometry(5.2, 1, 2); // Adjust dimensions as needed
    const bridgeMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
    */
    return bridge;
}
function createMountain() {
    const mountainTexture = textureLoader.load('./textures/mountain.jpg');

    // Adjust the repeat factor to control the tiling of the texture
    mountainTexture.repeat.set(4, 4); // Adjust as needed

    // Adjust the wrap mode to repeat the texture
    mountainTexture.wrapS = THREE.RepeatWrapping;
    mountainTexture.wrapT = THREE.RepeatWrapping;

    const coneGeometry = new THREE.ConeGeometry(7, 15, 32);
    const coneMaterial = new THREE.MeshPhongMaterial({ map: mountainTexture });
    const coneObject = new THREE.Mesh(coneGeometry, coneMaterial);
    coneObject.castShadow = true;
    coneObject.receiveShadow = true;
    return coneObject;
}

export { createTree, createRiver, createRoad, createBridge, createMountain, riverTexture}