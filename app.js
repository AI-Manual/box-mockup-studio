import * as THREE from "three";


import {
    initScene,
    updateBoxSize,
    setBoxTexture
} from "./js/scene.js";


import {
    loadTexture
} from "./js/texture.js";


import {
    initSelector,
    setImage,
    selectFace
} from "./js/selector.js";


import {
    setFaceUV
} from "./js/uv.js";



let sourceImage = null;



window.addEventListener(
"DOMContentLoaded",
()=>{


    // =====================
    // 3D初期化
    // =====================

    initScene();




    // =====================
    // 展開図選択初期化
    // =====================

    initSelector(

        "selectorCanvas",


        (face, rect)=>{


            console.log(
                "selected",
                face,
                rect
            );



            if(!sourceImage)
                return;



            /*
            
            Canvas座標
            ↓
            UV座標へ変換
            
            Three.js UV
            0〜1
            
            */


            const area = {


                u1:
                    rect.x /
                    sourceImage.width,


                v1:
                    rect.y /
                    sourceImage.height,


                u2:
                    (rect.x + rect.width) /
                    sourceImage.width,


                v2:
                    (rect.y + rect.height) /
                    sourceImage.height


            };



            setFaceUV(
                face,
                area
            );

            console.log(
                "UV変更",
                face,
                area
            );

            console.log(
                "UV updated",
                face,
                area
            );



            // サイズ再取得して反映

            const w =
                Number(
                document
                .getElementById("width")
                .value
                );


            const h =
                Number(
                document
                .getElementById("height")
                .value
                );


            const d =
                Number(
                document
                .getElementById("depth")
                .value
                );


            updateBoxSize(
                w,
                h,
                d
            );


        }

    );







    // =====================
    // 面切替
    // =====================

    const faceSelect =
        document.getElementById(
            "faceSelect"
        );


    if(faceSelect){


        faceSelect.addEventListener(
            "change",
            e=>{


                selectFace(
                    e.target.value
                );


            }
        );


    }








    // =====================
    // 画像読込
    // =====================

    const imageInput =
        document.getElementById(
            "imageInput"
        );



    if(imageInput){


        imageInput.addEventListener(
        "change",
        async(e)=>{


            const file =
                e.target.files[0];



            if(!file)
                return;




            const img =
                await loadTexture(file);



            sourceImage = img;



            // 選択画面表示

            setImage(img);






            // 3D Texture作成


            const texture =
                new THREE.Texture(img);



            texture.flipY = false;


            texture.colorSpace =
                THREE.SRGBColorSpace;



            texture.needsUpdate = true;



            setBoxTexture(
                texture
            );



        });


    }







    // =====================
    // 箱生成
    // =====================

    const createButton =
        document.getElementById(
            "createBox"
        );



    if(createButton){


        createButton.addEventListener(
        "click",
        ()=>{


            const w =
                Number(
                document
                .getElementById("width")
                .value
                );



            const h =
                Number(
                document
                .getElementById("height")
                .value
                );



            const d =
                Number(
                document
                .getElementById("depth")
                .value
                );



            updateBoxSize(
                w,
                h,
                d
            );


        });


    }



});
