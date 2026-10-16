import { initScene, updateBoxSize } from "./js/scene.js";

window.addEventListener("DOMContentLoaded",()=>{

    initScene();

    document
        .getElementById("createBox")
        .addEventListener("click",()=>{

            const w =
                document.getElementById("width").value;

            const h =
                document.getElementById("height").value;

            const d =
                document.getElementById("depth").value;

            updateBoxSize(w,h,d);

        });

});

import { loadTexture } from "./js/texture.js";

document
.getElementById("imageInput")
.addEventListener("change",async(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    await loadTexture(file);

    alert("画像を読み込みました");

});

import { getImage, loadTexture } from "./js/texture.js";
import { initSelector, setImage } from "./js/selector.js";

initSelector("selectorCanvas",(rect)=>{

    console.log(rect);

});

document
.getElementById("imageInput")
.addEventListener("change",async(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    const img=await loadTexture(file);

    setImage(img);

});
