import { ColDef, DataGrid, ValueFormatterParams } from "@material-ui/data-grid";
import { Delete, PlayCircleOutline } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { removeCase, simulateCase } from "../../../store/cases";
import { AppChip } from "../../atom/AppChip";
import AppIconButton from "../../atom/AppIconButton";

export type CaseTableProps = {
  height: number;
};

export function CaseTable({ height }: CaseTableProps) {
  const theme = useTheme();
  const { cases } = useSelector((s) => s.cases);
  const dispatch = useDispatch();
  const formatTime = (num: number) => ("0" + num).slice(-2);
  const renderStatus = (params: ValueFormatterParams) => {
    const status = params.value as string;
    const color = () => {
      switch (status) {
        case "waiting":
          return theme.palette.info.main;
        case "active":
          return theme.palette.warning.main;
        case "completed":
          return theme.palette.success.main;
        case "failed":
          return theme.palette.error.main;
      }
    };
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <AppChip
          size="small"
          label={status === "active" ? "in processing" : status}
          variant="outlined"
          color={color()}
        />
        {status === "waiting" && (
          <AppIconButton
            size="small"
            color={theme.palette.primary.main}
            onClick={() =>
              dispatch(simulateCase(params.getValue("id") as number))
            }
          >
            <PlayCircleOutline />
          </AppIconButton>
        )}
      </div>
    );
  };
  const renderDelete = (params: ValueFormatterParams) => {
    return (
      <AppIconButton
        size="small"
        color={theme.palette.error.dark}
        onClick={() => dispatch(removeCase(params.getValue("id") as number))}
      >
        <Delete />
      </AppIconButton>
    );
  };

  const columns: ColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      valueGetter: (params: ValueFormatterParams) =>
        `${formatTime(params.getValue("hour") as number)}:${formatTime(
          params.getValue("minute") as number
        )}`,
    },
    { field: "pvCount", headerName: "PV Count", type: "number", flex: 1 },
    { field: "pvScale", headerName: "PV Scale", type: "number", flex: 1 },
    { field: "loadScale", headerName: "Load Scale", type: "number", flex: 1 },
    { field: "seed", headerName: "Seed", type: "number", flex: 1 },
    { field: "baseV", headerName: "Base V", type: "number", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: renderStatus,
    },
    { field: "Delete", flex: 1, renderCell: renderDelete },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height: `${height}px` }}>
      <DataGrid rows={cases} columns={columns} pageSize={25} rowHeight={40} />
    </div>
  );
}
