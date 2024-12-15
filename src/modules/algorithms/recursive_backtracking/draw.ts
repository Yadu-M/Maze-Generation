import { cellT, gridT } from "../../../types";

/*
  Pick a random point

  Pick a random wall. If neighbouring cell sharing the wall has not been visited,
  break down the wall and mark neighbour as active cell (current cell)

  If the adjacent wall is already marked, check for all walls, if all walls are marked
  backtrack to the previous cell and perform the steps again

  Repeat until the initial cell has been reached
*/

/**
 * Initializes a starting point
 * @param grid
 * @returns starting cell 
 */
export const recursiveInit = (grid: gridT): cellT => {
  const { cells } = grid;
  const randRow = Math.floor(Math.random() * grid.rowColCount);
  const randCol = Math.floor(Math.random() * grid.rowColCount);
  const startingCell = cells[randRow][randCol];
  startingCell.state = true;
  return startingCell;
};

export const recursiveUpdate = (grid: gridT, activeCell: cellT) => {
  const { cells } = grid;
  const dir = ["North", "East", "South", "West"];
  const arrayLen = dir.length
  const randDir = Math.floor(Math.random() * arrayLen)
  const quit = false;
  // while (arrayLen > 0 || quit) {
  //   if (cells[activeCell.y][activeCell.x])
  // }
};

export const recursiveDraw = (grid: gridT) => {

};
