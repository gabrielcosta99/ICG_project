import * as THREE from "three";

const textureLoader = new THREE.TextureLoader()
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();


// FUCNTIONS FOR BUILDING THE SCENE
function createTree(scaleX = 1, scaleY = 1, scaleZ = 1) {
    // Creating a model by grouping basic geometries

    // Cylinder centered at the origin
    const cylinderRadius = 0.25;
    const cylinderHeight = 1;
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
    const redMaterial = new THREE.MeshPhongMaterial({ color: 0x892201 });
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
    const waterTexture = textureLoader.load('./textures/Water_2_M_Normal.jpg');

    waterTexture.repeat.set(4, 40);

    // Adjust the wrap mode to repeat the texture
    waterTexture.wrapS = THREE.RepeatWrapping;
    waterTexture.wrapT = THREE.RepeatWrapping;
    riverTexture = waterTexture;
    const riverMaterial = new THREE.MeshPhongMaterial({
        map: waterTexture,
        //normalMap: waterNormalMap,
        side: THREE.DoubleSide,
    });

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

function createHouse() {

    // Load textures
    const wallTexture = textureLoader.load('./textures/house_wall.jpg');
    const roofTexture = textureLoader.load('./textures/house_roof.png');
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(2, 2);
    const frontTexture = textureLoader.load('./textures/wall_door.jpg'); // Texture for the front side

    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
    const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture });
    const doorMaterial = new THREE.MeshStandardMaterial({ map: frontTexture });

    const houseGeometry = new THREE.BoxGeometry(7, 5, 8);

    const materials = [
        wallMaterial,       // Right side
        doorMaterial,       // Left side
        roofMaterial,       // Top side
        wallMaterial,       // Bottom side
        wallMaterial,     // Front side
        wallMaterial,       // Back side
    ];

    const houseObject = new THREE.Mesh(houseGeometry, materials);
    houseObject.position.y = 1.5;

    const roofGeometry = new THREE.ConeGeometry(7, 4, 4);
    const roofObject = new THREE.Mesh(roofGeometry, roofMaterial);
    roofObject.position.y = 5.5;
    roofObject.rotation.y = Math.PI / 4;

    const house = new THREE.Group();
    house.add(houseObject);
    house.add(roofObject);

    return house;
}



function createFence() {
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


function createGate() {
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

    smallStake1.position.set(-2.1, 1, 1.5);
    smallStake2.position.set(2.2, 1, 1.5);


    const clapBoardGeometry = new THREE.BoxGeometry(0.1, 0.2, 4.3);
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
    structure1.position.set(0, 1, 1.6);

    const structure2Geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.2, 32);
    const structure2 = new THREE.Mesh(structure2Geometry, structureMaterial);
    const structure3 = new THREE.Mesh(structure2Geometry, structureMaterial);

    structure2.position.set(1.1, 1, 1.6);
    structure2.rotation.z = Math.PI * 4 / 10;

    structure3.position.set(-1.1, 1, 1.6);
    structure3.rotation.z = -Math.PI * 4 / 10;

    const gate = new THREE.Group();
    gate.add(stake1); gate.add(stake2);
    gate.add(smallStake1); gate.add(smallStake2);
    gate.add(clapBoard1); gate.add(clapBoard2); gate.add(clapBoard3);
    gate.add(structure1); gate.add(structure2); gate.add(structure3);
    return gate;
}

function createBarnFence() {
    const BARN_FENCE = new THREE.Group();
    for (let k = -1; k < 2; k += 2)
        for (let i = 0; i < 8; i++) {
            const fence1 = createFence();
            fence1.position.set(88 - i * 3, 0.2, -12 * k);
            fence1.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.visible = false;
                }
            });
            BARN_FENCE.add(fence1);
        }

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
    }
    const gate = createGate();
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


