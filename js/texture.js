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



        reader.onerror =
            reject;



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



    if(
        !rect ||
        rect.width <= 0 ||
        rect.height <= 0
    ){

        console.warn(
            "Invalid crop rect",
            rect
        );

        return null;

    }






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







    // 元画像から選択範囲をコピー

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





    // CanvasとThree.js UV方向補正

    texture.flipY =
        true;





    // 左右反転補正

    texture.wrapS =
        THREE.RepeatWrapping;


    

    texture.needsUpdate =
        true;




    console.log(
        "cropTexture created",
        rect
    );



    return texture;


}
