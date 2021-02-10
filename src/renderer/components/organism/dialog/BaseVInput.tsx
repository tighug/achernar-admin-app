import { Grid, Input, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setBaseV } from "../../../store/cases";
import { DialogItem } from "./DialogItem";

export function BaseVInput() {
  const { baseV } = useSelector((s) => s.cases);
  const dispatch = useDispatch();

  return (
    <DialogItem icon="flash_on">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Label>
            <Typography variant="body2" color="textSecondary">
              Base Voltage
            </Typography>
          </Label>
        </Grid>
        <Grid item xs={2}>
          <Input
            value={baseV}
            onChange={({ target }) => dispatch(setBaseV(Number(target.value)))}
            inputProps={{
              step: 0.1,
              min: 50,
              max: 300,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </DialogItem>
  );
}

const Label = styled.div`
  display: flex;
  height: 100%;
  margin-left: 4px;
  justify-content: flex-start;
  align-items: center;
`;
