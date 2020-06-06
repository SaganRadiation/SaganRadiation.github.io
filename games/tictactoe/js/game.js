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
    // TODO
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
drawShape(SHAPE.X, 100, 150);