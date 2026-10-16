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

    createBox();

    window.addEventListener(

        "resize",

        resize

    );

    animate();

}
