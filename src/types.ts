export type gridT = {
  ctx: CanvasRenderingContext2D
  readonly rowColCount: number
  readonly cellSize: number
  cells: cellT[][]
}

export type cellT = {
  state: boolean
  readonly x: number
  readonly y: number
}

// export type dir = "North" | "East" | "South" | "West"