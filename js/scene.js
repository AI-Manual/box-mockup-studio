import { createBox } from "./box.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene;
let camera;
let renderer;
let controls;

export function initScene(){

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xf5f5f5);

    const viewer = document.getElementById("viewer");

    camera = new THREE.PerspectiveCamera(

        45,

        viewer.clientWidth / viewer.clientHeight,

        1,

        10000

    );

    camera.position.set(500,350,500);

    renderer = new THREE.WebGLRenderer({

        antialias:true,

        preserveDrawingBuffer:true

    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(

        viewer.clientWidth,

        viewer.clientHeight

    );

    viewer.appendChild(renderer.domElement);

    controls = new OrbitControls(

        camera,

        renderer.domElement

    );

    controls.enableDamping = true;

    createLights();

    createGrid();

    createBox(

    scene,

    250,

    180,

    120

);

    window.addEventListener(

        "resize",

        resize

    );

    animate();

}

function createLights(){

    const light1 = new THREE.DirectionalLight(

        0xffffff,

        2

    );

    light1.position.set(

        500,

        500,

        500

    );

    scene.add(light1);

    const light2 = new THREE.AmbientLight(

        0xffffff,

        1.2

    );

    scene.add(light2);

}

function createGrid(){

    const grid = new THREE.GridHelper(

        2000,

        40,

        0x999999,

        0xcccccc

    );

    scene.add(grid);

}

function createBox(){

    const geometry = new THREE.BoxGeometry(

        250,

        180,

        120

    );

    const material = new THREE.MeshStandardMaterial({

        color:0xffffff

    });

    const mesh = new THREE.Mesh(

        geometry,

        material

    );

    mesh.position.y = 90;

    scene.add(mesh);

}

function resize(){

    const viewer = document.getElementById("viewer");

    camera.aspect =

        viewer.clientWidth /

        viewer.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        viewer.clientWidth,

        viewer.clientHeight

    );

}

function animate(){

    requestAnimationFrame(

        animate

    );

    controls.update();

    renderer.render(

        scene,

        camera

    );

}

