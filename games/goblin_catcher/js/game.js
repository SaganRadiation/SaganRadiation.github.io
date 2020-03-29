var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
}
bgImage.src = "images/background.png"

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
  heroReady = true;
}
heroImage.src = "images/hero.png"

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
}
monsterImage.src = "images/monster.png"

// Game objects
var hero = {
	speed: 256,
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};

// Hanle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

var render = function(){
  if (bgReady){
  	ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady){
  	ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady){
  	ctx.drawImage(monsterImage, monster.x, monster.y);
  }

};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var reset = function() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function(modifier){
	if (38 in keysDown){
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown){
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown){
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown){
		hero.x += hero.speed * modifier;
	}
}

var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	
	requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();