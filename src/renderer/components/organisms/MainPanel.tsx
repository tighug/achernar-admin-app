import React, { useEffect } from "react";
import { Circle, Layer, Stage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchNodes } from "../../store/nodes";

export default function MainPanel() {
  const feeders = useSelector((state) => state.feeders);
  const nodes = useSelector((state) => state.nodes);
  const cases = useSelector((state) => state.cases);
  const dispatch = useDispatch();
  const circles = nodes.map((n, i) => (
    <Circle x={n.posX} y={n.posY} radius={2} fill="cyan" key={i} />
  ));

  useEffect(() => {
    const matchedFeeder = feeders.find(
      (f) =>
        f.networkNum === cases.networkNum && f.feederNum === cases.feederNum
    );
    if (matchedFeeder !== undefined) dispatch(fetchNodes(matchedFeeder.id));
  }, [cases.feederNum]);

  return (
    <Wrapper>
      <Stage width={900} height={600}>
        <Layer>{circles}</Layer>
      </Stage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;
