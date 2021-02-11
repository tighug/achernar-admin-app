import { ColDef, DataGrid } from "@material-ui/data-grid";
import React from "react";
import { useSelector } from "react-redux";

export type LoadTableProps = {
  height: number;
};

export function LoadTable({ height }: LoadTableProps) {
  const { loads } = useSelector((s) => s.loads);
  const modLoads = loads.map(({ node, ...props }) => {
    return { nodeNum: node.num, ...props };
  });
  const columns: ColDef[] = [
    { field: "nodeNum", headerName: "Node Num", type: "number", flex: 1 },
    { field: "val", headerName: "Consumption [kW]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid
        rows={modLoads}
        columns={columns}
        pageSize={25}
        rowHeight={40}
      />
    </div>
  );
}
