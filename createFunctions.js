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
    const riverGeometry = new THREE.PlaneGeometry(5, 80);
    //const waterTexture = textureLoader.load('./textures/Water_1_M_Normal.jpg');
    //const waterNormalMap = textureLoader.load('./textures/Water_2_M_Normal.jpg');
    const waterTexture = textureLoader.load('./textures/Water_2_M_Normal.jpg');

    // Adjust the repeat factor to control the tiling of the texture
    //waterTexture.repeat.set(6, 100); // Adjust as needed

    // Adjust the repeat factor to control the tiling of the texture
    waterTexture.repeat.set(4, 40); // Adjust as needed
   
    // Adjust the wrap mode to repeat the texture
    waterTexture.wrapS = THREE.RepeatWrapping;
    waterTexture.wrapT = THREE.RepeatWrapping;
    riverTexture = waterTexture;
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
function createRoad(length = 60) {
    const roadGeometry = new THREE.PlaneGeometry(length, 5);
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
    const clapboardGeometry = new THREE.BoxGeometry(0.1, 0.2, 5);
    const clapBoardMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const clapBoard1 = new THREE.Mesh(clapboardGeometry, clapBoardMaterial);
    const clapBoard2 = new THREE.Mesh(clapboardGeometry, clapBoardMaterial);
    const clapBoard3 = new THREE.Mesh(clapboardGeometry, clapBoardMaterial);
    const clapBoard4 = new THREE.Mesh(clapboardGeometry, clapBoardMaterial);
    const clapBoard5 = new THREE.Mesh(clapboardGeometry, clapBoardMaterial);
    const clapBoard6 = new THREE.Mesh(clapboardGeometry, clapBoardMaterial);

    clapBoard1.rotation.y = Math.PI / 2;
    clapBoard2.rotation.y = Math.PI / 2;
    clapBoard3.rotation.y = Math.PI / 2;
    clapBoard4.rotation.y = Math.PI / 2;
    clapBoard5.rotation.y = Math.PI / 2;
    clapBoard6.rotation.y = Math.PI / 2;

    clapBoard1.position.set(0, 0.15, 1.5);
    clapBoard2.position.set(0, 0.15, -1.5);
    clapBoard3.position.set(0, 0.8, 1.5);
    clapBoard4.position.set(0, 0.8, -1.5);
    clapBoard5.position.set(0, 1.5, 1.5);
    clapBoard6.position.set(0, 1.5, -1.5);

    // add aditional support
    const stakeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
    const stakeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const stake1 = new THREE.Mesh(stakeGeometry, stakeMaterial);
    const stake2 = new THREE.Mesh(stakeGeometry, stakeMaterial);
    const stake3 = new THREE.Mesh(stakeGeometry, stakeMaterial);
    const stake4 = new THREE.Mesh(stakeGeometry, stakeMaterial);

    stake1.position.set(-2.5, 0.25, -1.5);
    stake2.position.set(-2.5, 0.25, 1.5);
    stake3.position.set(2.5, 0.25, -1.5);
    stake4.position.set(2.5, 0.25, 1.5);





    // create bridge
    const bridge = new THREE.Group();
    bridge.add(plank1);
    bridge.add(plank2);
    bridge.add(plank3);
    bridge.add(clapBoard1);
    bridge.add(clapBoard2);
    bridge.add(clapBoard3);
    bridge.add(clapBoard4);
    bridge.add(clapBoard5);
    bridge.add(clapBoard6);
    bridge.add(stake1);
    bridge.add(stake2);
    bridge.add(stake3);
    bridge.add(stake4);
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

function createHouse(){
    const houseGeometry = new THREE.BoxGeometry(7, 5, 8);
    const houseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,0,0)' });
    const houseObject = new THREE.Mesh(houseGeometry, houseMaterial);
    houseObject.visible = false;
    houseObject.position.y = 1.5;

    const roofGeometry = new THREE.ConeGeometry(7, 4, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,0)' });
    const roofObject = new THREE.Mesh(roofGeometry, roofMaterial);
    roofObject.visible = false;
    roofObject.position.y = 5.5;
    roofObject.rotation.y = Math.PI / 4;

    

    const house = new THREE.Group();
    house.add(houseObject);
    house.add(roofObject);

    
    return house;

}



function createFence(){
    const stakeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.8, 32);
    const stakeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const stake1 = new THREE.Mesh(stakeGeometry, stakeMaterial);
    const stake2 = new THREE.Mesh(stakeGeometry, stakeMaterial);

    stake1.position.set(-1.5, 0.7, 1.5);
    stake2.position.set(1.5, 0.7, 1.5);


    const clapBoardGeometry = new THREE.BoxGeometry(0.1, 0.2, 3);
    const clapBoardMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const clapBoard1 = new THREE.Mesh(clapBoardGeometry, clapBoardMaterial);
    const clapBoard2 = new THREE.Mesh(clapBoardGeometry, clapBoardMaterial);
    const clapBoard3 = new THREE.Mesh(clapBoardGeometry, clapBoardMaterial);

    clapBoard1.rotation.y = Math.PI / 2;
    clapBoard2.rotation.y = Math.PI / 2;
    clapBoard3.rotation.y = Math.PI / 2;

    clapBoard1.position.set(0, 0.3, 1.5);
    clapBoard2.position.set(0, 0.8, 1.5);
    clapBoard3.position.set(0, 1.3, 1.5);

    const fence = new THREE.Group();
    fence.add(stake1);
    fence.add(stake2);
    fence.add(clapBoard1);
    fence.add(clapBoard2);
    fence.add(clapBoard3);
    
    return fence;

}


