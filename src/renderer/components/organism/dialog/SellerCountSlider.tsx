import { Grid, Input, Slider, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Load } from "../../../api/flowAPI";
import { setSellerCount } from "../../../store/bidCases";
import { DialogItem } from "./DialogItem";

export function SellerCountSlider() {
  const { sellerCount } = useSelector((s) => s.bidCases);
  const { pvs, loads } = useSelector((s) => s.loads);
  const pvCount = pvs.filter((pv) => {
    const matchedLoad = loads.find((l) => l.node.id === pv.node.id) as Load;
    return pv.val - matchedLoad.val > 0;
  }).length;
  const dispatch = useDispatch();

  return (
    <DialogItem icon="face">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Label>
            <Typography variant="body2" color="textSecondary">
              Seller Count
            </Typography>
          </Label>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={sellerCount}
            onChange={(e, v) => dispatch(setSellerCount(v as number))}
            min={0}
            max={pvCount}
            step={1}
            marks={[
              { value: 0, label: "0" },
              { value: pvCount, label: String(pvCount) },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledInput
            value={sellerCount}
            onChange={({ target }) =>
              dispatch(setSellerCount(Number(target.value)))
            }
            inputProps={{
              step: 1,
              min: 0,
              max: pvCount,
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
