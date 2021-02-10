import React from "react";
import { Layer, Circle, Line as L } from "react-konva";
import { Line, Node } from "../../../api/flowAPI";

type NetworkNodesProps = {
  nodes: Node[];
  lines: Line[];
  length: number;
  offset: number;
  minX: number;
  minY: number;
  scale: number;
};

export function NetworkNodesAndLines({
  nodes,
  lines,
  length,
  offset,
  minX,
  minY,
  scale,
}: NetworkNodesProps) {
  const modNodes = nodes.map((n) => {
    const x = offset + (n.posX - minX) * scale;
    const y = length - (n.posY - minY) * scale;
    return { x, y };
  });
  const circles = modNodes.map((n, i) => (
    <Circle
      x={n.x}
      y={n.y}
      radius={2}
      fill="cyan"
      key={i}
      perfectDrawEnabled={false}
      listening={false}
    />
  ));
  const modLines = lines.map((l) => {
    const prevNodeIndex = nodes.findIndex((n) => n.id === l.prevNode.id);
    const nextNodeIndex = nodes.findIndex((n) => n.id === l.nextNode.id);
    if (prevNodeIndex === undefined)
      throw new Error("prevNodeIndex is undefined.");
    if (nextNodeIndex === undefined)
      throw new Error("nextNodeIndex is undefined.");
    if (
      modNodes[prevNodeIndex] !== undefined &&
      modNodes[nextNodeIndex] !== undefined
    ) {
      const prevX = modNodes[prevNodeIndex].x;
      const prevY = modNodes[prevNodeIndex].y;
      const nextX = modNodes[nextNodeIndex].x;
      const nextY = modNodes[nextNodeIndex].y;
      return { prevX, prevY, nextX, nextY };
    } else {
      return { prevX: 0, prevY: 0, nextX: 0, nextY: 0 };
    }
  });
  const ls = modLines.map((l, i) => (
    <L
      points={[l.prevX, l.prevY, l.nextX, l.nextY]}
      stroke="purple"
      key={i}
      perfectDrawEnabled={false}
      listening={false}
    />
  ));

  return (
    <Layer>
      <>{ls}</>
      <>{circles}</>
    </Layer>
  );
}