function createBarn() {
    const BARN = new THREE.Group();
    loader.load('./models/barn.glb', function (gltf) {
        const barnObject = gltf.scene;
        barnObject.position.set(82, 0, 1);
        barnObject.scale.set(0.02, 0.02, 0.02);
        barnObject.rotation.y = Math.PI;
        barnObject.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN.add(barnObject);
    });

    loader.load('./models/horse.glb', function (gltf) {
        const horse = gltf.scene;
        horse.position.set(78, 0, -7);
        horse.scale.set(0.05, 0.05, 0.05);
        horse.rotation.y = Math.PI;
        horse.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN.add(horse);
    });
    loader.load('./models/horse.glb', function (gltf) {
        const horse2 = gltf.scene;
        horse2.position.set(72, 0, 6);

        horse2.scale.set(0.05, 0.05, 0.05);
        horse2.rotation.y = -Math.PI / 3;
        horse2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN.add(horse2);
    });

    // ************************** //
    loader.load('./models/cow.glb', function (gltf) {
        const cow1 = gltf.scene;
        cow1.position.set(71, 0, -3);

        cow1.scale.set(0.4, 0.4, 0.4);
        cow1.rotation.y = -Math.PI * 3 / 5;
        cow1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN.add(cow1);
    });
    loader.load('./models/cow.glb', function (gltf) {
        const cow2 = gltf.scene;
        cow2.position.set(81, 0, 9);
        cow2.scale.set(0.4, 0.4, 0.4);
        cow2.rotation.y = Math.PI / 3;
        cow2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.visible = false;
            }
        });
        BARN.add(cow2);
    });

    const barnFence = createBarnFence();
    barnFence.position.z -= 1.5;
    BARN.add(barnFence);
    return BARN;
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

function createPondWithDuck() {
    const POND = new THREE.Group();

    const pondGeometry = new THREE.CylinderGeometry(5, 5, 0.1, 32);
    const pondMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,255)', side: THREE.DoubleSide });
    const pondObject = new THREE.Mesh(pondGeometry, pondMaterial);
    pondObject.position.set(63, 0, -27);
    pondObject.name = "pond";
    pondObject.receiveShadow = true;
    pondObject.visible = false;

    POND.add(pondObject);
    // ************************** //
    const duck = createDuck();
    duck.position.set(63, 0, -27);
    duck.scale.set(0.03, 0.03, 0.03);
    duck.rotation.y = Math.PI / 2;

    duck.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.visible = false;
        }
    });
    duck.name = "duck";

    POND.add(duck);

    return POND;
}



function createLogPile() {
    const logPile = new THREE.Group();
    const logGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);
    const logMaterial = new THREE.MeshPhongMaterial({ color: 0x892201 });
    const log1 = new THREE.Mesh(logGeometry, logMaterial);
    const log2 = new THREE.Mesh(logGeometry, logMaterial);
    const log3 = new THREE.Mesh(logGeometry, logMaterial);
    const log4 = new THREE.Mesh(logGeometry, logMaterial);
    const log5 = new THREE.Mesh(logGeometry, logMaterial);
    const log6 = new THREE.Mesh(logGeometry, logMaterial);
    const log7 = new THREE.Mesh(logGeometry, logMaterial);
    const log8 = new THREE.Mesh(logGeometry, logMaterial);
    const log9 = new THREE.Mesh(logGeometry, logMaterial);
    const log10 = new THREE.Mesh(logGeometry, logMaterial);



    log1.position.set(0, 3, 0);
    log2.position.set(0, 3, 1);
    log3.position.set(0, 3, 2);
    log4.position.set(0, 3, 3);
    log5.position.set(0.8, 3, 0.5);
    log6.position.set(0.8, 3, 1.5);
    log7.position.set(0.8, 3, 2.5);
    log8.position.set(1.6, 3, 1);
    log9.position.set(1.6, 3, 2);
    log10.position.set(2.4, 3, 1.5);


    logPile.add(log1); logPile.add(log2); logPile.add(log3);
    logPile.add(log4); logPile.add(log5); logPile.add(log6);
    logPile.add(log7); logPile.add(log8); logPile.add(log9);
    logPile.add(log10);


    return logPile;
}



function createChopedTrees() {
    const CHOPED_TREES = new THREE.Group();
    const chopedTreeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const chopedMaterial = new THREE.MeshPhongMaterial({ color: 0x892201 });
    for (let x = 0; x < 4; x++) {
        for (let z = 0; z < 5; z++) {
            const chopedTree = new THREE.Mesh(chopedTreeGeometry, chopedMaterial);
            chopedTree.position.set(35 + x * 5, 0, -30 + z * 5);
            chopedTree.rotation.y = Math.PI / 2;
            chopedTree.castShadow = true;
            chopedTree.receiveShadow = true;
            chopedTree.visible = false;

            CHOPED_TREES.add(chopedTree);
        }
    }
    return CHOPED_TREES;

}




export { createTree, createRiver, createRoad, createBridge, createMountain, createHouse, createBarn, createDuck, createPondWithDuck, createLogPile, createChopedTrees, riverTexture }