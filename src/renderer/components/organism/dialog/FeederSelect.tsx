import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { AppSelect } from "../../molecule/AppSelect";
import { DialogItem } from "./DialogItem";

export function FeederSelect() {
  const { feeder } = useSelector((s) => s.feeders);

  return (
    <DialogItem icon="timeline">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <AppSelect
            label="Network"
            labelId="Network"
            options={[feeder.networkNum]}
            value={feeder.networkNum}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <AppSelect
            label="Feeder"
            labelId="Feeder"
            options={[feeder.feederNum]}
            value={feeder.feederNum}
            disabled
          />
        </Grid>
      </Grid>
    </DialogItem>
  );
}
