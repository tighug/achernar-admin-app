import React from "react";
import { Layer, Line, Text } from "react-konva";

export type NetworkAxesProps = {
  children?: never;
  offset: number;
  length: number;
  minX: number;
  minY: number;
  scale: number;
};

export default function NetworkAxes({
  offset,
  length,
  minX,
  minY,
  scale,
}: NetworkAxesProps) {
  const xAxis = (
    <Line x={offset} y={length} points={[0, 0, length, 0]} stroke="#808080" />
  );
  const yAxis = (
    <Line x={offset} y={0} points={[0, 0, 0, length]} stroke="#808080" />
  );
  const xLabel = (
    <Text
      text="[m]"
      fill="#808080"
      fontSize={16}
      x={offset + length / 2}
      y={length}
      width={30}
      offsetX={15}
      offsetY={-35}
    />
  );
  const yLabel = (
    <Text
      text="[m]"
      fill="#808080"
      fontSize={16}
      x={offset}
      y={length / 2}
      align="right"
      width={30}
      offsetX={75}
    />
  );

  const subXAxes = () => {
    const subXAxisNums = [];
    for (let i = 0; (i - minY) * scale <= length; i += 50) {
      if (i >= minY) subXAxisNums.push(i);
    }
    return subXAxisNums.map((n, i) => (
      <>
        <Line
          x={offset}
          y={length - (n - minY) * scale}
          points={[0, 0, length, 0]}
          stroke="#303030"
          key={i}
        />
        <Text
          text={String(n)}
          fill="#808080"
          fontSize={16}
          x={offset}
          y={length - (n - minY) * scale}
          align="right"
          width={30}
          offsetX={40}
          offsetY={6}
        />
      </>
    ));
  };
  const subYAxes = () => {
    const subYAxisNums = [];
    for (let i = 0; (i - minX) * scale <= length; i += 50) {
      if (i >= minX) subYAxisNums.push(i);
    }
    return subYAxisNums.map((n, i) => (
      <>
        <Line
          x={offset + (n - minX) * scale}
          y={0}
          points={[0, 0, 0, length]}
          stroke="#303030"
          key={i}
        />
        <Text
          text={String(n)}
          fill="#808080"
          fontSize={16}
          x={offset + (n - minX) * scale}
          y={length}
          align="center"
          width={30}
          offsetX={15}
          offsetY={-10}
        />
      </>
    ));
  };

  return (
    <Layer>
      {subXAxes()}
      {subYAxes()}
      {xLabel}
      {yLabel}
      {xAxis}
      {yAxis}
    </Layer>
  );
}
