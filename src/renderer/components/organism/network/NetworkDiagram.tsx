import React from "react";
import { Stage } from "react-konva";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NetworkAxes } from "./NetworkAxes";
import { NetworkNodesAndLines } from "./NetworkNodesAndLines";

const length = 450;
const offset = 70;

type NetworkDiagramProps = {
  children?: never;
  width: number;
  height: number;
};

export function NetworkDiagram({ width, height }: NetworkDiagramProps) {
  const { nodes } = useSelector((state) => state.nodes);
  const { lines } = useSelector((state) => state.lines);

  const posXs = nodes.map((n) => n.posX);
  const posYs = nodes.map((n) => n.posY);
  const [minX, maxX] = [Math.min(...posXs), Math.max(...posXs)];
  const [minY, maxY] = [Math.min(...posYs), Math.max(...posYs)];
  const maxW = maxX - minX;
  const maxH = maxY - minY;
  const scale = maxW >= maxH ? length / maxW : length / maxH;

  return (
    <StyledStage width={width} height={height}>
      <NetworkAxes
        offset={offset}
        length={length}
        minX={minX}
        minY={minY}
        scale={scale}
      />
      <NetworkNodesAndLines
        nodes={nodes}
        lines={lines}
        length={length}
        offset={offset}
        minX={minX}
        minY={minY}
        scale={scale}
      />
    </StyledStage>
  );
}

const StyledStage = styled(Stage)`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;
