import "./canvas.css";
import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  HEXAGON_SIZE,
} from "../../constants/canvasConstants";
import GameTile from "../gameTile/GameTile";
import { Tiles } from "../../interfaces/Tile";

const Canvas: React.FC<Tiles> = ({ tiles }) => {
  const [gameTiles, setGameTiles] = useState<Set<JSX.Element>>();

  useEffect(() => {
    if (!tiles) return;
    const hexSet = new Set<JSX.Element>();

    tiles.forEach((tile, i) => {
      hexSet.forEach((hexagon) => {
        hexagon.key === `${tile.x}${tile.y}${tile.z}` && hexSet.delete(hexagon);
      });
      hexSet.add(
        <GameTile
          x={tile.x * HEXAGON_SIZE}
          y={tile.y * HEXAGON_SIZE}
          z={tile.z * HEXAGON_SIZE}
          value={tile.value}
          key={i}
        />
      );
    });

    setGameTiles(hexSet);
  }, [tiles]);

  return (
    <div id="stage-parent">
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="map">
        <Layer>{gameTiles}</Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
