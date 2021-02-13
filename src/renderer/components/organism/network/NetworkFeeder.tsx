import React from "react";
import { Rect } from "react-konva";

export type NetworkFeederProps = {
  x: number;
  y: number;
  width: number;
  color: string;
};

export function NetworkFeeder({ x, y, width, color }: NetworkFeederProps) {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={width}
      fill={color}
      shadowForStrokeEnabled={false}
      hitStrokeWidth={0}
      perfectDrawEnabled={false}
      listening={false}
    />
  );
}
