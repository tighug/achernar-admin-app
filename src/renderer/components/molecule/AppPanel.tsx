import { CardContent, Toolbar, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { AppCard } from "../atom/AppCard";
import { AppIcon } from "../atom/AppIcon";

export type PanelProps = {
  action?: ReactNode;
  children: ReactNode;
  color?: string;
  icon?: string;
  title?: string;
  height?: string;
};

export function AppPanel({
  action,
  children,
  icon,
  color,
  title,
  height,
}: PanelProps) {
  const renderIcon = icon && <AppIcon color={color}>{icon}</AppIcon>;
  return (
    <AppCard style={{ height: height }}>
      {title && (
        <Toolbar>
          {renderIcon}
          <Title>
            <Typography variant="h6">{title}</Typography>
          </Title>
          {action}
        </Toolbar>
      )}
      <CardContent>{children}</CardContent>
    </AppCard>
  );
}

const Title = styled.div`
  margin-left: 10px;
  flex-grow: 1;
`;
