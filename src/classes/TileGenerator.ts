import Tile from "../interfaces/Tile";

export default class TileGenerator {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public initMap(): Tile[] {
    const hexSet = new Set<Tile>();
    for (let q = -this.radius; q <= this.radius; q++) {
      const r1 = Math.max(-this.radius, -q - this.radius);
      const r2 = Math.min(this.radius, -q + this.radius);
      for (let r = r1; r <= r2; r++) {
        const y = -q - r;
        hexSet.add({
          x: q,
          y: y,
          z: r,
          value: 0,
        });
      }
    }
    const hexArray = Array.from(hexSet);
    this.shuffleArray(hexArray);
    for (let i = 0; i < 3; i++) {
      hexArray[i].value = 2;
    }
    return hexArray;
  }

  public fetchNewTiles(tileMap: Tile[]): Tile[] {
    this.shuffleArray(tileMap);
    const index = tileMap.findIndex((tile) => tile.value === 0);
    if (index === -1) {
      return tileMap;
    }

    if (Math.random() > 0.1) {
      tileMap[index].value = 2;
    } else {
      tileMap[index].value = 4;
    }
    return tileMap;
  }

  private shuffleArray(array: Tile[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
