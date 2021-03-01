import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

camera.lookAt( 0, 0, 0);
renderer.setPixelRatio( window.devicePixelRatio );
camera.position.set(0,1,50)

//Initialization of objects
var Man, Wolf, Bird, Map
var ManAnimations, WolfAnimations, BirdAnimations
var currentModel

var loader = new GLTFLoader()
loader.setPath('../models')
//load wolves
loader.load('wolf_with_animations/scene.gltf',function(object){
    Wolf = object.scene
    WolfAnimations = object.animations
    currentModel = object.scene
    console.log(currentModel)
    scene.add(currentModel)
})

/*
//load main character
loader.load('character1.glb',function(object){
    Man = object.scene
    ManAnimations = object.animations
    currentModel = object.scene
    console.log(currentModel)
    scene.add(currentModel)
})

//load bird
loader.load('phoenix_bird/source.gltf',function(object){
    Bird = object.scene
    BirdAnimations = object.animations
    currentModel = object.scene
    console.log(currentModel)
    scene.add(currentModel)
})

//load map
loader.load('voxel_free_map/source.gltf',function(object){
    Map = object.scene
    currentModel = object.scene
    console.log(currentModel)
    scene.add(currentModel)
})
*/

var mixer;

const animate = function () {
    requestAnimationFrame( animate );
    if(mixer){
        mixer.update()        
    }
    controls.update();
    renderer.render( scene, camera );
};

const findAnimation = (object, name)=>(!!object.animations)?
                object.animations.find((animation)=>animation.name===name)
                :undefined

animate();