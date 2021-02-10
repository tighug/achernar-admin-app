import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeed } from "../../../store/cases";
import { AppSelect } from "../../molecule/AppSelect";
import { DialogItem } from "./DialogItem";

export function SeedSelect() {
  const { seed } = useSelector((s) => s.cases);
  const dispatch = useDispatch();

  return (
    <DialogItem icon="equalizer">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <AppSelect
            label="Seed"
            labelId="Seed"
            onChange={({ target }) => dispatch(setSeed(target.value as number))}
            options={Array.from(Array(100).keys())}
            value={seed}
          />
        </Grid>
      </Grid>
    </DialogItem>
  );
}
