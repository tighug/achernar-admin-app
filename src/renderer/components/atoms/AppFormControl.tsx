import { FormControl } from "@material-ui/core";
import React, { ReactNode } from "react";

type AppFormControlProps = {
  children?: ReactNode;
};

export default function AppFormControl({ children }: AppFormControlProps) {
  return (
    <FormControl variant="outlined" margin="dense" fullWidth>
      {children}
    </FormControl>
  );
}
