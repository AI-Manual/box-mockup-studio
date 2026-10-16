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
