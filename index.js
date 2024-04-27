import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import HouseMod from "./js/house-r0.js";
import "./js/mountain.js";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,  // NEW
    renderer: null,
    trees: [],
};
const loader = new GLTFLoader();
const mixer = new THREE.AnimationMixer();
const textureLoader = new THREE.TextureLoader();

// HELPER FUNCTIONS

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();

        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        sceneElements.camera = camera;
        camera.position.set(10, 8, 16);
        camera.lookAt(3, 0, 0);

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add point light souce (sun) with shadows
        // ***************************** //
        
        const sun = new THREE.PointLight('rgb(255, 255, 255)', 5000);
        sun.position.set(60, 20, 0);
        sun.shadow.mapSize.width = 4000;
        sun.shadow.mapSize.height = 4000;
        sun.castShadow = true;
        sun.name = "sun";
        sceneElements.sceneGraph.add(sun);        



        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(0, 255, 255)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);

        // ************************** //
        // Control for the camera
        // ************************** //
        sceneElements.control = new OrbitControls(camera, renderer.domElement);
        sceneElements.control.screenSpacePanning = true;
    },

    render: function (sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};

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

const scene = {

    // Create and insert in the scene graph the models of the 3D scene

    load3DObjects: function (sceneGraph) {


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
        //
        
        const groundGeometry = new THREE.BoxGeometry(60, 100,2);
        const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
        
        //const groundMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,255,0)', side: THREE.DoubleSide });
        const groundObject = new THREE.Mesh(groundGeometry, groundMaterial);
        groundObject.position.set(0, -1, 0);
        groundObject.rotation.x = Math.PI / 2;
        sceneGraph.add(groundObject);
        // Set shadow property
        groundObject.receiveShadow = true;

        // ************************** //
        // Create the forest
        // ************************** //
        //const trees = []
        
        
        

        // ************************** //
        // Create a cube
        // ************************** //
        // cube center is at (0,0,0)

        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const cubeObject = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeObject.name = "cube";
        cubeObject.position.set(3, 0.25, 0);
        cubeObject.castShadow = true;
        sceneGraph.add(cubeObject);

        // ************************** //
        // Load a 3D models
        // ************************** //	
        

        // Load birds
        loader.load('./models/birds.glb', function (gltf) {
            console.log("here")
            const birds = gltf.scene;
            birds.position.set(0, 5, 0);
            birds.scale.set(2, 2, 2);
            birds.rotation.y = Math.PI / 2;
            // Get all animations from the glTF model
            const animations = gltf.animations;

            if (animations && animations.length) {
                console.log("animations ", animations);
                const action = mixer.clipAction(animations[0], birds); 
                action.setEffectiveTimeScale(0.005);
                action.play();
            }   
            birds.name = "birds";
            sceneGraph.add(birds);
        });


        // ************************** //
        // Add a house
        // ************************** //
        /*
        const house = createHouse()
        house.position.set(0, 0, -10)
        sceneGraph.add(house)*/

        const house = HouseMod.create();
        house.position.set(-20, 1, -35);
        house.rotation.y = Math.PI / 2;
        house.castShadow = true;
        house.receiveShadow = true;
        house.name = "house";
        sceneGraph.add(house);

        // ************************** //
        // Add a river
        // ************************** //
        const river = createRiver();
        river.position.set(0, 0.006, 0);
        river.name = "river";
        sceneGraph.add(river);

        /*
        // ************************** //
        // Add lines to the river
        // ************************** //

        const lineGeometryRiver = new THREE.PlaneGeometry(0.1, 100);
        const lineMaterialRiver = new THREE.MeshPhongMaterial({ color: 'rgb(255,255,255)', side: THREE.DoubleSide });
        const line1 = new THREE.Mesh(lineGeometryRiver, lineMaterialRiver);
        line1.position.set(-2.5, 0.005, 0);
        line1.rotation.x = Math.PI / 2;
        sceneGraph.add(line1);

        const line2 = new THREE.Mesh(lineGeometryRiver, lineMaterialRiver);
        line2.position.set(2.5, 0.005, 0);
        line2.rotation.x = Math.PI / 2;
        sceneGraph.add(line2);
        */

        // ************************** //
        // Add a waterfall
        // ************************** //
        const waterfallGeometry = new THREE.BoxGeometry(5, 40,0.5);
        const waterfallMaterial = new THREE.MeshPhongMaterial({ map: riverTexture });
        //const waterfallMaterial= new THREE.MeshPhongMaterial({ color: 'rgb(0,0,255)', side: THREE.DoubleSide });
        const waterfall = new THREE.Mesh(waterfallGeometry, waterfallMaterial)
        waterfall.position.set(0, -19.995, 50.25);
        waterfall.rotation.x = Math.PI;
        sceneGraph.add(waterfall);
       
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
        // Add trees
        // ************************** //
        /*
        // Define bounds for tree placement
        const treeBounds = {
            minX: -25, // Adjust as needed
            maxX: 25,  // Adjust as needed
            minZ: -45, // Adjust as needed
            maxZ: 45   // Adjust as needed
        };

        // Loop to create trees
        for (let i = 0; i < 100; i++) {
            let treePosition;
            do {
                // Generate a random position within the bounds
                const x = THREE.MathUtils.randFloat(treeBounds.minX, treeBounds.maxX);
                const z = THREE.MathUtils.randFloat(treeBounds.minZ, treeBounds.maxZ);
                treePosition = new THREE.Vector3(x, 0, z);
            } while (isPositionOccupied(treePosition)); // Check if the position is occupied by road or river
            const tree = createTree();
            tree.position.copy(treePosition);
            sceneElements.sceneGraph.add(tree);
            sceneElements.trees.push(tree);
        }

        // Function to check if a position is occupied by road or river
        function isPositionOccupied(position) {
            // Check if the position is within the bounds of the road or the river
            const road = sceneElements.sceneGraph.getObjectByName("road");
            const river = sceneElements.sceneGraph.getObjectByName("river");
            const roadBounds = new THREE.Box3().setFromObject(road);
            const riverBounds = new THREE.Box3().setFromObject(river);
            console.log(riverBounds,roadBounds)
            const occupied = roadBounds.containsPoint(position) || riverBounds.containsPoint(position);
            console.log("Occupied position: ", position);
            return occupied;
        }*/
        // add trees along the side of the road
        for (let z = 0; z < 7; z++)
            for (let x = -4; x < 5; x++) {
                if (x == 0 || z>=2 && x<-2) continue
                const tree = createTree();
                tree.position.set(x * 7, 0, -3 - z * 5)
                sceneElements.sceneGraph.add(tree)
                sceneElements.trees.push(tree)
            }
        for (let z = 0; z < 7; z++)
            for (let x = -5; x < 6; x++) {
                if (x == 0 || z>= 3 && x<-2) continue
                const tree = createTree();
                tree.position.set(x * 5, 0, 3 + z*5)
                sceneElements.sceneGraph.add(tree)
                sceneElements.trees.push(tree)
            }


        
        // ************************** //
        // Add a bridge
        // ************************** //
        const bridge = createBridge()
        bridge.position.set(0, 0.003, 0)
        bridge.receiveShadow = true
        sceneGraph.add(bridge)
        

        // ************************** //
        // Add a bridge made by a tree
        // ************************** //
        /*
        const treeBridge = createTree(1.5, 2.5)
        treeBridge.position.set(-3, 0.3, 0)
        treeBridge.rotation.z = -Math.PI / 2
        treeBridge.receiveShadow = true
        sceneGraph.add(treeBridge)
        */

        // ************************** //
        // Add mountains
        // ************************** //
        const mountain1 = createMountain()
        const mountain2 = createMountain()
        const subMountain2 = createMountain()
        const mountain3 = createMountain()
        sceneGraph.add(mountain1)
        sceneGraph.add(mountain2)
        sceneGraph.add(subMountain2)
        sceneGraph.add(mountain3)

        mountain1.position.set(0, 7.5, -43)
        mountain2.position.set(-23, 7.5, -25)
        subMountain2.position.set(-25, 6, -18)
        subMountain2.scale.set(0.7, 0.8, 0.7)
        mountain3.position.set(-23, 7.5, 25)
        mountain1.receiveShadow = true


        // ************************** //
        // Add a butterfly
        // ************************** //
        const butterflyGroup = new THREE.Group();
        loader.load('./models/butterfly.glb', function (gltf) {
            const butterfly = gltf.scene;
            butterfly.position.set(-2, 0, -0.1);
            butterfly.scale.set(0.2, 0.2, 0.2);
            butterfly.rotation.x = Math.PI / 4;
            //butterfly.name = "butterfly";
            butterflyGroup.add(butterfly);
        });
        butterflyGroup.name = "butterfly";
        sceneGraph.add(butterflyGroup);
        butterflyGroup.position.set(16, -1, -10);


        // ************************** //
        // Add a flower
        // ************************** //
        loader.load('./models/flower.glb', function (gltf) {
            const flower = gltf.scene;
            flower.position.set(16, 0, -10);
            flower.scale.set(0.3, 0.3, 0.3);
            sceneGraph.add(flower);
        });

    }
};

