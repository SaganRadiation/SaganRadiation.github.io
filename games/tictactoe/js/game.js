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
  O: 'O',
  E: 'EMPTY'
};

let current_player = SHAPE.X;
let board = [[SHAPE.E, SHAPE.E, SHAPE.E],
             [SHAPE.E, SHAPE.E, SHAPE.E],
             [SHAPE.E, SHAPE.E, SHAPE.E]];

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
    y: evt.clientY - rect.top
  }
}

let validateInput = function(x,y){
  return x>=0 && x<=CANVAS_WIDTH && y>=0 && y<=CANVAS_HEIGHT;
}

let getCell = function(x,y){
  const board_x = x - WIDTH_PADDING;
  const board_y = y - HEIGHT_PADDING;
  return {
    row: Math.floor(board_y / CELL_SIZE),
    col: Math.floor(board_x / CELL_SIZE)
  }
}

let validateCell = function(row, col){
  let cell_in_range = row>=0 && row <=2 && col >=0 && col <=2;
  if (!cell_in_range){
    return false;
  }
  if (board[row][col] != SHAPE.E){
    return false;
  }
  return true;
}

let updateBoard = function(shape, row, col){
  board[row][col] = shape;
}

let checkWinner = function(){
  let winning_positions = [
    // Horizontal rows.
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    // Vertical rows.
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    // Diagonal rows.
    [[0,0], [1,1], [2,2]],
    [[2,0], [1,1], [0,2]]
  ];
  for (var i = 0; i < winning_positions.length; i++){
    pos = winning_positions[i];
    if (board[pos[0][0]][pos[0][1]] == 
        board[pos[1][0]][pos[1][1]] &&
        board[pos[1][0]][pos[1][1]] ==
        board[pos[2][0]][pos[2][1]]){
      let shape = board[pos[0][0]][pos[0][1]];
      if (shape == SHAPE.X || shape == SHAPE.O){
        return shape;
      }
    }
  }
  return false;
}

let handleClick = function(x,y){
  if (!validateInput(x,y)){
    return;
  }
  cell = getCell(x, y);
  if (!validateCell(cell.row, cell.col)){
    return;
  }
  updateBoard(current_player, cell.row, cell.col);
  drawShapeAtCell(current_player, cell.row, cell.col);
  let winner = checkWinner();
  if (winner == SHAPE.X || winner == SHAPE.O){
    alert(winner + " wins!");
  }
  switchPlayer();
}

document.addEventListener("click", function(event){
  var mousePosition = getMousePosition(canvas, event);
  handleClick(mousePosition.x, mousePosition.y);
})

let drawShapeAtCell = function(shape, row, col){
  let x = WIDTH_PADDING + CELL_SIZE*(1/2 + col);
  let y = HEIGHT_PADDING + CELL_SIZE*(1/2 + row);
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