import * as THREE from "three";

let sourceImage = null;

export async function loadTexture(file){

    return new Promise((resolve,reject)=>{

        const reader = new FileReader();

        reader.onload = e=>{

            const img = new Image();

            img.onload=()=>{

                sourceImage = img;

                resolve(img);

            };

            img.src = e.target.result;

        };

        reader.onerror=reject;

        reader.readAsDataURL(file);

    });

}

export function getImage(){

    return sourceImage;

}

export function cropTexture(rect){

    if(!sourceImage) return null;

    const canvas=document.createElement("canvas");

    canvas.width=rect.width;

    canvas.height=rect.height;

    const ctx=canvas.getContext("2d");

    ctx.drawImage(

        sourceImage,

        rect.x,

        rect.y,

        rect.width,

        rect.height,

        0,

        0,

        rect.width,

        rect.height

    );

    const tex=new THREE.CanvasTexture(canvas);

    tex.colorSpace=THREE.SRGBColorSpace;

    tex.needsUpdate=true;

    return tex;

}
