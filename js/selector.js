let canvas;
let ctx;

let image = null;


let dragging = false;

let moving = false;


let startX = 0;
let startY = 0;


let moveOffsetX = 0;
let moveOffsetY = 0;


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





// =====================================
// 初期化
// =====================================

export function initSelector(
    canvasId,
    onSelected
){


    canvas =
        document.getElementById(
            canvasId
        );


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


    canvas.addEventListener(
        "mouseleave",
        mouseUp
    );

}





// =====================================
// 面変更
// =====================================

export function selectFace(face){


    currentFace = face;


    currentRect =
        faceRects[face];


    draw();


}







// =====================================
// 画像セット
// =====================================

export function setImage(img){


    image = img;


    canvas.width =
        img.width;


    canvas.height =
        img.height;



    draw();


}







// =====================================
// マウス座標変換
// =====================================

function getMousePosition(e){


    const rect =
        canvas.getBoundingClientRect();



    const scaleX =
        canvas.width /
        rect.width;


    const scaleY =
        canvas.height /
        rect.height;



    return {

        x:
        (e.clientX - rect.left)
        * scaleX,


        y:
        (e.clientY - rect.top)
        * scaleY

    };

}







// =====================================
// 開始
// =====================================

function mouseDown(e){


    const pos =
        getMousePosition(e);



    const rect =
        faceRects[currentFace];



    // 既存範囲を掴んだ場合
    if(
        rect &&
        pos.x >= rect.x &&
        pos.x <= rect.x + rect.width &&
        pos.y >= rect.y &&
        pos.y <= rect.y + rect.height
    ){


        moving = true;



        moveOffsetX =
            pos.x - rect.x;


        moveOffsetY =
            pos.y - rect.y;



        currentRect = rect;


        return;

    }





    // 新規選択

    startX =
        pos.x;


    startY =
        pos.y;


    dragging = true;



    currentRect = {

        x:startX,

        y:startY,

        width:0,

        height:0

    };


}







// =====================================
// 移動・選択
// =====================================

function mouseMove(e){


    const pos =
        getMousePosition(e);




    // 移動中

    if(moving){


        currentRect = {


            x:
            pos.x - moveOffsetX,


            y:
            pos.y - moveOffsetY,


            width:
            faceRects[currentFace].width,


            height:
            faceRects[currentFace].height


        };



        faceRects[currentFace] =
            currentRect;



        draw();


        return;

    }





    // 新規選択中

    if(!dragging)
        return;



    currentRect = {


        x:
        Math.min(
            startX,
            pos.x
        ),


        y:
        Math.min(
            startY,
            pos.y
        ),


        width:
        Math.abs(
            pos.x - startX
        ),


        height:
        Math.abs(
            pos.y - startY
        )


    };



    draw();


}







// =====================================
// 終了
// =====================================

function mouseUp(){


    if(
        !dragging &&
        !moving
    )
        return;



    dragging = false;

    moving = false;



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







// =====================================
// 描画
// =====================================

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
            face === currentFace
            ? "red"
            : "blue";



        ctx.lineWidth = 2;



        ctx.strokeRect(

            rect.x,

            rect.y,

            rect.width,

            rect.height

        );


    });





    if(currentRect){


        ctx.strokeStyle =
            "red";


        ctx.lineWidth = 2;



        ctx.strokeRect(

            currentRect.x,

            currentRect.y,

            currentRect.width,

            currentRect.height

        );


    }


}







// =====================================
// 取得
// =====================================

export function getRect(){

    return currentRect;

}



export function getAllRects(){

    return faceRects;

}
