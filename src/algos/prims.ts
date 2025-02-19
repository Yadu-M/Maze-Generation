import { drawGrid, Grid } from "../grid";
import type { mazeT } from "../types";
import { clearCanvas } from "../utils";

export async function prims({
  ctx,
  mazeConfig,
  signal,
}: {
  ctx: CanvasRenderingContext2D;
  mazeConfig: mazeT;
  signal: AbortSignal;
}) {
  clearCanvas(ctx);

  const { getCellSize, getCurrentSpeed, getGridSize } = mazeConfig;
  const FALLBACK_COLOR = "aqua";
  const ACTIVE_CELL_COLOR = "red";
  const COLOR = "green";
  const abortMessage = "Aborted from Prims";

  drawGrid({ ctx, GRID_SIZE: getGridSize(), CELL_SIZE: getCellSize() });

  return new Promise<void>(async (resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new Error(abortMessage));
    });

    try {
      // await renderPath(randomNeighbour!, mazeConfig);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
