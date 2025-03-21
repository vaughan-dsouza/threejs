import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" , wireframe: true });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.x = -2;
const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh1.position.x = 2;
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x =-2;
// cubeMesh.scale.x = 2;
// cubeMesh.scale.set(2,2,1);
// scene.add(cubeMesh);
const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh1);
group.add(cubeMesh2);
group.scale.y =2;
scene.add(group);

console.log(window.devicePixelRatio);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  200
);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );

camera.position.z = 10;
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
controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// render the scene
const renderloop = () => {
  controls.update(); 
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
