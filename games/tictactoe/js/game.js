let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

ctx.moveTo(10,10);
ctx.lineTo(200,100);
ctx.stroke();