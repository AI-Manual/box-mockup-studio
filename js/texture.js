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

export function cropTexture(rect, face = "front") {

    if (!sourceImage) return null;

    const sizes = {

        front:  { w: 1024, h: 1024 },
        back:   { w: 1024, h: 1024 },
        left:   { w: 1024, h: 1024 },
        right:  { w: 1024, h: 1024 },
        top:    { w: 1024, h: 1024 },
        bottom: { w: 1024, h: 1024 }

    };

    const size = sizes[face];

    const canvas = document.createElement("canvas");

    canvas.width = size.w;
    canvas.height = size.h;

    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(

        sourceImage,

        rect.x,
        rect.y,
        rect.width,
        rect.height,

        0,
        0,
        size.w,
        size.h

    );

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    texture.needsUpdate = true;

    return texture;

}
