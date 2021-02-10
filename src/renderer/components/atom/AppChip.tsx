import { Chip, ChipProps } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export type AppChipProps = {
  color?: string;
} & Omit<ChipProps, "color">;

export function AppChip({ color, ...props }: AppChipProps) {
  return <StyledChip chipcolor={color} {...props} />;
}

const StyledChip = styled(Chip)<{ chipcolor?: string }>`
  color: ${({ chipcolor }) => chipcolor};
  border-color: currentColor;
`;
