import * as THREE from "three";


let boxMesh = null;



// 面Texture保存

const faceTextures = {


    right:null,
    left:null,
    top:null,
    bottom:null,
    front:null,
    back:null

};






// =======================================
// 面Texture設定
// =======================================

export function setFaceTexture(
    face,
    texture
){

    if(!faceTextures[face])
    {

        faceTextures[face] =
            texture;

    }
    else
    {

        faceTextures[face] =
            texture;

    }


}







// =======================================
// BOX生成
// =======================================

export function createBox(
    scene,
    width,
    height,
    depth
){



    if(boxMesh){


        scene.remove(
            boxMesh
        );


        boxMesh.geometry.dispose();


        if(Array.isArray(boxMesh.material)){

            boxMesh.material.forEach(
                m=>m.dispose()
            );

        }


    }






    const geometry =
        new THREE.BoxGeometry(

            Number(width),
            Number(height),
            Number(depth)

        );







    const materials = [


        createMaterial(
            faceTextures.right
        ),


        createMaterial(
            faceTextures.left
        ),


        createMaterial(
            faceTextures.top
        ),


        createMaterial(
            faceTextures.bottom
        ),


        createMaterial(
            faceTextures.front
        ),


        createMaterial(
            faceTextures.back
        )


    ];







    boxMesh =
        new THREE.Mesh(

            geometry,

            materials

        );





    boxMesh.position.y =
        Number(height)/2;





    boxMesh.castShadow =
        true;


    boxMesh.receiveShadow =
        true;





    scene.add(
        boxMesh
    );



    return boxMesh;


}







function createMaterial(texture){


    return new THREE.MeshStandardMaterial({

        map:texture,

        color:0xffffff,

        roughness:0.95,

        metalness:0

    });


}






export function getBox(){

    return boxMesh;

}
