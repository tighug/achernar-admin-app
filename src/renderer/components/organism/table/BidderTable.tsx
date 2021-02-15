import { ColDef, DataGrid } from "@material-ui/data-grid";
import React from "react";
import { useSelector } from "react-redux";

export type BuyerTableProps = {
  height: number;
};

export function BuyerTable({ height }: BuyerTableProps) {
  const buyers = useSelector((s) => s.bidders.bidders)
    .filter((b) => b.type === "buyer")
    .map(({ node, ...props }) => {
      return { nodeNum: node.num, ...props };
    });

  const columns: ColDef[] = [
    { field: "id", headerName: "ID", type: "number", width: 100 },
    { field: "nodeNum", headerName: "Node Num", type: "number", width: 100 },
    { field: "price", headerName: "Price [Yen]", type: "number", flex: 1 },
    { field: "volume", headerName: "Volume [W]", type: "number", flex: 1 },
    { field: "agreed", headerName: "Agreed [W]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid rows={buyers} columns={columns} pageSize={25} rowHeight={40} />
    </div>
  );
}

export type SellerTableProps = {
  height: number;
};

export function SellerTable({ height }: SellerTableProps) {
  const sellers = useSelector((s) => s.bidders.bidders)
    .filter((b) => b.type === "seller")
    .map(({ node, ...props }) => {
      return { nodeNum: node.num, ...props };
    });

  const columns: ColDef[] = [
    { field: "id", headerName: "ID", type: "number", width: 100 },
    { field: "nodeNum", headerName: "Node Num", type: "number", width: 100 },
    { field: "price", headerName: "Price [Yen]", type: "number", flex: 1 },
    { field: "volume", headerName: "Volume [W]", type: "number", flex: 1 },
    { field: "agreed", headerName: "Agreed [W]", type: "number", flex: 1 },
  ].map((column) => {
    return { ...column, disableClickEventBubbling: true };
  });

  return (
    <div style={{ height }}>
      <DataGrid rows={sellers} columns={columns} pageSize={25} rowHeight={40} />
    </div>
  );
}
