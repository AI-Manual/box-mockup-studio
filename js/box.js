import * as THREE from "three";
import { applyBoxUV } from "./uv.js";


let boxMesh = null;



export function createBox(
    scene,
    width,
    height,
    depth,
    texture = null
){

    // 既存BOX削除

    if(boxMesh){

        scene.remove(boxMesh);


        boxMesh.geometry.dispose();


        if(Array.isArray(boxMesh.material)){

            boxMesh.material.forEach(
                m=>m.dispose()
            );

        }else{

            boxMesh.material.dispose();

        }


        boxMesh = null;

    }





    const w = Number(width);
    const h = Number(height);
    const d = Number(depth);





    let geometry =
        new THREE.BoxGeometry(
            w,
            h,
            d
        );



    // UV制御用に非Indexed化

    geometry =
        geometry.toNonIndexed();





    // 展開図UV適用

    applyBoxUV(
        geometry
    );





    const material =
        new THREE.MeshStandardMaterial({

            map:texture,

            color:0xffffff,

            roughness:0.95,

            metalness:0

        });





    boxMesh =
        new THREE.Mesh(
            geometry,
            material
        );



    boxMesh.position.y =
        h / 2;



    boxMesh.castShadow = true;

    boxMesh.receiveShadow = true;



    scene.add(boxMesh);



    return boxMesh;

}






export function getBox(){

    return boxMesh;

}
