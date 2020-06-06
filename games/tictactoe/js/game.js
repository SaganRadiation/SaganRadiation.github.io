const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 480;
const BOARD_SIZE = 400;
const HEIGHT_PADDING = (CANVAS_HEIGHT - BOARD_SIZE) / 2
const WIDTH_PADDING = (CANVAS_WIDTH - BOARD_SIZE) / 2

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

const SHAPE = {
  X: 'X',
  O: 'O'
};

let current_player = SHAPE.X;

let switchPlayer = function(){
  if (current_player == SHAPE.X){
    current_player = SHAPE.O;
  } else {
    current_player = SHAPE.X;
  }
}

let getMousePosition = function(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

let handleClick = function(x,y){
  drawShape(current_player, x, y);
  switchPlayer();
}

document.addEventListener("click", function(event){
  var mousePosition = getMousePosition(canvas, event);
  handleClick(mousePosition.x, mousePosition.y);
})

let drawShape = function(shape, x, y){
  const cell_padding = 20;
  const cell_size = BOARD_SIZE / 3;
  if (shape == SHAPE.X){
   const segment_length = cell_size / 2 - cell_padding;
   ctx.moveTo(x-segment_length, y-segment_length);
   ctx.lineTo(x+segment_length, y+segment_length);
   ctx.moveTo(x-segment_length, y+segment_length);
   ctx.lineTo(x+segment_length, y-segment_length);   
  } else if (shape == SHAPE.O){
    ctx.beginPath();
    ctx.arc(x,y,cell_size/2-cell_padding,0,2*Math.PI);
  }
  ctx.stroke();
}

let drawBoard = function(){
  // Draws horizontal lines.
  ctx.moveTo(WIDTH_PADDING, HEIGHT_PADDING + BOARD_SIZE*1/3)
  ctx.lineTo(WIDTH_PADDING+BOARD_SIZE, HEIGHT_PADDING + BOARD_SIZE*1/3)

  ctx.moveTo(WIDTH_PADDING, HEIGHT_PADDING + BOARD_SIZE*2/3)
  ctx.lineTo(WIDTH_PADDING+BOARD_SIZE, HEIGHT_PADDING + BOARD_SIZE*2/3)

  // Draws vertical lines.
  ctx.moveTo(WIDTH_PADDING+BOARD_SIZE*1/3, HEIGHT_PADDING)
  ctx.lineTo(WIDTH_PADDING+BOARD_SIZE*1/3, HEIGHT_PADDING + BOARD_SIZE)

  ctx.moveTo(WIDTH_PADDING+BOARD_SIZE*2/3, HEIGHT_PADDING)
  ctx.lineTo(WIDTH_PADDING+BOARD_SIZE*2/3, HEIGHT_PADDING + BOARD_SIZE)

  ctx.stroke();
};

drawBoard();