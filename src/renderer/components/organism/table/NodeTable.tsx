import React from "react";
import { ColDef, DataGrid } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import { Chip } from "@material-ui/core";

export type NodeTableProps = {
  height: number;
};

export function NodeTable({ height }: NodeTableProps) {
  const { nodes } = useSelector((state) => state.nodes);
  const columns: ColDef[] = [
    { field: "num", headerName: "Num", type: "number", width: 100 },
    { field: "posX", headerName: "X [m]", type: "number", flex: 1 },
    { field: "posY", headerName: "Y [m]", type: "number", flex: 1 },
    {
      field: "hasLoad",
      headerName: "Load",
      flex: 1,
      renderCell: function load(params) {
        return (
          <Chip
            size="small"
            label={String(params.value)}
            variant="outlined"
            color={params.value ? "primary" : "default"}
            disabled={!params.value}
          />
        );
      },
    },
  ];

  return (
    <div style={{ height: `${height}px` }}>
      <DataGrid rows={nodes} columns={columns} pageSize={25} rowHeight={40} />
    </div>
  );
}
