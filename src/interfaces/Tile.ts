export default interface Tile {
  x: number;
  y: number;
  z: number;
  value: number;
}

export interface Tiles {
  tiles: Tile[] | undefined;
}
