// =======================================
// UV管理
// 展開図 → BoxGeometry
// =======================================


const faceAreas = {


    front: {

        u1:0.25,
        v1:0.33,

        u2:0.50,
        v2:0.66

    },


    back: {

        u1:0.75,
        v1:0.33,

        u2:1.00,
        v2:0.66

    },


    left: {

        u1:0.00,
        v1:0.33,

        u2:0.25,
        v2:0.66

    },


    right: {

        u1:0.50,
        v1:0.33,

        u2:0.75,
        v2:0.66

    },


    top: {

        u1:0.25,
        v1:0.00,

        u2:0.50,
        v2:0.33

    },


    bottom: {

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

    if(!faceAreas[face]){

        console.warn(
            "Unknown face:",
            face
        );

        return;

    }


    faceAreas[face] = {

        u1: area.u1,
        v1: area.v1,

        u2: area.u2,
        v2: area.v2

    };


}





// =======================================
// 面UV取得
// =======================================

export function getFaceUV(face){

    return faceAreas[face];

}





// =======================================
// BoxGeometryへUV適用
// =======================================

export function applyBoxUV(
    geometry
){


    const uv =
        geometry.attributes.uv;



    /*
    
    BoxGeometry面順

    0 right
    1 left
    2 top
    3 bottom
    4 front
    5 back

    各面4頂点

    */



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


        // 左上
        uv.setXY(
            offset,
            area.u1,
            area.v1
        );


        // 右上
        uv.setXY(
            offset + 1,
            area.u2,
            area.v1
        );


        // 右下
        uv.setXY(
            offset + 2,
            area.u2,
            area.v2
        );


        // 左下
        uv.setXY(
            offset + 3,
            area.u1,
            area.v2
        );



        offset += 4;


    });



    uv.needsUpdate = true;


}
