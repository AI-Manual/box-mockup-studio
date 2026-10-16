// =======================================
// UV管理
// 展開図 → BoxGeometry
// =======================================


// 面ごとのUV範囲

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


    if(!faceAreas[face]){

        console.warn(
            "Unknown face",
            face
        );

        return;

    }


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







// =======================================
// UV取得
// =======================================

export function getFaceUV(face){

    return faceAreas[face];

}








// =======================================
// BoxGeometryへUV適用
//
// NonIndexed
// 6面 × 6頂点
//
// BoxGeometry順:
//
// 0 right
// 1 left
// 2 top
// 3 bottom
// 4 front
// 5 back
//
// =======================================

export function applyBoxUV(
    geometry
){


    console.log(
        "applyBoxUV current",
        JSON.parse(
            JSON.stringify(faceAreas)
        )
    );



    const uv =
        geometry.attributes.uv;



    const faces = [


        // right
        {
            area:faceAreas.right,
            flip:false
        },


        // left
        {
            area:faceAreas.left,
            flip:true
        },


        // top
        {
            area:faceAreas.top,
            flip:false
        },


        // bottom
        {
            area:faceAreas.bottom,
            flip:true
        },


        // front
        {
            area:faceAreas.front,
            flip:false
        },


        // back
        {
            area:faceAreas.back,
            flip:true
        }


    ];




    let offset = 0;




    faces.forEach(face=>{


        const a =
            face.area;



        if(face.flip){


            // 左右反転

            uv.setXY(
                offset,
                a.u2,
                a.v1
            );


            uv.setXY(
                offset+1,
                a.u1,
                a.v1
            );


            uv.setXY(
                offset+2,
                a.u1,
                a.v2
            );


            uv.setXY(
                offset+3,
                a.u2,
                a.v1
            );


            uv.setXY(
                offset+4,
                a.u1,
                a.v2
            );


            uv.setXY(
                offset+5,
                a.u2,
                a.v2
            );



        }else{


            uv.setXY(
                offset,
                a.u1,
                a.v1
            );


            uv.setXY(
                offset+1,
                a.u2,
                a.v1
            );


            uv.setXY(
                offset+2,
                a.u2,
                a.v2
            );


            uv.setXY(
                offset+3,
                a.u1,
                a.v1
            );


            uv.setXY(
                offset+4,
                a.u2,
                a.v2
            );


            uv.setXY(
                offset+5,
                a.u1,
                a.v2
            );


        }



        offset += 6;



    });



    uv.needsUpdate = true;


}
