import * as THREE from "three";


let sourceImage = null;



// =======================================
// 画像読込
// =======================================

export async function loadTexture(file){


    return new Promise((resolve,reject)=>{


        const reader =
            new FileReader();



        reader.onload = e=>{


            const img =
                new Image();



            img.onload = ()=>{


                sourceImage = img;


                resolve(img);


            };



            img.src =
                e.target.result;


        };



        reader.onerror = reject;


        reader.readAsDataURL(file);


    });


}






// =======================================
// 元画像取得
// =======================================

export function getImage(){

    return sourceImage;

}







// =======================================
// 選択範囲をTexture化
// =======================================

export function cropTexture(
    rect
){


    if(!sourceImage)
        return null;



    const canvas =
        document.createElement(
            "canvas"
        );



    const size = 1024;


    canvas.width =
        size;


    canvas.height =
        size;





    const ctx =
        canvas.getContext(
            "2d"
        );



    ctx.imageSmoothingEnabled =
        true;


    ctx.imageSmoothingQuality =
        "high";






    ctx.drawImage(

        sourceImage,

        rect.x,
        rect.y,

        rect.width,
        rect.height,


        0,
        0,

        size,
        size

    );





    const texture =
        new THREE.CanvasTexture(
            canvas
        );



    texture.colorSpace =
        THREE.SRGBColorSpace;



    texture.flipY =
        false;



    texture.needsUpdate =
        true;



    return texture;


}
