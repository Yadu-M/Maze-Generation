import { cellT, gridT } from "../types";

export const drawGrid = (grid: gridT) => {  
  const {ctx, rowColCount, cellSize } = grid;

  for (let i = 1; i < rowColCount; ++i) {
    // Drawing rows
    ctx.beginPath();    
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(rowColCount * cellSize, i * cellSize);
    ctx.stroke();

    // Drawing cols;
    ctx.beginPath();    
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, rowColCount * cellSize);
    ctx.stroke();
  }

  // Upper horizontal line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(cellSize * rowColCount, 0);
  ctx.stroke();

  // Right side vertical line
  ctx.beginPath();
  ctx.moveTo(cellSize * rowColCount, 0);
  ctx.lineTo(cellSize * rowColCount, cellSize * rowColCount);
  ctx.stroke();

  // Bottom horizontal line
  ctx.beginPath();
  ctx.moveTo(0, cellSize * rowColCount);
  ctx.lineTo(cellSize * rowColCount, cellSize * rowColCount);
  ctx.stroke();

  // Left side vertical line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, cellSize * rowColCount);
  ctx.stroke();
}


export const drawCell = (
  ctx: CanvasRenderingContext2D,
  cell: cellT,
  cellSize: number
) => {
  const { state, x, y } = cell;
  const color = state ? "green" : ""
 
  ctx.beginPath();
  ctx.fillStyle = color;  
  ctx.fillRect(cellSize * x, cellSize * y, cellSize - 2, cellSize - 2);
}