export type directionT = "North" | "East" | "South" | "West";
export enum algoList {
  RECURSIVE_BACKTRACKER = "RECURSIVE_BACKTRACKER",
  PRIMS = "PRIMS",
  KRUSKALS = "KRUSKALS",
  WILSONS = "WILSONS",
}
export type algoListValues = (typeof algoList)[keyof typeof algoList];
export interface mazeT {
  CELL_SIZE: number;
  GRID_SIZE: number;
  SPEED: number;
}
