import { FormControl } from "@material-ui/core";
import React, { ReactNode } from "react";

type AppFormControlProps = {
  children?: ReactNode;
};

export function AppFormControl({ children }: AppFormControlProps) {
  return (
    <FormControl variant="filled" margin="dense" fullWidth>
      {children}
    </FormControl>
  );
}
