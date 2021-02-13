import {
  blue,
  cyan,
  green,
  grey,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";
import React from "react";
import { Layer } from "react-konva";
import { Flow, Line, Load } from "../../../api/flowAPI";
import { colorGradient } from "../../../util/colorGradient";
import { DiagramState } from "../../../store/diagrams";
import { NetworkNode } from "./NetworkNode";
import { NetworkLine } from "./NetworkLine";
import { NetworkFeeder } from "./NetworkFeeder";
import { DefaultTheme } from "styled-components";

type ModNode = {
  id: number;
  num: number;
  x: number;
  y: number;
};

type NetworkNodesProps = {
  modNodes: ModNode[];
  lines: Line[];
  loads: Load[];
  pvs: Load[];
  flows: Flow[];
  diagramState: DiagramState;
  theme: DefaultTheme;
};

export function NetworkNodesAndLines({
  modNodes,
  lines,
  loads,
  pvs,
  flows,
  diagramState,
  theme,
}: NetworkNodesProps) {
  const feederColor = teal[500];
  const loadColor = yellow[500];
  const pvColor = green[500];
  const pLineColor = pink[500];
  const zeroLineColor = theme.palette.background.paper;
  const nLineColor = blue[500];
  const defaultLineColor = theme.palette.primary.dark;
  const pViolationColor = red[500];
  const nViolationColor = cyan[500];
  const { minV, maxV, gradation, strength, visibility } = diagramState;
  const nodeR = 3;

  const networkFeeder = (x: number, y: number) => (
    <NetworkFeeder x={x} y={y} width={8} color={feederColor} />
  );

  const networkNodes = modNodes.map(({ id, num, x, y }, i) => {
    if (num === 1) return networkFeeder(x, y);

    const color = () => {
      if (visibility.pv && pvs.find((pv) => pv.node.id === id)) {
        return pvColor;
      }

      if (visibility.load && loads.find((l) => l.node.id === id)) {
        return loadColor;
      }

      const flow = flows.find((f) => f.line.nextNode.id === id);
      if (visibility.violation && flow) {
        if (flow.nextNodeV > maxV) return pViolationColor;
        if (flow.nextNodeV < minV) return nViolationColor;
      }

      return;
    };

    const c = color();

    return c && <NetworkNode x={x} y={y} radius={nodeR} color={c} key={i} />;
  });

  const networkLines = lines.map((l, i) => {
    const prevNode = modNodes.find((n) => n.id === l.prevNode.id);
    const nextNode = modNodes.find((n) => n.id === l.nextNode.id);

    if (!(prevNode && nextNode)) return;

    const points = [prevNode.x, prevNode.y, nextNode.x, nextNode.y];

    const color = () => {
      const flow = flows.find((f) => f.line.id === l.id);

      if (!flow) return defaultLineColor;
      if (flow.lineI === 0) return "";

      if (gradation === "bicolor")
        return flow.lineI < 0 ? pLineColor : nLineColor;
      else {
        let fade = (flow.lineI + strength) / strength / 2;
        if (fade < 0) fade = 0;
        else if (fade > 1) fade = 1;
        return colorGradient(fade, pLineColor, zeroLineColor, nLineColor);
      }
    };

    return <NetworkLine points={points} color={color()} key={i} />;
  });

  return (
    <>
      {visibility.line && <Layer>{networkLines}</Layer>}
      <Layer>{networkNodes}</Layer>
    </>
  );
}
