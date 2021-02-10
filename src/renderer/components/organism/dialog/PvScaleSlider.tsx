import { Grid, Input, Slider, Typography } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setPvScale } from "../../../store/cases";
import { DialogItem } from "./DialogItem";

export function PvScaleSlider() {
  const { pvScale } = useSelector((s) => s.cases);
  const dispatch = useDispatch();

  return (
    <DialogItem icon="brightness_7">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Label>
            <Typography variant="body2" color="textSecondary">
              PV Scale
            </Typography>
          </Label>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={pvScale}
            onChange={(e, v) => dispatch(setPvScale(v as number))}
            min={0}
            max={5}
            step={0.1}
            marks={[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledInput
            value={pvScale}
            onChange={({ target }) =>
              dispatch(setPvScale(Number(target.value)))
            }
            inputProps={{
              step: 0.1,
              min: 0,
              max: 5,
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
