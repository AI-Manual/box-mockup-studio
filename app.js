import { initScene, updateBoxSize } from "./js/scene.js";
import { loadTexture, cropTexture } from "./js/texture.js";
import { initSelector, setImage } from "./js/selector.js";
import { setFaceTexture, clearTextures } from "./js/uv.js";

window.addEventListener("DOMContentLoaded", () => {

    initScene();

    initSelector("selectorCanvas", (rect) => {

    const face = document
        .getElementById("faceSelect")
        .value;

    const tex = cropTexture(rect, face);

    setFaceTexture(face, tex);

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

            clearTextures();

            const img = await loadTexture(file);

            setImage(img);

        });

});
