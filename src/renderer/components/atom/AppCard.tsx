import { Card, CardProps } from "@material-ui/core";
import React from "react";

export type AppCardProps = CardProps;

export function AppCard({ elevation = 6, ...props }: AppCardProps) {
  return (
    <Card elevation={elevation} style={{ borderRadius: "0.8rem" }} {...props} />
  );
}