// COLLISION DETECTION
function collision({ element1, element2 }) {
    const element1Right = element1.position.x + 0.5 / 2
    const element1Left = element1.position.x - 0.5 / 2
    //const element1Top = element1.position.y + 0.5 / 2
    //const element1Bottom = element1.position.y - 0.5 / 2
    const element1Front = element1.position.z + 0.5 / 2
    const element1Back = element1.position.z - 0.5 / 2

    const element2Right = element2.position.x + 0.5 / 2
    const element2Left = element2.position.x - 0.5 / 2
    //const element2Top = element2.position.y + 0.5 / 2
    //const element2Bottom = element2.position.y - 0.5 / 2
    const element2Front = element2.position.z + 0.5 / 2
    const element2Back = element2.position.z - 0.5 / 2

    const xCollision = element1Right >= element2Left && element1Left <= element2Right
    //const yCollision = element1Bottom + 0.02 <= element2Top && element1Top >= element2Bottom
    const zCollision = element1Front >= element2Back && element1Back <= element2Front
    return xCollision && zCollision
}

function inRiver() {
    const cube = sceneElements.sceneGraph.getObjectByName("cube");
    //const river = sceneElements.sceneGraph.getObjectByName("river");
    const cubeRight = cube.position.x + 0.5 / 2
    const cubeLeft = cube.position.x - 0.5 / 2
    //const cubeFront = cube.position.z + 0.5 / 2
    //const cubeBack = cube.position.z - 0.5 / 2

    const riverRight = 2.5
    const riverLeft = -2.5

    const xCollision = cubeRight >= riverLeft && cubeLeft <= riverRight
    return xCollision && cube.position.z < 50
}

