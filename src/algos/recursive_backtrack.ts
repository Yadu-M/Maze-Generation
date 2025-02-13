// recursive_backtrack.ts
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
  const { getCellSize, getCurrentSpeed, getGridSize } = mazeConfig;
  const FALLBACK_COLOR = "aqua";
  const ACTIVE_CELL_COLOR = "red";
  const COLOR = "green";

  console.log(
    "mazeConfig.SPEED inside recursiveBacktracker:",
    getCurrentSpeed(),
  );

  drawGrid(ctx, getGridSize(), getCellSize());

  const grid = new Grid(
    getGridSize(),
    getGridSize(),
    getCellSize(),
    FALLBACK_COLOR,
  );
  const cells = grid.getCells();

  // Initializing, pick top left as starting point
  const root = cells[0]?.[0];
  const randomNeighbour = root?.getNeighbours()[Math.floor(Math.random() * 2)]; // Only two possible neighbours anyways
  root?.setVisited(true);
  root?.addChild(randomNeighbour!);

  /**
   *
   * @param cell Current cell
   * @returns recursive calls until root is reached (base case)
   */
  const renderPath = async (cell: Cell, currentMazeConfig: mazeT) => {
    if (signal.aborted) {
      clearCanvas(ctx);
      return;
    }

    await cell.draw({
      ctx,
      speed: getCurrentSpeed(),
      color: ACTIVE_CELL_COLOR,
    });
    if (cell === root) return;

    const neighbours = cell
      .getNeighbours()
      .filter((neighbourCell) => !neighbourCell.getVisited());

    const randNeighbour =
      neighbours[Math.floor(Math.random() * neighbours.length)];

    if (!randNeighbour) {
      cell.setVisited(true);
      await cell.draw({
        ctx,
        speed: getCurrentSpeed(),
        color: COLOR,
      });
      return renderPath(cell.getParent()!, currentMazeConfig);
    }

    cell.addChild(randNeighbour);
    cell.setVisited(true);

    (
      await cell.draw({
        ctx,
        speed: getCurrentSpeed(),
        color: COLOR,
      })
    ).removeWall({
      wall: cell.getRelativeWallDir(randNeighbour)!,
      ctx,
      color: COLOR,
    });

    await renderPath(randNeighbour, currentMazeConfig);
  };

  await renderPath(randomNeighbour!, mazeConfig);
}
