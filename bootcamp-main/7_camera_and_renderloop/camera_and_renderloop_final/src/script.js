import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
// const verticesOfCube = [
// 	- 1, - 1, - 1, 1, - 1, - 1, 1, 1, - 1, - 1, 1, - 1,
// 	- 1, - 1, 1, 1, - 1, 1, 1, 1, 1, - 1, 1, 1,
// ];
// const indicesOfFaces = [
// 	2, 1, 0, 0, 3, 2,
// 	0, 4, 7, 7, 3, 0,
// 	0, 1, 5, 5, 4, 0,
// 	1, 2, 6, 6, 5, 1,
// 	2, 3, 7, 7, 6, 2,
// 	4, 5, 6, 6, 7, 4,
// ];
// const radius = 7;  

// const detail = 2; 
// const cubeGeometry = new THREE.PolyhedronGeometry(
// 	verticesOfCube, indicesOfFaces, radius, detail );
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const cubeGeometry = new THREE.SphereGeometry(1, 16, 16, 8, 8, 8);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" , wireframe: true });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = 0;
scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  200
);

camera.position.z = 10;
camera.position.y = 2;
console.log(cubeMesh.position.distanceTo(camera.position))

// initialize the renderer;
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = false;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// animate the scene initialize clock 
const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
  // cubeMesh.rotateY += THREE.MathUtils.degToRad(1);
  // const currrentTime = clock.getElapsedTime()
  // const delta = currrentTime - previousTime;
  // previousTime = currrentTime;
  
  // Math.sin(currrentTime)
  // cubeMesh.scale.x = Math.sin(currrentTime)*2 + 2;

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 120;
  // controls.update(); 
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