function inBridge(){    // check if the cube is in the bridge
    // we only need to check the z-axis because the "inRiver" function already checks the x-axis
   
    const cube = sceneElements.sceneGraph.getObjectByName("cube");
    const cubeFront = cube.position.z + 0.5 / 2
    const cubeBack = cube.position.z - 0.5 / 2

    const bridgeFront = 1.5
    const bridgeBack = -1.5

    const zCollision = cubeFront >= bridgeBack && cubeBack <= bridgeFront
    return zCollision && cube.position.z < 50
}

// ANIMATION

// Displacement values
var delta = 0.1;
var dispX = 0.05, dispZ = 0.05;
var touchGround = false;

// To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false, keyQ = false, keySpace = false;
var toggledCamera = false;
var step = 0;

let frames = 0
let previousCubePosition = new THREE.Vector3()
function computeFrame(time) {

    // Can extract an object from the scene Graph from its name
    
    const sun = sceneElements.sceneGraph.getObjectByName("sun");
    // rotate the light around the plane
    sun.position.x = 60 * Math.cos(step * 0.1);
    sun.position.y = 60 * Math.sin(step * 0.1);
    
    // day and night cycle
    if(sun.position.y >-2  && sun.position.y < 5){
        sun.intensity -= 20;
        const color = Math.round(55 + 40 * sun.position.y);
        sceneElements.renderer.setClearColor(`rgb(0, ${color}, ${color})`, 1.0);
    }
    else if(sun.position.y == -2){    // nighttime
        
        sun.intensity = 0;
        sceneElements.renderer.setClearColor('rgb(0, 0, 0)', 1.0);
    }
    else if(sun.position.y>=5){   // daytime
        sun.intensity = 5000;
        sceneElements.renderer.setClearColor('rgb(0, 255, 255)', 1.0);
    }
    /*
    if(sun.position.y < 0){     // nighttime
        sun.intensity = 0;
        sceneElements.renderer.setClearColor('rgb(0, 0, 0)', 1.0);
    }
    else{   // daytime
        sun.intensity = 5000;
        sceneElements.renderer.setClearColor('rgb(0, 255, 255)', 1.0);
    }*/


    //animate the river
    riverTexture.offset.y -= 0.012;

    const cube = sceneElements.sceneGraph.getObjectByName("cube");
    
    // fall from the platform
    if (cube.position.y > 0.25 && cube.position.x < 30.2 && cube.position.x > -30.2) {   //0.25 is half of the cube height
        cube.position.y -= 0.02;  // velocidade de queda
        cube.position.y -= 0.002;  // gravidade
        sceneElements.camera.position.y -= 0.022;
        //sceneElements.control.update();
    }
    else {
        touchGround = true;
    }

    // fall from the platform
    if (cube.position.x > 30.2 || cube.position.x < -30.2 || cube.position.z > 50.2 || cube.position.z < -50.2 || cube.position.y < 0.20) {
        cube.position.y -= 0.02;  // velocidade de queda
        cube.position.y -= 0.002;  // gravidade
        sceneElements.camera.position.y -= 0.022;
        //sceneElements.control.update();

    }
    // if in the river, the cube moves slower and gets pushed back
    if (inRiver() && !inBridge()) {    // if the cube is in the river and not in the bridge
        cube.position.z += 0.03;
        dispX = 0.03;
        if (toggledCamera) {
            sceneElements.camera.position.z += 0.03;
        }
    }
    else {
        dispX = 0.05;
    }


    if (keyD && cube.position.x < 30) {
        cube.translateX(dispX);
        if (toggledCamera) {
            sceneElements.camera.position.x += dispX;
            sceneElements.camera.lookAt(cube.position);
        }


        //sceneElements.control.update();

    }
    if (keyW && cube.position.z > -50) {
        cube.translateZ(-dispZ);
        if (toggledCamera) {
            sceneElements.camera.position.z -= dispZ;
            sceneElements.camera.lookAt(cube.position);
        }
        //sceneElements.control.update();

    }
    if (keyA && cube.position.x > -30) {
        cube.translateX(-dispX);
        if (toggledCamera) {
            sceneElements.camera.position.x -= dispX;
            sceneElements.camera.lookAt(cube.position);
        }
        //sceneElements.camera.position.x -= dispX;

        //sceneElements.control.update();
        //sceneElements.camera.lookAt(cube.position);

    }
    if (keyS && cube.position.z < 50) {
        cube.translateZ(dispZ);
        if (toggledCamera) {
            sceneElements.camera.position.z += dispZ;
            sceneElements.camera.lookAt(cube.position);
        }
        //sceneElements.control.update();
    }
    for (const tree of sceneElements.trees) {
        // let the trees be pushed by the cube
        if (collision({ element1: cube, element2: tree })) {
            /*  // FIRST IDEA
            const translate = cube.position.clone().sub(tree.position).normalize().multiplyScalar(0.1)
            cube.position.add(translate)
            sceneElements.camera.position.add(translate)*/
            // SECOND IDEA
            
            if (tree.position.x > -30 && tree.position.x < 30 && tree.position.z > -50 && tree.position.z < 50) {
                const translate = cube.position.clone().sub(previousCubePosition).normalize().multiplyScalar(0.1)
                //const translate = new THREE.Vector3(dispX*keyD - dispX*keyA, 0, dispZ*keyS - dispZ*keyW)
                console.log(previousCubePosition)
                console.log(cube.position)
                console.log(translate)
                tree.position.add(translate)
            }
            

        }
        // let the river carry the trees
        if (tree.position.x > -2.5 && tree.position.x < 2.5 && ((tree.position.z > -50 && tree.position.z<-1.9) || (tree.position.z < 50 && tree.position.z > 1.9))) {
            tree.position.z += 0.03;
        }
    }

    const birds = sceneElements.sceneGraph.getObjectByName("birds");
    if (birds){     // be sure that the birds are loaded
        birds.position.x = 10 * Math.cos(step * 0.2);
        birds.position.z = 10 * Math.sin(step * 0.2);
        // make the bids start turning at the edge of the river
        //if (birds.position.z > 2.5 || birds.position.z < -2.5) {
            birds.rotation.y = Math.PI / 2 + Math.atan2(birds.position.x, birds.position.z);
        //}
        birds.position.y = 5 + 2 * Math.sin(step * 0.2);
    }

    const butterfly = sceneElements.sceneGraph.getObjectByName("butterfly");
    if(butterfly){  // be sure that the butterfly is loaded
        //butterfly.position.x = 13 + Math.cos(step * 0.5);
        //butterfly.position.z = -9 + Math.sin(step * 0.5);
        // rotate the butterfly around itself
        butterfly.rotation.y += 0.02;
    }

    /*
    if (keySpace) {
        if (touchGround) {
            if (cube.position.y < 1.5) {
                cube.position.y += 0.1;
                sceneElements.camera.position.y += 0.1;
            }
        }
        if (cube.position.y >= 1.5) {
            touchGround = false;
        }
    }*/
    mixer.update(0.7); // Pass the time delta since the last frame
    step += 0.03;

    frames++
    previousCubePosition = cube.position.clone()
    //sceneElements.camera.position.set(cube.position.x, cube.position.y + 2, cube.position.z + 5);
    // Rendering
    helper.render(sceneElements);
    //sceneElements.control.update();
    //console.log(sceneElements.camera.position)
    // Animation
    //Call for the next frame
    requestAnimationFrame(computeFrame);
}

