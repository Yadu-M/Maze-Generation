import {
  recursiveDraw,
  recursiveInit,
  recursiveUpdate,
} from "./modules/algorithms/recursive_backtracking/draw";
import { drawCell, drawGrid } from "./modules/draw";
import { intitGridObj, resizeHandler } from "./modules/utils";

import "./style.css";
import { gridT } from "./types";

const CELL_SIZE = 20;
const ROW_COL_COUNT = 20;

function main() {
  const algo: string = "recursive";
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("something went wrong");
    return;
  }

  resizeHandler(canvas);
  const gridObj = intitGridObj(ctx, ROW_COL_COUNT, CELL_SIZE);

  // Draw the inital grid
  drawGrid(gridObj);

  let init = (_gridObj: gridT) => { console.log("Empty Init") };
  let update = (_gridObj: gridT) => { console.log("Empty Update") };
  let draw = (_gridObj: gridT) => { console.log("Empty Draw") };

  switch (algo) {
    case "recursive":
      init = recursiveInit;
      update = recursiveUpdate;
      draw = recursiveDraw;
      break;

    default:
      break;
  }

  init(gridObj);

  function loop() {
    update(gridObj);
    draw(gridObj);
  }

  const interval = setInterval(loop, 100);
  // window.onload = () => interval;
  window.resizeBy = () => resizeHandler(canvas);
}

document.addEventListener("DOMContentLoaded", main);
