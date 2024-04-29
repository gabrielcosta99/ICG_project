import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import HouseMod from "./js/house-r0.js";
import "./js/mountain.js";

import helper from "./helper.js";
import { createTree, createRiver, createRoad, createBridge, createMountain, riverTexture } from "./createFunctions.js";

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
        // Add another platform
        // ************************** //
        /*
        const platform = new THREE.BoxGeometry(60, 100, 2);
        const platformMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });

        //const platformMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,255,0)', side: THREE.DoubleSide });
        const platformObject = new THREE.Mesh(platform, platformMaterial);
        //platformObject.position.set(0, 59, 0);
        platformObject.position.set(60, -1, 0);
        platformObject.rotation.x = Math.PI / 2;
        sceneGraph.add(platformObject);
        // Set shadow property
        platformObject.receiveShadow = true;
        */
        

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

    },    
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
    const cubeRight = cube.position.x + 0.5 / 2
    const cubeLeft = cube.position.x - 0.5 / 2

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
    return zCollision && cube.position.x>=-2.8 && cube.position.x<=2.8
}

function makeAllElementsInvisible() {
    sceneGraph.traverse(function (object) {
        if (object instanceof THREE.Mesh) {
            object.visible = false;
        }
    });
}







// ANIMATION

// Displacement values
var dispX = 0.05, dispZ = 0.05;
var touchGround = false;

// To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false, keyQ = false, keySpace = false;
var toggledCamera = false;
var step = 0;

let frames = 0
let previousCubePosition = new THREE.Vector3()
function computeFrame(time) {

    /*
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
    // next platform teleport
    /*
    if (cube.position.x > 30.2) {
        sceneElements.sceneGraph.remove.apply(sceneElements.sceneGraph, sceneElements.sceneGraph.children);
        scene.loadObjects(sceneElements.sceneGraph);

        // the cube has been updated, so we need to get it again
        const cube = sceneElements.sceneGraph.getObjectByName("cube");
        if(toggledCamera){
            const cubePos = cube.position;
            sceneElements.camera.position.set(cubePos.x + 3, cubePos.y + 2, cubePos.z + 5);
            sceneElements.camera.lookAt(cubePos);
            
        }
        //sceneElements.camera.position.set(cubePos.x + 3, cubePos.y + 2, cubePos.z + 5);
        //sceneElements.camera.lookAt(cube.position);
    }*/


    // fall from the platform
    /*
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

    }*/
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




    if (inBridge() && (cube.position.z <-1.2 || cube.position.z>1.5))     // if the cube is in the bridge
        keyW = false
    if (keyW && cube.position.z > -50 ) {
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
    if(inBridge() && (cube.position.z >1.2 || cube.position.z<-1.5))
        keyS = false
    if (keyS && cube.position.z < 50 ) {
        cube.translateZ(dispZ);
        if (toggledCamera) {
            sceneElements.camera.position.z += dispZ;
            sceneElements.camera.lookAt(cube.position);
        }
        //sceneElements.control.update();
    }
    if (keyD && cube.position.x < 90) {
        cube.translateX(dispX);
        if (toggledCamera) {
            sceneElements.camera.position.x += dispX;
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


    // animate the birds
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
// REMOVE ALL ELEMENTS
// sceneElements.sceneGraph.remove.apply(sceneElements.sceneGraph, sceneElements.sceneGraph.children);

/* 
// delete road (for example)
const road = sceneElements.sceneGraph.getObjectByName("road");
road.visible = false;

//OR 

sceneElements.sceneGraph.remove(road);
*/