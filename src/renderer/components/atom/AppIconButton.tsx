import { IconButton, IconButtonProps } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export type AppIconButtonProps = {
  color?: string;
} & Omit<IconButtonProps, "color">;

export default function AppIconButton({ color, ...props }: AppIconButtonProps) {
  return <StyledIconButton fontcolor={color} {...props} />;
}

const StyledIconButton = styled(IconButton)<{ fontcolor?: string }>`
  color: ${({ fontcolor }) => fontcolor};
`;
