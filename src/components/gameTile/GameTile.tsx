import React from "react";
import { Group, Shape, Text } from "react-konva";
import Point from "../../classes/Point";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  HEXAGON_SIZE,
  LAYOUT_FLAT,
} from "../../constants/canvasConstants";
import Tile from "../../interfaces/Tile";

const GameTile: React.FC<Tile> = (props: Tile) => {
  const orientation = LAYOUT_FLAT;

  const x = orientation.f0 * props.x + orientation.f1 * props.z;
  const y = orientation.f2 * props.x + orientation.f3 * props.z;
  const canvasCenter = new Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  const pointyHexCorner = (i: number) => {
    const angle = (Math.PI / 180) * 60 * i;
    const point = {
      x: x + canvasCenter.x + HEXAGON_SIZE * Math.cos(angle),
      y: y + canvasCenter.y + HEXAGON_SIZE * Math.sin(angle),
    };

    return point;
  };

  const getColor = (value: number) => {
    if (value < 1) {
      return "#ffffff";
    }
    return hslToHex(20 + 24 * Math.log2(2048 / value), 100, 50);
  };

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  return (
    <Group name="group">
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(pointyHexCorner(0).x, pointyHexCorner(0).y);
          context.lineTo(pointyHexCorner(1).x, pointyHexCorner(1).y);
          context.lineTo(pointyHexCorner(2).x, pointyHexCorner(2).y);
          context.lineTo(pointyHexCorner(3).x, pointyHexCorner(3).y);
          context.lineTo(pointyHexCorner(4).x, pointyHexCorner(4).y);
          context.lineTo(pointyHexCorner(5).x, pointyHexCorner(5).y);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        fill={getColor(props.value)}
        stroke="black"
        strokeWidth={2}
      />
      <Text
        align="center"
        fontSize={16}
        fontFamily="Calibri"
        x={x + canvasCenter.x}
        y={y + canvasCenter.y}
        text={props.value + ""}
      />
    </Group>
  );
};

export default GameTile;
