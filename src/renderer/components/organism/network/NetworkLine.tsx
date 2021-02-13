import React from "react";
import { Line } from "react-konva";

export type NetworkLineProps = {
  points: number[];
  color: string;
};

export function NetworkLine({ color, points }: NetworkLineProps) {
  return (
    <Line
      points={points}
      stroke={color}
      shadowForStrokeEnabled={false}
      hitStrokeWidth={0}
      perfectDrawEnabled={false}
      listening={false}
    />
  );
}
