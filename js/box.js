import * as THREE from "three";

let boxMesh = null;

export function createBox(scene, width, height, depth) {

    // 古い箱を削除
    if (boxMesh) {

        scene.remove(boxMesh);

        boxMesh.geometry.dispose();

        if (Array.isArray(boxMesh.material)) {

            boxMesh.material.forEach(m => m.dispose());

        } else {

            boxMesh.material.dispose();

        }

        boxMesh = null;

    }

    const w = Number(width);
    const h = Number(height);
    const d = Number(depth);

    const geometry = new THREE.BoxGeometry(
        w,
        h,
        d
    );

    const material = new THREE.MeshStandardMaterial({

        color: 0xffffff,
        roughness: 0.95,
        metalness: 0

    });

    boxMesh = new THREE.Mesh(
        geometry,
        material
    );

    boxMesh.position.y = h / 2;

    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;

    scene.add(boxMesh);

    return boxMesh;

}

export function getBox() {

    return boxMesh;

}
