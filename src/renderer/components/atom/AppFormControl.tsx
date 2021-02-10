import { FormControl, FormControlProps } from "@material-ui/core";
import React from "react";

type AppFormControlProps = FormControlProps;

export function AppFormControl({
  fullWidth = true,
  margin = "dense",
  variant = "outlined",
  ...props
}: AppFormControlProps) {
  return (
    <FormControl
      fullWidth={fullWidth}
      margin={margin}
      variant={variant}
      {...props}
    />
  );
}
