import React from "react";
import { Circle } from "react-konva";

export type NetworkNodeProps = {
  x: number;
  y: number;
  radius: number;
  color: string;
};

export function NetworkNode({ x, y, radius, color }: NetworkNodeProps) {
  return (
    <Circle
      x={x}
      y={y}
      radius={radius}
      fill={color}
      shadowForStrokeEnabled={false}
      hitStrokeWidth={0}
      perfectDrawEnabled={false}
      listening={false}
    />
  );
}
