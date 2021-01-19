import React from "react";
import styled from "styled-components";
import NetworkDiagram from "./NetworkDiagram";

export default function MainPanel() {
  return (
    <Wrapper>
      <NetworkDiagram width={650} height={650} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  min-width: 650px;
  background: #202020;
`;
