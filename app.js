import { initScene, updateBoxSize } from "./js/scene.js";
import { loadTexture, cropTexture } from "./js/texture.js";
import { initSelector, setImage } from "./js/selector.js";
import { setFaceTexture } from "./js/uv.js";

window.addEventListener("DOMContentLoaded", () => {

    initScene();

    initSelector("selectorCanvas", (rect) => {

        const tex = cropTexture(rect);

        setFaceTexture("front", tex);

    });

    document
        .getElementById("createBox")
        .addEventListener("click", () => {

            const w = document.getElementById("width").value;
            const h = document.getElementById("height").value;
            const d = document.getElementById("depth").value;

            updateBoxSize(w, h, d);

        });

    document
        .getElementById("imageInput")
        .addEventListener("change", async (e) => {

            const file = e.target.files[0];

            if (!file) return;

            const img = await loadTexture(file);

            setImage(img);

        });

});
