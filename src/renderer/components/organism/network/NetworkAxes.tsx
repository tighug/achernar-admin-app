import React from "react";
import { Layer, Line, Text } from "react-konva";
import { DefaultTheme } from "styled-components";

export type NetworkAxesProps = {
  children?: never;
  offset: number;
  length: number;
  minX: number;
  minY: number;
  scale: number;
  theme: DefaultTheme;
};

export function NetworkAxes({
  offset,
  length,
  minX,
  minY,
  scale,
  theme,
}: NetworkAxesProps) {
  const textColor = theme.palette.text.disabled;
  const axisColor = theme.palette.text.disabled;
  const subAxisColor = theme.palette.action.disabledBackground;
  const xAxis = (
    <Line x={offset} y={length} points={[0, 0, length, 0]} stroke={axisColor} />
  );
  const yAxis = (
    <Line x={offset} y={0} points={[0, 0, 0, length]} stroke={axisColor} />
  );
  const xLabel = (
    <Text
      text="[m]"
      fill={textColor}
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
      fill={textColor}
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
    const subXAxes = subXAxisNums.map((n, i) => (
      <Line
        x={offset}
        y={length - (n - minY) * scale}
        points={[0, 0, length, 0]}
        stroke={subAxisColor}
        key={i}
      />
    ));
    const subXLabels = subXAxisNums.map((n, i) => (
      <Text
        text={String(n)}
        fill={textColor}
        fontSize={16}
        x={offset}
        y={length - (n - minY) * scale}
        align="right"
        width={30}
        offsetX={40}
        offsetY={6}
        key={i}
      />
    ));
    return [subXAxes, subXLabels];
  };
  const subYAxes = () => {
    const subYAxisNums = [];
    for (let i = 0; (i - minX) * scale <= length; i += 50) {
      if (i >= minX) subYAxisNums.push(i);
    }
    const subYAxes = subYAxisNums.map((n, i) => (
      <Line
        x={offset + (n - minX) * scale}
        y={0}
        points={[0, 0, 0, length]}
        stroke={subAxisColor}
        key={i}
      />
    ));
    const subYLabels = subYAxisNums.map((n, i) => (
      <Text
        text={String(n)}
        fill={textColor}
        fontSize={16}
        x={offset + (n - minX) * scale}
        y={length}
        align="center"
        width={30}
        offsetX={15}
        offsetY={-10}
        key={i}
      />
    ));
    return [subYAxes, subYLabels];
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
