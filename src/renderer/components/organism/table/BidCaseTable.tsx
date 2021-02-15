import { useTheme } from "@material-ui/core";
import { ColDef, DataGrid, ValueFormatterParams } from "@material-ui/data-grid";
import { Delete, PlayCircleOutline } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppChip } from "../../atom/AppChip";
import AppIconButton from "../../atom/AppIconButton";
import { removeBidCase, simulateBidCase } from "../../../store/bidCases";

export type BidCaseTableProps = {
  height: number;
};

export function BidCaseTable({ height }: BidCaseTableProps) {
  const theme = useTheme();
  const { bidCases } = useSelector((s) => s.bidCases);
  const dispatch = useDispatch();
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
              dispatch(simulateBidCase(params.getValue("id") as number))
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
        onClick={() => dispatch(removeBidCase(params.getValue("id") as number))}
      >
        <Delete />
      </AppIconButton>
    );
  };

  const columns: ColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "buyerCount", headerName: "Buyer Count", flex: 1 },
    { field: "sellerCount", headerName: "Seller Count", flex: 1 },
    { field: "minBuyPrice", headerName: "Min Buy Price", flex: 1 },
    { field: "maxBuyPrice", headerName: "Max Buy Price ", flex: 1 },
    { field: "minSellPrice", headerName: "Min Sell Price", flex: 1 },
    { field: "maxSellPrice", headerName: "Max Sell Price", flex: 1 },
    { field: "minBuyVolume", headerName: "Min Buy Volume", flex: 1 },
    { field: "maxBuyVolume", headerName: "Max Buy Volume", flex: 1 },
    { field: "minSellVolume", headerName: "Min Sell Volume", flex: 1 },
    { field: "maxSellVolume", headerName: "Max Sell Volume", flex: 1 },
    { field: "agreedPrice", headerName: "Agreed Price", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: renderStatus,
    },
    { field: "Delete", flex: 1, renderCell: renderDelete },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height: `${height}px` }}>
      <DataGrid
        rows={bidCases}
        columns={columns}
        pageSize={25}
        rowHeight={40}
      />
    </div>
  );
}
