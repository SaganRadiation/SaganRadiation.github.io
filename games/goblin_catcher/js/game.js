var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
}
bgImage.src = "images/background.png"


var render = function(){
  if (bgReady){
  	ctx.drawImage(bgImage, 0, 0);
  }
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var reset = function() {
};

var main = function() {
	render();

	requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();
