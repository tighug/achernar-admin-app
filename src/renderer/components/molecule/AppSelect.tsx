import { InputLabel, MenuItem, Select, SelectProps } from "@material-ui/core";
import React from "react";
import { AppFormControl } from "../atom/AppFormControl";

export type AppSelectProps = {
  options: Array<number | string>;
  nullable?: boolean;
} & SelectProps;

export function AppSelect({
  nullable = false,
  label,
  labelId,
  onChange,
  options,
  value,
  ...props
}: AppSelectProps) {
  return (
    <AppFormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={onChange}
        label={label}
        {...props}
      >
        {nullable && <MenuItem value={undefined}>None</MenuItem>}
        {options.map((n) => (
          <MenuItem value={n} key={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </AppFormControl>
  );
}
