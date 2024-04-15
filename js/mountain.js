import * as THREE from "three";

function createMountain() {
    const coneGeometry = new THREE.ConeGeometry(10, 30, 32);
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(139,69,19)' });
    const coneObject = new THREE.Mesh(coneGeometry, coneMaterial);
    return coneObject;
}

function addMountains() {
    const mountain = createMountain()
    mountain.position.set(0, 0, -50)
    mountain.receiveShadow = true
    sceneGraph.add(mountain)
}


export default addMountains;