function createGate(){
    const stakeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const stakeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const stake1 = new THREE.Mesh(stakeGeometry, stakeMaterial);
    const stake2 = new THREE.Mesh(stakeGeometry, stakeMaterial);

    stake1.position.set(-2.5, 0.9, 1.5);
    stake2.position.set(2.5, 0.9, 1.5);

    const smallStakeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
    const smallStakeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const smallStake1 = new THREE.Mesh(smallStakeGeometry, smallStakeMaterial);
    const smallStake2 = new THREE.Mesh(smallStakeGeometry, smallStakeMaterial);

    smallStake1.position.set(-2.3, 1, 1.5);
    smallStake2.position.set(2.2, 1, 1.5);


    const clapBoardGeometry = new THREE.BoxGeometry(0.1, 0.2, 4.4);
    const clapBoardMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const clapBoard1 = new THREE.Mesh(clapBoardGeometry, clapBoardMaterial);
    const clapBoard2 = new THREE.Mesh(clapBoardGeometry, clapBoardMaterial);
    const clapBoard3 = new THREE.Mesh(clapBoardGeometry, clapBoardMaterial);

    clapBoard1.rotation.y = Math.PI / 2;
    clapBoard2.rotation.y = Math.PI / 2;
    clapBoard3.rotation.y = Math.PI / 2;

    clapBoard1.position.set(-0.03, 0.5, 1.5);
    clapBoard2.position.set(-0.03, 1.0, 1.5);
    clapBoard3.position.set(-0.03, 1.5, 1.5);


    const structureGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 32);
    const structureMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const structure1 = new THREE.Mesh(structureGeometry, structureMaterial);
    structure1.position.set(0, 1, 1.4);

    const gate = new THREE.Group();
    gate.add(stake1);
    gate.add(stake2);
    gate.add(smallStake1);
    gate.add(smallStake2);
    gate.add(clapBoard1);
    gate.add(clapBoard2);
    gate.add(clapBoard3);
    gate.add(structure1);
    return gate;
}

function createBarnFence(){
    const BARN_FENCE = new THREE.Group();
    for (let k = -1; k < 2; k += 2)
        for (let i = 0; i < 8; i++) {
            const fence1 = createFence();
            fence1.position.set(88 - i * 3, 0.2, -12 * k);
            //fence1.rotation.y = Math.PI / 2;
            fence1.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.visible = false;
                }
            });
            BARN_FENCE.add(fence1);
            //sceneGraph.add(fence1);
        }
    /*
    for (let i = 0; i < 8; i++) {
        const fence1 = createFence();
        fence1.position.set(88 - i * 3, 0.2, 10);
        //fence1.rotation.y = Math.PI / 2;
        fence1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        sceneGraph.add(fence1);
    }
    */

    for (let j = 0; j < 3; j++) {
        const fence2 = createFence();
        fence2.position.set(64, 0.2, -9 + j * 3);
        fence2.rotation.y = Math.PI / 2;
        fence2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN_FENCE.add(fence2);
        //sceneGraph.add(fence2);
    }

    for (let j = 0; j < 3; j++) {
        const fence2 = createFence();
        fence2.position.set(64, 0.2, 6 + j * 3);
        fence2.rotation.y = Math.PI / 2;
        fence2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN_FENCE.add(fence2);
        //sceneGraph.add(fence2);
    }
    const gate = createGate();
    //gate.position.set(10, 0, -5); 
    gate.position.set(64, 0, 1.5);
    gate.rotation.y = Math.PI / 2;
    gate.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.visible = false;
        }
    });
    BARN_FENCE.add(gate);
    return BARN_FENCE;
}

function createDuck() {
    const duck = new THREE.Group();

    const bodycolor = new THREE.MeshPhongMaterial({ color: 0xf8fc03 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(24, 12, 14), bodycolor);
    body.position.set(0, 0, 3);
    body.castShadow = true; body.receiveShadow = true;

    const wings = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 18), bodycolor);
    wings.position.set(4, 2, 3);
    wings.castShadow = true; wings.receiveShadow = true;

    const head = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 8), bodycolor);
    head.position.set(-6, 10, 3);
    head.castShadow = true; head.receiveShadow = true;

    const geometrybeak = new THREE.BoxGeometry(6, 2, 4);
    const materialbeak = new THREE.MeshPhongMaterial({ color: 0xfc5a03 });
    const beak = new THREE.Mesh(geometrybeak, materialbeak);
    beak.position.set(-14, 8, 3);
    beak.castShadow = true; beak.receiveShadow = true;

    const eye = new THREE.SphereGeometry(2.1, 32, 32)
    const eyecolor = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leye = new THREE.Mesh(eye, eyecolor);
    leye.position.set(-8, 10.5, 0);

    const reye = new THREE.Mesh(eye, eyecolor);
    reye.position.set(-8, 10.5, 6);

    duck.add(body, wings, head, beak, leye, reye)
    duck.name = "duck";

    return duck;

}

export { createTree, createRiver, createRoad, createBridge, createMountain, createHouse, createBarnFence, createDuck, riverTexture}