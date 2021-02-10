import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHour, setMinute } from "../../../store/cases";
import { AppSelect } from "../../molecule/AppSelect";
import { DialogItem } from "./DialogItem";

export function TimeSelect() {
  const { hour, minute } = useSelector((s) => s.cases);
  const dispatch = useDispatch();

  return (
    <DialogItem icon="access_time">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <AppSelect
            label="Hour"
            labelId="Hour"
            onChange={({ target }) => dispatch(setHour(target.value as number))}
            options={Array.from(Array(24).keys())}
            value={hour}
          />
        </Grid>
        <Grid item xs={6}>
          <AppSelect
            label="Minute"
            labelId="Minute"
            onChange={({ target }) =>
              dispatch(setMinute(target.value as number))
            }
            options={Array.from(Array(12).keys(), (x) => x * 5)}
            value={minute}
          />
        </Grid>
      </Grid>
    </DialogItem>
  );
}
