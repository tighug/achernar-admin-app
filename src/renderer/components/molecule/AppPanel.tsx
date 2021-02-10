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
};

export function AppPanel({ action, children, icon, color, title }: PanelProps) {
  const renderIcon = icon && <StyledIcon iconcolor={color}>{icon}</StyledIcon>;
  return (
    <AppCard>
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

const StyledIcon = styled(AppIcon)<{ iconcolor?: string }>`
  color: ${(props) => props.iconcolor};
  margin-right: 10px;
`;

const Title = styled.div`
  flex-grow: 1;
`;
