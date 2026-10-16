import { 
    initScene,
    updateBoxSize
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
    createBox
} from "./js/box.js";



let sourceTexture = null;



window.addEventListener(
"DOMContentLoaded",
()=>{


    initScene();



    initSelector(
        "selectorCanvas",
        (face, rect)=>{

            console.log(
                face,
                rect
            );

        }
    );





    document
    .getElementById("faceSelect")
    .addEventListener(
        "change",
        e=>{


            selectFace(
                e.target.value
            );


        }
    );






    document
    .getElementById("imageInput")
    .addEventListener(
    "change",
    async e=>{


        const file =
            e.target.files[0];


        if(!file)
            return;



        const img =
            await loadTexture(file);



        setImage(img);



    });






    document
    .getElementById("createBox")
    .addEventListener(
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



});
