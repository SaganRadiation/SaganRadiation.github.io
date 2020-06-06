const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 480;
const BOARD_SIZE = 400;
const CELL_SIZE = BOARD_SIZE / 3;
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

let validateInput = function(x,y){
  return x>=0 && x<=CANVAS_WIDTH && y>=0 && y<=CANVAS_HEIGHT;
}

let getCell = function(x,y){
  const board_x = x - WIDTH_PADDING;
  const board_y = y - HEIGHT_PADDING;
  return {
    row: Math.floor(board_x / CELL_SIZE),
    col: Math.floor(board_y / CELL_SIZE)
  }
}

let validateCell = function(row, col){
  return row>=0 && row <=2 && col >=0 && col <=2 ;
}
let handleClick = function(x,y){
  if (!validateInput(x,y)){
    return;
  }
  cell = getCell(x, y);
  if (!validateCell(cell.row, cell.col)){
    return;
  }
  drawShapeAtCell(current_player, cell.row, cell.col);
  switchPlayer();
}

document.addEventListener("click", function(event){
  var mousePosition = getMousePosition(canvas, event);
  handleClick(mousePosition.x, mousePosition.y);
})

let drawShapeAtCell = function(shape, row, col){
  let x = WIDTH_PADDING + CELL_SIZE*(1/2 + row);
  let y = HEIGHT_PADDING + CELL_SIZE*(1/2 + col);
  drawShape(shape, x, y);
}

let drawShape = function(shape, x, y){
  const cell_padding = 20;
  if (shape == SHAPE.X){
   const segment_length = CELL_SIZE / 2 - cell_padding;
   ctx.moveTo(x-segment_length, y-segment_length);
   ctx.lineTo(x+segment_length, y+segment_length);
   ctx.moveTo(x-segment_length, y+segment_length);
   ctx.lineTo(x+segment_length, y-segment_length);   
  } else if (shape == SHAPE.O){
    ctx.beginPath();
    ctx.arc(x,y,CELL_SIZE/2-cell_padding,0,2*Math.PI);
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