// =======================================
// 展開図UV設定
// BoxGeometry用
// =======================================


// 展開図配置
//
//        TOP
//
// LEFT FRONT RIGHT BACK
//
//       BOTTOM
//
// UV座標 0.0〜1.0
//

const faceAreas = {


    front: {

        u1: 0.25,
        v1: 0.33,

        u2: 0.50,
        v2: 0.66

    },


    back: {

        u1: 0.75,
        v1: 0.33,

        u2: 1.00,
        v2: 0.66

    },


    left: {

        u1: 0.00,
        v1: 0.33,

        u2: 0.25,
        v2: 0.66

    },


    right: {

        u1: 0.50,
        v1: 0.33,

        u2: 0.75,
        v2: 0.66

    },


    top: {

        u1: 0.25,
        v1: 0.00,

        u2: 0.50,
        v2: 0.33

    },


    bottom: {

        u1: 0.25,
        v1: 0.66,

        u2: 0.50,
        v2: 1.00

    }


};




// =======================================
// BoxGeometry UV適用
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
    
    THREE.BoxGeometry 面順

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



    mappings.forEach(area => {



        // -----------------------
        // 三角形1
        // -----------------------

        uv.setXY(
            offset,
            area.u1,
            area.v1
        );


        uv.setXY(
            offset + 1,
            area.u2,
            area.v1
        );


        uv.setXY(
            offset + 2,
            area.u2,
            area.v2
        );



        // -----------------------
        // 三角形2
        // -----------------------

        uv.setXY(
            offset + 3,
            area.u1,
            area.v1
        );


        uv.setXY(
            offset + 4,
            area.u2,
            area.v2
        );


        uv.setXY(
            offset + 5,
            area.u1,
            area.v2
        );



        offset += 6;


    });



    uv.needsUpdate = true;


}
