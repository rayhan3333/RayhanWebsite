import './style.css'
import * as THREE from 'three';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Clock } from "three";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
const scene = new THREE.Scene();
var lastScrollTop = 0;
let direction = false;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let sinheight = 0;
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const state = {
  clock: new THREE.Clock(),
  frame: 0,
  maxFrame: 90,
  fps: 30,
  per: 0
};

state.clock.start();

class boost{
  constructor(rocket) {

    this.boostclock = {
      clock: new THREE.Clock(),
      frame: 0,
      maxFrame: 90,
      fps: 30,
      per: 0
    };
    this.boostclock.clock.start();
  const geometry = new THREE.SphereGeometry(0.4, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xff9d5c});
  this.obj = new THREE.Mesh(geometry, material);
  this.obj.position.set(5, -0.2, 25)
  scene.add(this.obj);
  this.randx=0
  this.randz=0
 
  this.totalsecs = 0
  this.scalenum = 0
  }
  boostanim() {
    this.totalsecs = this.boostclock.clock.getElapsedTime()
    if (rocket) this.obj.position.set(rocket.position.x+this.randx, rocket.position.y-0.6+(-0.8*this.totalsecs), rocket.position.z+this.randz)
    this.scalenum=1-this.totalsecs*0.5
    
    if (this.scalenum<0) {
      this.boostclock.clock.stop()
      this.boostclock.clock.start()
      this.randx=Math.random()*0.4-0.2
      this.randz=Math.random()*0.4-0.2
      if (rocket) this.obj.position.set(rocket.position.x+this.randx, rocket.position.y-0.6, rocket.position.z+this.randz)
      this.scalenum=1
      this.obj.scale.set(this.scalenum, this.scalenum, this.scalenum);
    }
    this.obj.scale.set(this.scalenum, this.scalenum, this.scalenum)
  }
}
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(8,5,30)

const ambientLight = new THREE.AmbientLight(0xffffff)


//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200,50);
//scene.add(lightHelper, gridHelper)
scene.add(pointLight, ambientLight)

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('greyspace.png');
scene.background = spaceTexture;

const rayhanTexture = new THREE.TextureLoader().load('redme.jpg');

const rayhan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: rayhanTexture})
)
//scene.add(rayhan);
const moonTexture = new THREE.TextureLoader().load('bluesun.jpg')
const normalTexture = new THREE.TextureLoader().load('sunnormal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
)
//scene.add(moon);

moon.position.z=30;
moon.position.setX(-10);

/*
function loadModel(url) {
  return new Promise (resolve => {
    new THREE.GLTFLoader().load(url, resolve);
  });
}

let model1, model2;
let p1 = loadModel('rocket.glb').then(result => {model1=result.scene;});
let p2 = loadModel('earthstyle.glb').then(result => {model2=result.scene;});

Promise.all([p1, p2]).then(() => {
  scene.add(model1);
  scene.add(model2);


});*/
/*
var loader = new THREE.GLTFLoader();
      var rocket, mesh2;

      // load first .glb file
      loader.load('rocket.glb', function (gltf) {
        rocket = gltf.scene.children[0];
        rocket.position.set(-2, 0, 0);
        scene.add(rocket);
      });*/
/*
      // load second .glb file
      loader.load('earthstyle.glb', function (gltf) {
        mesh2 = gltf.scene.children[0];
        mesh2.position.set(2, 0, 0);
        scene.add(mesh2);
      });*/
const loader = new GLTFLoader();
const loader2 = new GLTFLoader();
const loader3 = new GLTFLoader();
const loader4 = new GLTFLoader();
var rocket;
var earth;
var saturn;
var explode;

