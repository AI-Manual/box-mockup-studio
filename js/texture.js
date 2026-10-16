import * as THREE from "three";


let sourceImage = null;



export async function loadTexture(file){


    return new Promise((resolve,reject)=>{


        const reader = new FileReader();


        reader.onload = e=>{


            const img = new Image();


            img.onload = ()=>{


                sourceImage = img;

                resolve(img);


            };


            img.src = e.target.result;


        };


        reader.onerror = reject;


        reader.readAsDataURL(file);


    });


}



export function getImage(){

    return sourceImage;

}




export function cropTexture(
    rect,
    face,
    boxSize
){


    if(!sourceImage)
        return null;



    const scale = 4;



    let w;
    let h;



    switch(face){


        case "front":
        case "back":

            w = boxSize.width;

            h = boxSize.height;

            break;



        case "left":
        case "right":

            w = boxSize.depth;

            h = boxSize.height;

            break;



        case "top":
        case "bottom":

            w = boxSize.width;

            h = boxSize.depth;

            break;


    }



    const canvas =
        document.createElement("canvas");



    canvas.width =
        w * scale;


    canvas.height =
        h * scale;



    const ctx =
        canvas.getContext("2d");



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

        canvas.width,
        canvas.height

    );



    const texture =
        new THREE.CanvasTexture(canvas);



    texture.colorSpace =
        THREE.SRGBColorSpace;



    texture.needsUpdate = true;



    return texture;


}
