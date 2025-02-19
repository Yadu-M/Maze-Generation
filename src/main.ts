import "./style.css";
import { recursiveBacktracker } from "./algos/recursive_backtrack";
import { algoList, type algoListValues, type mazeT } from "./types";
import { LINE_WIDTH } from "./config";
import { clearCanvas } from "./utils";
import { prims } from "./algos/prims";

const DEFAULT_GRID_SIZE = 25;
const DEFAULT_SPEED = 20;
const DEFAULT_CELL_SIZE = 10;

async function main() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const selectE = document.getElementById("algo-list") as HTMLSelectElement;
  const speedE = document.getElementById("speed") as HTMLInputElement;
  const algorithmTitle = document.getElementById(
    "maze-title"
  ) as HTMLHeadingElement;

  const ctx = canvas?.getContext("2d");

  if (!canvas || !selectE || !ctx || !algorithmTitle || !speedE) {
    console.error("One or more elements not found.");
    return; // Exit early if elements are missing
  }

  console.log("APP LOADED");

  // Init variables

  let GRID_SIZE = DEFAULT_GRID_SIZE;
  let SPEED = DEFAULT_SPEED;
  let CELL_SIZE = DEFAULT_CELL_SIZE;
  let MAZE_CONFIG: mazeT = {
    getCellSize: () => CELL_SIZE,
    getGridSize: () => GRID_SIZE,
    getCurrentSpeed: () => SPEED,
  };

  let currentController: AbortController | null = null;

  // Helper functions

  const setAlgoTitle = (title: string) => {
    algorithmTitle.innerHTML = title;
  };

  const handleAlgoSelect = (
    selectE: HTMLSelectElement
  ): algoListValues | null => {
    const selectedVal = selectE.value;

    const isValid = (value: unknown): value is algoListValues => {
      return Object.values(algoList).includes(value as algoListValues);
    };

    return isValid(selectedVal) ? selectedVal : null;
  };

  const handleCanvasSize = (canvas: HTMLCanvasElement) => {
    const constraint = Math.min(window.innerHeight, window.innerWidth);
    const newCellSize = Math.round((constraint - constraint / 3.5) / GRID_SIZE); // 3.5 as a scaling value to restrict padding in smaller screens

    canvas.width = newCellSize * GRID_SIZE + LINE_WIDTH;
    canvas.height = newCellSize * GRID_SIZE + LINE_WIDTH;
    CELL_SIZE = newCellSize;
    return newCellSize;
  };

  const handleAlgoChange = async () => {
    if (initController) {
      initController.abort();
      initController = null;
    }

    const chosenAlgo = handleAlgoSelect(selectE);

    if (!chosenAlgo) {
      console.warn(`Invalid algorithm selected: ${selectE.value}`);
      return; // Exit if algorithm is invalid
    }

    if (currentController) {
      currentController.abort("Algorithm change requested");
      currentController = null;
    }

    setAlgoTitle(`Algorithm: ${chosenAlgo}`);

    currentController = new AbortController();
    const signal = currentController.signal;

    try {
      CELL_SIZE = handleCanvasSize(canvas);
      switch (chosenAlgo) {
        case "RECURSIVE_BACKTRACKER":
          await recursiveBacktracker({ ctx, mazeConfig: MAZE_CONFIG, signal });
          break;
        case "PRIMS":
          await prims({ ctx, mazeConfig: MAZE_CONFIG, signal });
          break;
        case "KRUSKALS":
          // TODO
          break;
        case "WILSONS":
          // TODO
          break;

        default:
          console.error("Something went wrong");
      }
    } catch (error: any) {
      console.log("Algorithm Aborted:", error.message);
    } finally {
      currentController = null;
      clearCanvas(ctx);
    }
  };

  const handleSpeed = () => {
    SPEED = 250 - speedE.valueAsNumber; // 500 ms is the slowest speed
    console.log(SPEED, speedE.valueAsNumber);
  };

  // ---- Initialization ----

  // Attach listeners
  selectE.addEventListener("change", handleAlgoChange);
  speedE.addEventListener("change", handleSpeed);

  let initController: AbortController | null = new AbortController(); // Temp controller for initial run

  setAlgoTitle("Algorithm: Recursive Backtracker");

  CELL_SIZE = handleCanvasSize(canvas);

  try {
    await recursiveBacktracker({
      ctx,
      mazeConfig: MAZE_CONFIG,
      signal: initController.signal,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

document.addEventListener("DOMContentLoaded", main);
