// =======================================
// UV管理
// 展開図 → BoxGeometry
// =======================================



const faceAreas = {


    front:{
        u1:0.25,
        v1:0.33,
        u2:0.50,
        v2:0.66
    },


    back:{
        u1:0.75,
        v1:0.33,
        u2:1.00,
        v2:0.66
    },


    left:{
        u1:0.00,
        v1:0.33,
        u2:0.25,
        v2:0.66
    },


    right:{
        u1:0.50,
        v1:0.33,
        u2:0.75,
        v2:0.66
    },


    top:{
        u1:0.25,
        v1:0.00,
        u2:0.50,
        v2:0.33
    },


    bottom:{
        u1:0.25,
        v1:0.66,
        u2:0.50,
        v2:1.00
    }


};






// =======================================
// 面UV変更
// =======================================

export function setFaceUV(
    face,
    area
){

    if(!faceAreas[face])
        return;



    faceAreas[face] = {

        u1:area.u1,
        v1:area.v1,

        u2:area.u2,
        v2:area.v2

    };


    console.log(
        "setFaceUV",
        face,
        faceAreas[face]
    );


}







export function getFaceUV(face){

    return faceAreas[face];

}







// =======================================
// BoxGeometryへUV適用
//
// NonIndexed
// 1面6頂点
//
// 全面左右反転補正
// =======================================

export function applyBoxUV(
    geometry
){


    console.log(
        "applyBoxUV",
        faceAreas
    );



    const uv =
        geometry.attributes.uv;



    const mappings = [


        faceAreas.right,

        faceAreas.left,

        faceAreas.top,

        faceAreas.bottom,

        faceAreas.front,

        faceAreas.back


    ];



    let offset = 0;



    mappings.forEach(area=>{


        // 左右反転

        uv.setXY(
            offset,
            area.u2,
            area.v1
        );


        uv.setXY(
            offset+1,
            area.u1,
            area.v1
        );


        uv.setXY(
            offset+2,
            area.u1,
            area.v2
        );



        uv.setXY(
            offset+3,
            area.u2,
            area.v1
        );


        uv.setXY(
            offset+4,
            area.u1,
            area.v2
        );


        uv.setXY(
            offset+5,
            area.u2,
            area.v2
        );



        offset += 6;


    });



    uv.needsUpdate = true;


}
