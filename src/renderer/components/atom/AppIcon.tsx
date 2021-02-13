import { Icon, IconProps } from "@material-ui/core";
import React from "react";
import classnames from "classnames";
import styled from "styled-components";

export type AppIconProps = {
  left?: boolean;
  right?: boolean;
  color?: string;
} & Omit<IconProps, "color">;

export function AppIcon({
  left = false,
  right = false,
  color,
  ...props
}: AppIconProps) {
  const className = classnames({ right, left });

  return <StyledIcon className={className} iconcolor={color} {...props} />;
}

const StyledIcon = styled(Icon)<{ iconcolor?: string }>`
  color: ${({ iconcolor }) => iconcolor};
  &.right {
    width: 1em;
    height: 1em;
    margin-right: -4px;
    margin-left: 8px;
  }

  &.left {
    width: 1em;
    height: 1em;
    margin-right: 8px;
    margin-left: -4px;
  }
`;
