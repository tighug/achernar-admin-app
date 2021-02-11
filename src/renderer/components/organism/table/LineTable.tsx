import { ColDef, DataGrid } from "@material-ui/data-grid";
import React from "react";
import { useSelector } from "react-redux";

export type LineTableProps = {
  height: number;
};

export function LineTable({ height }: LineTableProps) {
  const { lines } = useSelector((state) => state.lines);
  const modLines = lines.map(({ prevNode, nextNode, ...props }) => {
    return {
      prevNodeNum: prevNode.num,
      nextNodeNum: nextNode.num,
      ...props,
    };
  });
  const columns: ColDef[] = [
    { field: "prevNodeNum", headerName: "Node A", type: "number", width: 100 },
    { field: "nextNodeNum", headerName: "Node B", type: "number", width: 100 },
    { field: "phase", headerName: "Phase", type: "number", width: 100 },
    { field: "code", headerName: "Code", width: 120 },
    { field: "lengthM", headerName: "Length [m]", type: "number", flex: 1 },
    { field: "rOhmPerKm", headerName: "R [Ω/km]", type: "number", flex: 1 },
    { field: "xOhmPerKm", headerName: "X [Ω/km]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height: `${height}px` }}>
      <DataGrid
        rows={modLines}
        columns={columns}
        pageSize={25}
        rowHeight={40}
      />
    </div>
  );
}
