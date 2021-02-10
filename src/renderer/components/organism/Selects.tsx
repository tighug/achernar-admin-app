import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setFeeder } from "../../store/feeders";
import { AppSelect } from "../molecule/AppSelect";

export default function Selects() {
  const { networkNums, feederNums, feeder } = useSelector((s) => s.feeders);
  const dispatch = useDispatch();

  return (
    <Grid container justify="flex-end" spacing={2}>
      <Grid item xs={2}>
        <AppSelect
          label="Network"
          labelId="Network"
          onChange={({ target }) =>
            dispatch(setFeeder([Number(target.value), 1]))
          }
          options={networkNums}
          value={feeder.networkNum}
        />
      </Grid>
      <Grid item xs={2}>
        <AppSelect
          label="Feeder"
          labelId="Feeder"
          onChange={({ target }) =>
            dispatch(setFeeder([feeder.networkNum, Number(target.value)]))
          }
          options={feederNums}
          value={feeder.feederNum}
        />
      </Grid>
    </Grid>
  );
}
