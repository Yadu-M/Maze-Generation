import "./style.css";
import { recursiveBacktracker } from "./algos/recursive_backtrack";
import { algoList, type algoListValues } from "./types";
import { LINE_WIDTH } from "./config";
import { clearCanvas } from "./utils";

const DEFAULT_GRID_SIZE = 25; // Use a constant for the default
const DEFAULT_SPEED = 20; // Use a constant for the default

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

  let GRID_SIZE = DEFAULT_GRID_SIZE;
  let SPEED = DEFAULT_SPEED;

  // -- Prioritize Slider Value --
  // Use slider's value if it's been set *before* main runs (on page load)
  if (speedE.value !== "") {
    SPEED = speedE.valueAsNumber;
    console.log("Initial speed from slider:", SPEED);
  } else {
    console.log("Using default speed:", SPEED);
  }

  let CELL_SIZE = 0; // Initialize CELL_SIZE.  Will be set in handleCanvasSize.
  let MAZE_CONFIG = {
    // Initialise maze config
    CELL_SIZE, //CELL_SIZE gets initialised during the initialisation
    GRID_SIZE,
    SPEED,
  };
  let currentController: AbortController | null = null;

  const setAlgoTitle = (title: string) => {
    algorithmTitle.innerHTML = title;
  };

  const updateMazeConfig = (newConfig: Partial<typeof MAZE_CONFIG>) => {
    MAZE_CONFIG = { ...MAZE_CONFIG, ...newConfig };
    console.log("Maze config updated:", MAZE_CONFIG); // Log the updated config
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
    const newCellSize = Math.round((constraint - constraint / 3.5) / GRID_SIZE);

    canvas.width = newCellSize * GRID_SIZE + LINE_WIDTH;
    canvas.height = newCellSize * GRID_SIZE + LINE_WIDTH;
    CELL_SIZE = newCellSize; //update CELL_SIZE
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
      //Before running the maze, update the maze config, otherwise it will use the old cell size
      updateMazeConfig({ CELL_SIZE: handleCanvasSize(canvas) });
      console.log(
        "MAZE_CONFIG.SPEED after handleCanvasSize:",
        MAZE_CONFIG.SPEED
      ); //Added console log.
      switch (chosenAlgo) {
        case "RECURSIVE_BACKTRACKER":
          await recursiveBacktracker({ ctx, mazeConfig: MAZE_CONFIG, signal });
          break;
        case "PRIMS":
          // TODO
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
      if (error.name === "AbortError") {
        console.log("Algorithm Aborted:", error.message);
      } else {
        console.error(
          `Something went wrong while ${chosenAlgo} was running: `,
          error
        );
        clearCanvas(ctx);
      }
    } finally {
      currentController = null; // Always reset the controller
    }
  };

  const handleSpeed = () => {
    SPEED = speedE.valueAsNumber; // Get the number value
    updateMazeConfig({ SPEED }); // Pass {SPEED} to update the config
  };

  const handleGridSize = () => {
    GRID_SIZE = Number(
      prompt("Enter the grid size: ", String(GRID_SIZE)) || GRID_SIZE
    ); // if the prompt is null or empty, then use previous grid size;

    MAZE_CONFIG.GRID_SIZE = GRID_SIZE;
    handleCanvasSize(canvas); //after the grid size has been updated, recalculate cell size.
  };

  // ---- Initialization ----
  let initController: AbortController | null = new AbortController();

  console.log("APP LOADED");
  setAlgoTitle("Algorithm: Recursive Backtracker");

  CELL_SIZE = handleCanvasSize(canvas);
  MAZE_CONFIG = {
    CELL_SIZE,
    GRID_SIZE,
    SPEED,
  };

  selectE.addEventListener("change", handleAlgoChange);
  speedE.addEventListener("change", handleSpeed);

  handleSpeed();

  updateMazeConfig({ CELL_SIZE: handleCanvasSize(canvas) });
  await recursiveBacktracker({
    ctx,
    mazeConfig: MAZE_CONFIG,
    signal: initController.signal, // You cannot reuse a signal!
  });

  //Attach grid Size Listener

  const gridSizeInput = document.getElementById(
    "grid-size"
  ) as HTMLInputElement;

  gridSizeInput?.addEventListener("click", handleGridSize);
}

document.addEventListener("DOMContentLoaded", main);
