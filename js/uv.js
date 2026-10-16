// =======================================
// UV管理
// 展開図 → BoxGeometry
// =======================================



// 面ごとのUV範囲保存

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
// 面UV設定
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


    faceAreas[face] = area;


}




// =======================================
// 全面UV取得
// =======================================

export function getFaceUV(face){

    return faceAreas[face];

}





// =======================================
// BoxGeometryへUV適用
// =======================================

export function applyBoxUV(
    geometry,
    width,
    height,
    depth
){


    const uv =
        geometry.attributes.uv;



    /*
    
    BoxGeometry順序

    0 right
    1 left
    2 top
    3 bottom
    4 front
    5 back

    各面6頂点

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


        uv.setXY(
            offset,
            area.u1,
            area.v1
        );


        uv.setXY(
            offset+1,
            area.u2,
            area.v1
        );


        uv.setXY(
            offset+2,
            area.u2,
            area.v2
        );



        uv.setXY(
            offset+3,
            area.u1,
            area.v1
        );


        uv.setXY(
            offset+4,
            area.u2,
            area.v2
        );


        uv.setXY(
            offset+5,
            area.u1,
            area.v2
        );



        offset += 6;


    });



    uv.needsUpdate = true;


}
