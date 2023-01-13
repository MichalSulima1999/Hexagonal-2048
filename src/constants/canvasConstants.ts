import Orientation from "../classes/Orientation";

export const CANVAS_WIDTH: number = 800;
export const CANVAS_HEIGHT: number = 640;
export const HEXAGON_SIZE: number = 40;
export const LAYOUT_FLAT = new Orientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.0
);
