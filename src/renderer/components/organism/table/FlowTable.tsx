import { ColDef, DataGrid } from "@material-ui/data-grid";
import React from "react";
import { useSelector } from "react-redux";

export type FlowTableProps = {
  height: number;
};

export function BeforeFlowTable({ height }: FlowTableProps) {
  const { beforeFlows: flows } = useSelector((s) => s.flows);
  const modFlows = flows.map(({ line, ...props }) => {
    return { nodeNum: line.nextNode.num, ...props };
  });
  const columns: ColDef[] = [
    { field: "nodeNum", headerName: "Node Num", type: "number", flex: 1 },
    { field: "nextNodeP", headerName: "P [W]", type: "number", flex: 1 },
    { field: "nextNodeV", headerName: "V [V]", type: "number", flex: 1 },
    { field: "lineI", headerName: "Line I [A]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid
        rows={modFlows}
        columns={columns}
        pageSize={25}
        rowHeight={40}
      />
    </div>
  );
}

export function AfterFlowTable({ height }: FlowTableProps) {
  const { afterFlows: flows } = useSelector((s) => s.flows);
  const modFlows = flows.map(({ line, ...props }) => {
    return { nodeNum: line.nextNode.num, ...props };
  });
  const columns: ColDef[] = [
    { field: "nodeNum", headerName: "Node Num", type: "number", flex: 1 },
    { field: "nextNodeP", headerName: "P [W]", type: "number", flex: 1 },
    { field: "nextNodeV", headerName: "V [V]", type: "number", flex: 1 },
    { field: "lineI", headerName: "Line I [A]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid
        rows={modFlows}
        columns={columns}
        pageSize={25}
        rowHeight={40}
      />
    </div>
  );
}

export function FixedFlowTable({ height }: FlowTableProps) {
  const { fixedFlows: flows } = useSelector((s) => s.flows);
  const modFlows = flows.map(({ line, ...props }) => {
    return { nodeNum: line.nextNode.num, ...props };
  });
  const columns: ColDef[] = [
    { field: "nodeNum", headerName: "Node Num", type: "number", flex: 1 },
    { field: "nextNodeP", headerName: "P [W]", type: "number", flex: 1 },
    { field: "nextNodeV", headerName: "V [V]", type: "number", flex: 1 },
    { field: "lineI", headerName: "Line I [A]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid
        rows={modFlows}
        columns={columns}
        pageSize={25}
        rowHeight={40}
      />
    </div>
  );
}
