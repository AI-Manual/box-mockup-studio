import * as THREE from "three";
import { getBox } from "./box.js";

const textures = {
    front: null,
    back: null,
    left: null,
    right: null,
    top: null,
    bottom: null
};

export function setFaceTexture(face, texture) {

    if (!textures.hasOwnProperty(face)) {
        console.warn("Unknown face:", face);
        return;
    }

    textures[face] = texture;

    updateBoxTexture();

}

export function getFaceTexture(face) {

    return textures[face];

}

export function clearTextures() {

    Object.keys(textures).forEach(key => {

        textures[key] = null;

    });

    updateBoxTexture();

}

function createMaterial(texture, face) {

    if (texture) {

        texture.center.set(0.5, 0.5);

        texture.flipY = false;

        switch (face) {

            case "front":
                texture.rotation = 0;
                break;

            case "back":
                texture.rotation = Math.PI;
                break;

            case "left":
                texture.rotation = Math.PI / 2;
                break;

            case "right":
                texture.rotation = -Math.PI / 2;
                break;

            case "top":
                texture.rotation = 0;
                break;

            case "bottom":
                texture.rotation = Math.PI;
                break;

        }

        texture.needsUpdate = true;

        return new THREE.MeshStandardMaterial({

            map: texture,
            roughness: 0.95,
            metalness: 0

        });

    }

    return new THREE.MeshStandardMaterial({

        color: 0xffffff,
        roughness: 0.95,
        metalness: 0

    });

}
function updateBoxTexture() {

    const box = getBox();

    if (!box) return;

    // 以前のマテリアルを破棄
    if (Array.isArray(box.material)) {

        box.material.forEach(m => m.dispose());

    } else if (box.material) {

        box.material.dispose();

    }

    // Three.js BoxGeometry の面順
    box.material = [

        createMaterial(textures.right),   // +X
        createMaterial(textures.left),    // -X
        createMaterial(textures.top),     // +Y
        createMaterial(textures.bottom),  // -Y
        createMaterial(textures.front),   // +Z
        createMaterial(textures.back)     // -Z

    ];

}
