import * as THREE from "three";
import { getBox } from "./box.js";

const textures = {

    front:null,
    back:null,
    left:null,
    right:null,
    top:null,
    bottom:null

};

export function clearTextures(){

    textures.front=null;
    textures.back=null;
    textures.left=null;
    textures.right=null;
    textures.top=null;
    textures.bottom=null;

    updateBoxTexture();

}

export function setFaceTexture(face,texture){

    textures[face]=texture;

    updateBoxTexture();

}

export function getFaceTexture(face){

    return textures[face];

}

function updateBoxTexture(){

    const box=getBox();

    if(!box) return;

    const materials=[

        createMaterial(textures.right),   // +X
        createMaterial(textures.left),    // -X
        createMaterial(textures.top),     // +Y
        createMaterial(textures.bottom),  // -Y
        createMaterial(textures.front),   // +Z
        createMaterial(textures.back)     // -Z

    ];

    box.material.dispose();

    box.material=materials;

}

function createMaterial(texture){

    if(texture){

        texture.needsUpdate=true;

        return new THREE.MeshStandardMaterial({

            map:texture,

            roughness:0.95,

            metalness:0

        });

    }

    return new THREE.MeshStandardMaterial({

        color:0xffffff,

        roughness:0.95,

        metalness:0

    });

}
