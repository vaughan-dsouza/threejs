import './style.css'

import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  // canvas: document.getElementById('bg'),
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setY(10).setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10,3,50,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 800);
pointLight.position.set(10,10,10);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

scene.add(pointLight, ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 100, 100);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background =  spaceTexture;

//avatar
const personTexture = new THREE.TextureLoader().load('person.jpg');
const person = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: personTexture })
);

//moon 
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 100, 100), 
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// moon.position.set(-10,0,30);
moon.position.z= 15;
moon.position.setX(-10);
scene.add(person, moon);

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  moon.rotation .x += 0.05;
  moon.rotation .z += 0.075;
  moon.rotation .x += 0.05;

  person.rotation .y += 0.01;
  person.rotation .z += 0.01;

  camera.position.x = t * -0.01;
  camera.position.y = t * -0.002;
  camera.position.z = t * -0.0002;

}

document.body.onscroll = moveCamera;
// console.log(scene)

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();