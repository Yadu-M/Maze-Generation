export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(-2, -2, ctx.canvas.width + 2, ctx.canvas.height + 2);
};