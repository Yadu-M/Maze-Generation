import { LINE_WIDTH } from "./config";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(
    -LINE_WIDTH,
    -LINE_WIDTH,
    ctx.canvas.width + LINE_WIDTH,
    ctx.canvas.height + LINE_WIDTH,
  );
};
