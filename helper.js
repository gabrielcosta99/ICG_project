import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
        const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        sceneElements.camera = camera;

        camera.position.set(10, 15, 23);
        sceneElements.camera.lookAt(0,0,0);
        

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add point light souce (sun) with shadows
        // ***************************** //

        const sun = new THREE.PointLight('rgb(255, 255, 255)', 30000);
        sun.position.set(150, 150, 0);
        sun.shadow.mapSize.width = 4000;
        sun.shadow.mapSize.height = 4000;
        sun.castShadow = true;
        sun.name = "sun";
        sceneElements.sceneGraph.add(sun);

        // REMOVE THIS
        /*
        const light = new THREE.PointLight('rgb(255, 255, 255)', 5000);
        light.position.set(0, 50, 0);
        light.shadow.mapSize.width = 4000;
        light.shadow.mapSize.height = 4000;
        light.castShadow = true;
        light.name = "light";
        sceneElements.sceneGraph.add(light);*/
        // //////////////////////////////////////////////////////////////////

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
        sceneElements.control = new OrbitControls(sceneElements.camera, renderer.domElement);
        sceneElements.control.screenSpacePanning = true;
    },

    render: function (sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};

export default helper;


