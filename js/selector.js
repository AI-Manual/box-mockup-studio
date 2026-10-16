let canvas;
let ctx;

let image = null;


let dragging = false;


let startX = 0;
let startY = 0;


let currentRect = null;


let callback = null;



// 現在選択中の面
let currentFace = "front";


// 面ごとの座標保存
const faceRects = {

    front:null,
    back:null,
    left:null,
    right:null,
    top:null,
    bottom:null

};




export function initSelector(
    canvasId,
    onSelected
){

    canvas =
        document.getElementById(canvasId);


    ctx =
        canvas.getContext("2d");


    callback =
        onSelected;



    canvas.addEventListener(
        "mousedown",
        mouseDown
    );


    canvas.addEventListener(
        "mousemove",
        mouseMove
    );


    canvas.addEventListener(
        "mouseup",
        mouseUp
    );

}




// 選択する面変更
export function selectFace(face){

    currentFace = face;

    currentRect =
        faceRects[face];

    draw();

}




export function setImage(img){


    image = img;


    canvas.width =
        img.width;


    canvas.height =
        img.height;



    draw();

}




function mouseDown(e){


    const r =
        canvas.getBoundingClientRect();



    startX =
        e.clientX-r.left;


    startY =
        e.clientY-r.top;



    dragging=true;

}




function mouseMove(e){


    if(!dragging)
        return;



    const r =
        canvas.getBoundingClientRect();



    const x =
        e.clientX-r.left;


    const y =
        e.clientY-r.top;




    currentRect={


        x:Math.min(
            startX,
            x
        ),


        y:Math.min(
            startY,
            y
        ),


        width:Math.abs(
            x-startX
        ),


        height:Math.abs(
            y-startY
        )


    };



    draw();

}





function mouseUp(){


    dragging=false;



    if(currentRect){


        faceRects[currentFace] =
            currentRect;


        if(callback){


            callback(
                currentFace,
                currentRect
            );


        }


    }


}





function draw(){


    if(!image)
        return;



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    ctx.drawImage(
        image,
        0,
        0
    );



    Object.keys(faceRects)
    .forEach(face=>{


        const rect =
            faceRects[face];


        if(!rect)
            return;



        ctx.strokeStyle =
            face===currentFace
            ? "red"
            : "blue";



        ctx.lineWidth=2;



        ctx.strokeRect(

            rect.x,
            rect.y,
            rect.width,
            rect.height

        );


    });



    if(currentRect){


        ctx.strokeStyle="red";


        ctx.strokeRect(

            currentRect.x,
            currentRect.y,
            currentRect.width,
            currentRect.height

        );


    }


}





export function getRect(){

    return currentRect;

}




export function getAllRects(){

    return faceRects;

}
