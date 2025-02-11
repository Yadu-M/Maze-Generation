import { LINE_WIDTH } from "./config";
import type { directionT } from "./types";

export class Cell {
  private readonly x;
  private readonly y;
  private parent: Cell | null;
  private children: Cell[] | null;
  private CELL_SIZE = 20;
  private neighbours: Cell[] = [];
  private COLOR = "aqua";
  private visited = false;
  private walls: {
    [K in directionT]: boolean;
  } = {
    East: true,
    North: true,
    South: true,
    West: true,
  };

  constructor(x: number, y: number, cellSize: number, color: string) {
    this.x = x;
    this.y = y;
    this.CELL_SIZE = cellSize;
    this.COLOR = color;
    this.parent = null;
    this.children = [];
  }

  addChild(child: Cell) {
    this.children?.push(child);
    child.parent = this;
  }

  isLink(cell: Cell) {
    return this.children?.includes(cell) || this.parent === cell;
  }

  addNeighbour(neighbourCell: Cell | null | undefined) {
    // parent: Cell
    if (neighbourCell) this.neighbours.push(neighbourCell);
    return this;
  }

  getNeighbours() {
    return this.neighbours;
  }

  getParent() {
    return this.parent;
  }

  getVisited() {
    return this.visited;
  }

  setVisited(value: boolean) {
    this.visited = value;
  }

  getRelativeWallDir(cell: Cell): directionT | null {
    if (cell.x > this.x) return "East";
    else if (cell.x < this.x) return "West";

    if (cell.y > this.y) return "South";
    else if (cell.y < this.y) return "North";

    return null;
  }

  draw({
    ctx,
    speed = 100,
    color = this.COLOR,
  }: {
    ctx: CanvasRenderingContext2D;
    speed?: number;
    color?: string;
  }): Promise<this> {
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(
          this.CELL_SIZE * this.x + 1,
          this.CELL_SIZE * this.y + 1,
          this.CELL_SIZE - LINE_WIDTH,
          this.CELL_SIZE - LINE_WIDTH
        );
        ctx.fill();
        ctx.closePath();
        resolve(this);
      }, speed);
    });
  }

  removeWall({
    wall,
    ctx,
    color = this.COLOR,
  }: {
    wall: directionT;
    ctx: CanvasRenderingContext2D;
    color?: string;
  }) {
    if (!this.walls[wall]) return;
    this.walls[wall] = true;

    ctx.beginPath();
    ctx.fillStyle = color;

    switch (wall) {
      case "North":
        ctx.rect(
          this.x * this.CELL_SIZE + 1,
          this.y * this.CELL_SIZE - 1,
          this.CELL_SIZE - LINE_WIDTH,
          LINE_WIDTH
        );
        break;
      case "East":
        ctx.rect(
          (this.x + 1) * this.CELL_SIZE - 1,
          this.y * this.CELL_SIZE + 1,
          LINE_WIDTH,
          this.CELL_SIZE - LINE_WIDTH
        );
        break;
      case "South":
        ctx.rect(
          this.x * this.CELL_SIZE + 1,
          (this.y + 1) * this.CELL_SIZE - 1,
          this.CELL_SIZE - LINE_WIDTH,
          LINE_WIDTH
        );
        break;
      case "West":
        ctx.rect(
          this.x * this.CELL_SIZE - 1,
          this.y * this.CELL_SIZE + 1,
          LINE_WIDTH,
          this.CELL_SIZE - LINE_WIDTH
        );
        break;

      default:
        break;
    }

    ctx.fill();
    ctx.closePath();
    return this;
  }
}
