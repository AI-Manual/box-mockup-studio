export function applyBoxUV(geometry){


    const uv =
        geometry.attributes.uv;


    /*
    
    BoxGeometry face order

    right
    left
    top
    bottom
    front
    back

    各面6頂点

    */


    const faces = [

        {
            u1:0.50,
            v1:0.33,
            u2:0.75,
            v2:0.66
        },

        {
            u1:0.00,
            v1:0.33,
            u2:0.25,
            v2:0.66
        },

        {
            u1:0.25,
            v1:0.00,
            u2:0.50,
            v2:0.33
        },

        {
            u1:0.25,
            v1:0.66,
            u2:0.50,
            v2:1.00
        },

        {
            u1:0.25,
            v1:0.33,
            u2:0.50,
            v2:0.66
        },

        {
            u1:0.75,
            v1:0.33,
            u2:1.00,
            v2:0.66
        }

    ];



    let offset = 0;



    faces.forEach(face=>{


        // 1枚の面 = 6頂点

        uv.setXY(
            offset,
            face.u1,
            face.v1
        );


        uv.setXY(
            offset+1,
            face.u2,
            face.v1
        );


        uv.setXY(
            offset+2,
            face.u2,
            face.v2
        );


        uv.setXY(
            offset+3,
            face.u1,
            face.v1
        );


        uv.setXY(
            offset+4,
            face.u2,
            face.v2
        );


        uv.setXY(
            offset+5,
            face.u1,
            face.v2
        );


        offset += 6;


    });



    uv.needsUpdate = true;


}
