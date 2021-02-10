import { ColDef, DataGrid } from "@material-ui/data-grid";
import React from "react";
import { useSelector } from "react-redux";

export type PVTableProps = {
  height: number;
};

export function PVTable({ height }: PVTableProps) {
  const { pvs } = useSelector((s) => s.loads);
  const modPVs = pvs.map(({ node, ...props }) => {
    return {
      nodeNum: node.num,
      ...props,
    };
  });
  const columns: ColDef[] = [
    { field: "nodeNum", headerName: "Node Num", type: "number", flex: 1 },
    { field: "val", headerName: "Generation [kW]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid rows={modPVs} columns={columns} pageSize={25} rowHeight={40} />
    </div>
  );
}
