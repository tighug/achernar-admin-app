import React, { useEffect, useState } from "react";
import { Stage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchLines } from "../../store/lines";
import { fetchNodes } from "../../store/nodes";
import NetworkAxes from "./NetworkAxes";
import NetworkNodesAndLines from "./NetworkNodesAndLines";

const length = 580;
const offset = 70;

type NetworkDiagramProps = {
  children?: never;
  width: number;
  height: number;
};

export default function NetworkDiagram({ width, height }: NetworkDiagramProps) {
  const [feederId, setFeederId] = useState(1);
  const feeders = useSelector((state) => state.feeders);
  const nodes = useSelector((state) => state.nodes);
  const lines = useSelector((state) => state.lines);
  const cases = useSelector((state) => state.cases);
  const dispatch = useDispatch();

  const posXs = nodes.map((n) => n.posX);
  const posYs = nodes.map((n) => n.posY);
  const maxX = Math.max(...posXs);
  const minX = Math.min(...posXs);
  const maxY = Math.max(...posYs);
  const minY = Math.min(...posYs);
  const maxW = maxX - minX;
  const maxH = maxY - minY;
  const scale = maxW >= maxH ? length / maxW : length / maxH;

  useEffect(() => {
    const matchedFeeder = feeders.find(
      (f) =>
        f.networkNum === cases.networkNum && f.feederNum === cases.feederNum
    );
    if (matchedFeeder !== undefined) setFeederId(matchedFeeder.id);
  }, [cases.networkNum, cases.feederNum]);

  useEffect(() => {
    dispatch(fetchNodes(feederId));
    dispatch(fetchLines(feederId));
  }, [feederId]);

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
  padding: 50px;
`;
