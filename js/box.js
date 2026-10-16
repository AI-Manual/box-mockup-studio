import * as THREE from "three";


let boxMesh = null;



const faceTextures = {

    right:null,
    left:null,
    top:null,
    bottom:null,
    front:null,
    back:null

};





export function setFaceTexture(
    face,
    texture
){

    faceTextures[face] =
        texture;


}







export function createBox(
    scene,
    width,
    height,
    depth
){


    if(boxMesh){

        scene.remove(boxMesh);

        boxMesh.geometry.dispose();

        if(Array.isArray(boxMesh.material)){

            boxMesh.material.forEach(
                m=>m.dispose()
            );

        }

    }





    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );





    const materials = [


        createMaterial(
            faceTextures.right,
            "right"
        ),


        createMaterial(
            faceTextures.left,
            "left"
        ),


        createMaterial(
            faceTextures.top,
            "top"
        ),


        createMaterial(
            faceTextures.bottom,
            "bottom"
        ),


        createMaterial(
            faceTextures.front,
            "front"
        ),


        createMaterial(
            faceTextures.back,
            "back"
        )


    ];







    boxMesh =
        new THREE.Mesh(
            geometry,
            materials
        );



    boxMesh.position.y =
        height / 2;



    boxMesh.castShadow = true;

    boxMesh.receiveShadow = true;



    scene.add(boxMesh);


    return boxMesh;


}







function createMaterial(
    texture,
    face
){


    if(!texture){


        return new THREE.MeshStandardMaterial({

            color:0xffffff,

            roughness:0.95

        });


    }




    // Textureを複製
    const tex =
        texture.clone();



    tex.needsUpdate = true;




    switch(face){


        case "front":

            break;



        case "back":

            tex.repeat.x = -1;

            tex.offset.x = 1;

            break;



        case "left":

            tex.repeat.x = -1;

            tex.offset.x = 1;

            break;



        case "right":

            break;



        case "top":

            tex.rotation =
                Math.PI / 2;

            tex.center.set(
                0.5,
                0.5
            );

            break;



        case "bottom":

            tex.rotation =
                -Math.PI / 2;

            tex.center.set(
                0.5,
                0.5
            );

            break;


    }




    return new THREE.MeshStandardMaterial({

        map:tex,

        color:0xffffff,

        roughness:0.95

    });


}