loader.load( 'rocket.glb', function ( gltf ) {
  rocket = gltf.scene;
	scene.add( rocket );
  gltf.scene.scale.set(2, 2, 2);
  rocket.position.setZ(25);
  rocket.position.setX(5);

});
loader2.load( 'earthstyle.glb', function ( gltf2 ) {
  earth = gltf2.scene;
	scene.add( earth );
  earth.scale.set(50, 50, 50);
  earth.position.setZ(20);
  earth.position.setX(0);
  earth.position.setY(-42);

});
loader3.load( 'Stylized_Planets.glb', function ( gltf3 ) {
  saturn = gltf3.scene;
	scene.add( saturn );
  saturn.scale.set(2, 2, 2);
  saturn.position.setZ(20);
  saturn.position.setX(5);
  saturn.position.setY(30);

});
loader3.load( 'planet.glb', function ( gltf4 ) {
  explode = gltf4.scene;
	scene.add( explode );
  explode.scale.set(0.3, 0.3, 0.3);
  explode.position.setZ(-10);
  explode.position.setX(-30);
  explode.position.setY(100);

});
/*var explode = undefined;
var mtlLoader = new MTLLoader();
mtlLoader.load("explode.mtl", function(materials)
{
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("explode.obj", function(object)
    {    
        explode = object;
        scene.add( explode );
        explode.scale.set(8, 8, 8);
    });
});*/
/*
new THREE.GLTFLoader().load('rocket.glb', result => { 
  rocket=result.scene;
  scene.add( rocket );
  //rocket.scale.set(2, 2, 2);
  //rocket.position.setZ(25);
  //rocket.position.setX(5);
//load another model
new THREE.GLTFLoader().load('earthstyle.glb', result => {
  earth = result.scene;
	scene.add( earth );
  //earth.scale.set(1, 1, 1);
  //earth.position.setZ(25);
  //earth.position.setX(5);

    // continue processing
    
    });
});


*/

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  /*
  window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      if (rocket && rocket.position.y >=20 && rocket.position.y <= 40) {
        rocket.position.x-=0.02
      }
    } else if (st < lastScrollTop) {
      if (rocket && rocket.position.y >=20 && rocket.position.y <= 40) {
        rocket.position.x+=0.02
      }
    } // else was horizontal scroll
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
 }, false);*/
  moon.rotation.x+=0.05;
  moon.rotation.y+=0.075;
  moon.rotation.z+=0.05;

  rayhan.rotation.y+=0.01;
  rayhan.rotation.z+=0.01;

  //camera.position.z=t*-0.01;
  //camera.position.x=t*-0.0002;
  camera.position.y=t*-0.02;
  //if (rocket) rocket.position.y=t*-0.02+sinheight; //+0.01(Math.random()-0.5)
  if (rocket) rocket.rotation.z=0.1*Math.sin(t/400);
  if (rocket) rocket.rotation.y+=0.03;
  
}
/*
var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    console.log('UP');
    if (rocket && rocket.position.y >=10 && rocket.position.y <= 40) {
      rocket.position.x+=0.4}
    
  } else {
    console.log('Down');
    if (rocket && rocket.position.y >=10 && rocket.position.y <= 40) {
      rocket.position.x-=0.4}
    
  }
}*/

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}
document.body.onscroll = moveCamera;
moveCamera();

function oscillate() {
  let totalSecs = state.clock.getElapsedTime();
  sinheight=0.5*Math.sin(totalSecs/2);
}
const boost1 = new boost(rocket)
const boost2 = new boost(rocket)
sleep(200)
const boost3 = new boost(rocket)
const boost4 = new boost(rocket)
sleep(200)
const boost5 = new boost(rocket)
const boost6 = new boost(rocket)
sleep(200)
const boost7 = new boost(rocket)
const boost8 = new boost(rocket)
sleep(200)
const boost9 = new boost(rocket)
const boost10 = new boost(rocket)
sleep(200)
const boost11 = new boost(rocket)
const boost12 = new boost(rocket)
sleep(200)
const boost13 = new boost(rocket)
const boost14 = new boost(rocket)
sleep(200)
const boost15 = new boost(rocket)
const boost16 = new boost(rocket)
sleep(200)
const boost17 = new boost(rocket)
const boost18 = new boost(rocket)
sleep(200)
const boost19 = new boost(rocket)
const boost20 = new boost(rocket)

function animate() {
  requestAnimationFrame(animate);
  //torus.rotation.x+=0.01;
  //torus.rotation.y+=0.005;
  //torus.rotation.z+=0.01;
  if (rocket) rocket.rotation.y+=0.01;
  oscillate();
  if (rocket) rocket.position.y +=0.008;

  if (rocket && rocket.position.y >=5) {
    rocket.position.y+=0.006}
  if (rocket && rocket.position.y >=25 && rocket.position.y <= 35) {
    rocket.position.x-=0.007
  }
  if (rocket && rocket.position.y >=45 && rocket.position.y <= 65) {
    rocket.position.x+=0.0035
  }

  if (earth) earth.rotation.y+=0.002
  if (earth) earth.rotation.z+=0.0005
  if (saturn) saturn.rotation.y+=0.003
  if(explode) explode.rotation.y+=0.005
  if (explode) explode.rotation.x+=0.00002
  boost1.boostanim()
  boost2.boostanim()
  boost3.boostanim()
  boost4.boostanim()
  boost5.boostanim()
  boost6.boostanim()
  boost7.boostanim()
  boost8.boostanim()
  boost9.boostanim()
  boost10.boostanim()
  boost11.boostanim()
  boost12.boostanim()
  boost13.boostanim()
  boost14.boostanim()
  boost15.boostanim()
  boost16.boostanim()
  boost17.boostanim()
  boost18.boostanim()
  boost19.boostanim()
  boost20.boostanim()
 
  
  //if (rocket) rocket.position.y=rocket.position.y+0.1*Math.sin(t/2000);
  //controls.update();
  
  renderer.render(scene, camera);
  
}

animate()