let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, canvas.width, canvas.height);