import * as THREE from "three";


// 展開図配置
//
// 画像全体をUV 0〜1で管理
//
//        TOP
//
// LEFT FRONT RIGHT BACK
//
//       BOTTOM
//

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





export function applyBoxUV(
    geometry,
    width,
    height,
    depth
){


    const uv = geometry.attributes.uv;


    /*
    
    BoxGeometryの面順

    0 right
    1 left
    2 top
    3 bottom
    4 front
    5 back

    */


    const mappings=[


        faceAreas.right,

        faceAreas.left,

        faceAreas.top,

        faceAreas.bottom,

        faceAreas.front,

        faceAreas.back

    ];



    let offset = 0;



    for(
        let i = 0;
        i < mappings.length;
        i++
    ){


        const area = mappings[i];


        const a = offset;

        const b = offset + 1;

        const c = offset + 2;

        const d = offset + 3;



        if(
            c >= uv.count
        ){
            break;
        }



        // 三角形1
        uv.setXY(
            a,
            area.u1,
            area.v1
        );

        uv.setXY(
            b,
            area.u2,
            area.v1
        );

        uv.setXY(
            c,
            area.u2,
            area.v2
        );


        // 三角形2

        uv.setXY(
            a + 3,
            area.u1,
            area.v1
        );

        uv.setXY(
            c,
            area.u2,
            area.v2
        );

        uv.setXY(
            d,
            area.u1,
            area.v2
        );



        offset += 4;


    }


    uv.needsUpdate = true;


}
