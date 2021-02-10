import { Button, ButtonProps } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export type AppButtonProps = ButtonProps;

export function AppButton({ ...props }: AppButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled(Button)`
  letter-spacing: 0.09em;
`;