// Call functions:
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate

function init() {
    helper.initEmptyScene(sceneElements);
    scene.load3DObjects(sceneElements.sceneGraph);
    requestAnimationFrame(computeFrame);
}

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);

    // Comment when doing animation
    // computeFrame(sceneElements);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
        case 81:    //q
            keyQ = true;
            toggledCamera = !toggledCamera;
            if (toggledCamera) {
                console.log("here")
                const cubePos = sceneElements.sceneGraph.getObjectByName("cube").position;
                sceneElements.camera.position.set(cubePos.x + 3, cubePos.y + 2, cubePos.z + 5);
                sceneElements.camera.lookAt(cubePos);
                //erase orbitcontrols
                sceneElements.control.dispose();

            }
            else {

                sceneElements.camera.position.set(10, 8, 16);
                sceneElements.camera.lookAt(0, 0, 0);
                sceneElements.control = new OrbitControls(sceneElements.camera, sceneElements.renderer.domElement);
                sceneElements.control.screenSpacePanning = true;

            }

            break;
        
        /*
        case 32: //space
            keySpace = true;
            break;*/


    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
        case 81:    //q
            keyQ = false;
            break;
        /*
        case 32: //space
            keySpace = false;
            touchGround = false;    // não permitir double jump só por não chegar á altura máxima
            break;*/
    }
}


// STARTING

init();
