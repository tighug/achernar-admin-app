import { Grid, Input, Slider, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPvCount } from "../../../store/cases";
import { DialogItem } from "./DialogItem";

export function PvCountSlider() {
  const { pvCount } = useSelector((s) => s.cases);
  const dispatch = useDispatch();
  const { nodes } = useSelector((s) => s.nodes);
  const houseCount = nodes.filter((n) => n.hasLoad).length;

  return (
    <DialogItem icon="brightness_7">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Label>
            <Typography variant="body2" color="textSecondary">
              PV Count
            </Typography>
          </Label>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={pvCount}
            onChange={(e, v) => dispatch(setPvCount(v as number))}
            min={0}
            max={houseCount}
            step={1}
            marks={[
              { value: 0, label: "0" },
              { value: houseCount, label: String(houseCount) },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledInput
            value={pvCount}
            onChange={({ target }) =>
              dispatch(setPvCount(Number(target.value)))
            }
            inputProps={{
              step: 1,
              min: 0,
              max: houseCount,
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

const StyledInput = styled(Input)`
  margin-left: 6px;
`;
