let canvas;
let ctx;

let image=null;

let dragging=false;

let startX=0;
let startY=0;

let currentRect=null;

let callback=null;

export function initSelector(canvasId,onSelected){

    canvas=document.getElementById(canvasId);

    ctx=canvas.getContext("2d");

    callback=onSelected;

    canvas.addEventListener("mousedown",mouseDown);
    canvas.addEventListener("mousemove",mouseMove);
    canvas.addEventListener("mouseup",mouseUp);

}

export function setImage(img){

    image=img;

    canvas.width=img.width;
    canvas.height=img.height;

    draw();

}

function mouseDown(e){

    const r=canvas.getBoundingClientRect();

    startX=e.clientX-r.left;
    startY=e.clientY-r.top;

    dragging=true;

}

function mouseMove(e){

    if(!dragging) return;

    const r=canvas.getBoundingClientRect();

    const x=e.clientX-r.left;
    const y=e.clientY-r.top;

    currentRect={

        x:Math.min(startX,x),

        y:Math.min(startY,y),

        width:Math.abs(x-startX),

        height:Math.abs(y-startY)

    };

    draw();

}

function mouseUp(){

    dragging=false;

    if(callback && currentRect){

        callback(currentRect);

    }

}

function draw(){

    if(!image) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(image,0,0);

    if(currentRect){

        ctx.lineWidth=2;

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
