import { Cell } from "./cell";
import { LINE_WIDTH } from "./config";

export class Grid {
  private cells: Cell[][] = [];

  constructor({
    rows,
    cols,
    cellSize,
    cellColor,
  }: {
    rows: number;
    cols: number;
    cellSize: number;
    cellColor: string;
  }) {
    // Initializing cells
    for (let i = 0; i < rows; ++i) {
      const cellRow: Cell[] = [];
      for (let j = 0; j < cols; ++j) {
        cellRow.push(new Cell(i, j, cellSize, cellColor));
      }
      this.cells.push(cellRow);
    }

    // Initializing neighbours
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        this.cells[i]?.[j]
          ?.addNeighbour(this.cells[i]?.[j - 1])
          .addNeighbour(this.cells[i + 1]?.[j])
          .addNeighbour(this.cells[i]?.[j + 1])
          .addNeighbour(this.cells[i - 1]?.[j]);
      }
    }
  }

  getCells() {
    return this.cells;
  }
}

export function drawGrid({
  ctx,
  GRID_SIZE,
  CELL_SIZE,
}: {
  ctx: CanvasRenderingContext2D;
  GRID_SIZE: number;
  CELL_SIZE: number;
}) {
  ctx.translate(1, 1);
  ctx.lineWidth = LINE_WIDTH;
  // Drawing rows
  for (let i = 0; i <= GRID_SIZE; ++i) {
    ctx.beginPath();
    ctx.moveTo(0, CELL_SIZE * i);
    ctx.lineTo(CELL_SIZE * GRID_SIZE, CELL_SIZE * i);
    ctx.stroke();
  }

  // Drawing cols
  for (let i = 0; i <= GRID_SIZE; ++i) {
    ctx.beginPath();
    ctx.moveTo(CELL_SIZE * i, 0);
    ctx.lineTo(CELL_SIZE * i, CELL_SIZE * GRID_SIZE);
    ctx.stroke();
  }
}
