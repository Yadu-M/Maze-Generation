import { Cell } from "../cell";
import { drawGrid, Grid } from "../grid";
import type { mazeT } from "../types";
import { clearCanvas } from "../utils";

/**
 * DFS with randomness basically
 */
export async function recursiveBacktracker({
  ctx,
  mazeConfig,
  signal,
}: {
  ctx: CanvasRenderingContext2D;
  mazeConfig: mazeT;
  signal: AbortSignal;
}) {
  const { GRID_SIZE, CELL_SIZE } = mazeConfig;
  const INITIAL_COLOR = "aqua";
  const COLOR = "green";

  drawGrid(ctx, GRID_SIZE, CELL_SIZE);

  const grid = new Grid(GRID_SIZE, GRID_SIZE, CELL_SIZE, INITIAL_COLOR);
  const cells = grid.getCells();

  // Initializing, pick top left as starting point
  const root = cells[0]?.[0];
  const randomNeighbour = root?.getNeighbours()[Math.floor(Math.random() * 2)];
  root?.setVisited(true);
  root?.addChild(randomNeighbour!);

  /**
   *
   * @param cell Current cell
   * @returns recursive calls until root is reached (base case)
   */
  const renderPath = async (cell: Cell) => {
    console.log(`Speed from renderer: ${mazeConfig.SPEED}`);
    // debugger;
    if (signal.aborted) {
      clearCanvas(ctx);
      return;
    }

    await cell.draw({ ctx, speed: mazeConfig.SPEED, color: "red" });
    if (cell === root) return;

    const neighbours = cell
      .getNeighbours()
      .filter((neighbourCell) => !neighbourCell.getVisited());

    const randNeighbour =
      neighbours[Math.floor(Math.random() * neighbours.length)];

    if (!randNeighbour) {
      cell.setVisited(true);
      await cell.draw({ ctx, speed: mazeConfig.SPEED, color: COLOR });
      return renderPath(cell.getParent()!);
    }

    cell.addChild(randNeighbour);
    cell.setVisited(true);

    (
      await cell.draw({ ctx, speed: mazeConfig.SPEED, color: COLOR })
    ).removeWall({
      wall: cell.getRelativeWallDir(randNeighbour)!,
      ctx,
      color: COLOR,
    });

    await renderPath(randNeighbour);
  };

  await renderPath(randomNeighbour!);
}
