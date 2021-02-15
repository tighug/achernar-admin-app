import { Grid, Input, Slider, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setBuyerCount } from "../../../store/bidCases";
import { DialogItem } from "./DialogItem";

export function BuyerCountSlider() {
  const { buyerCount } = useSelector((s) => s.bidCases);
  const loadCount = useSelector(
    (s) => s.loads.loads.length - s.loads.pvs.length
  );
  const dispatch = useDispatch();

  return (
    <DialogItem icon="face">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Label>
            <Typography variant="body2" color="textSecondary">
              Buyer Count
            </Typography>
          </Label>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={buyerCount}
            onChange={(e, v) => dispatch(setBuyerCount(v as number))}
            min={0}
            max={loadCount}
            step={1}
            marks={[
              { value: 0, label: "0" },
              { value: loadCount, label: String(loadCount) },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledInput
            value={buyerCount}
            onChange={({ target }) =>
              dispatch(setBuyerCount(Number(target.value)))
            }
            inputProps={{
              step: 1,
              min: 0,
              max: loadCount,
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
