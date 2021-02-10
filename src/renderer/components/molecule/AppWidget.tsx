import { CardContent, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import React, { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import classnames from "classnames";
import { AppCard } from "../atom/AppCard";
import { AppRipples } from "../atom/AppRipples";

export type AppWidgetProps = {
  active?: boolean;
  ripple?: boolean;

  children: ReactNode;
  color?: string;
  icon?: string;
  onClick?: MouseEventHandler;
  title: string;
};

export function AppWidget({
  active = false,
  ripple = true,
  children,
  color,
  icon = "help",
  onClick,
  title,
}: AppWidgetProps) {
  const className = classnames({ active });
  return (
    <AppRipples disabled={!ripple}>
      <StyledAppCard className={className} onClick={onClick}>
        <StyledContent>
          <Left>
            <StyledIcon iconcolor={color}>{icon}</StyledIcon>
          </Left>
          <Right>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="h4">{children}</Typography>
          </Right>
        </StyledContent>
      </StyledAppCard>
    </AppRipples>
  );
}

const StyledAppCard = styled(AppCard)`
  position: relative;
  cursor: pointer;

  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: inherit;
    opacity: 0;
  }

  &:hover:before {
    opacity: 0.1;
  }

  &.active {
    &:before {
      opacity: 0.14;
    }
  }
`;

const StyledContent = styled(CardContent)`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const Right = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const StyledIcon = styled(Icon)<{ iconcolor?: string }>`
  color: ${(props) => props.iconcolor};
  font-size: 56px;
`;
