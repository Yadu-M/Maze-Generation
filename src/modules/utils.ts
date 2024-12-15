import { gridT, cellT } from "../types";

export const resizeHandler = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

export const intitGridObj = (
  ctx: CanvasRenderingContext2D,
  ROW_COL_COUNT: number,
  CELL_SIZE: number
): gridT => {
  const cells: cellT[][] = [];
  for (let row = 0; row < ROW_COL_COUNT; ++row) {
    const cellRow: cellT[] = [];
    for (let col = 0; col < ROW_COL_COUNT; ++col) {
      cellRow.push({
        state: false,
        y: row,
        x: col,
      });
    }
    cells.push(cellRow);
  }

  return {
    rowColCount: ROW_COL_COUNT,
    cellSize: CELL_SIZE,
    ctx: ctx,
    cells: cells,
  };
};

export const getNeighbourCells = (cell: cellT, gridS: number): cellT[] => {
  const { x, y } = cell;
  const neighbours: cellT[] = [];
  const leftMostIndex = 0;
  const rightMostIndex = gridS - 1;
  const 

  return neighbours;
};
