import { CardActions, CardContent, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createCase } from "../../../store/cases";
import { AppButton } from "../../atom/AppButton";
import { AppCard } from "../../atom/AppCard";
import { AppIcon } from "../../atom/AppIcon";
import { BaseVInput } from "./BaseVInput";
import { FeederSelect } from "./FeederSelect";
import { LoadScaleSlider } from "./LoadScaleSlider";
import { PvCountSlider } from "./PvCountSlider";
import { PvScaleSlider } from "./PvScaleSlider";
import { SeedSelect } from "./SeedSelect";
import { TimeSelect } from "./TimeSelect";

export function AddCaseDialog() {
  const [open, setOpen] = useState(false);
  const feederId = useSelector((s) => s.feeders.feeder.id);
  const cases = useSelector((s) => s.cases);
  const dispatch = useDispatch();

  const registerHandler = () => {
    dispatch(createCase({ feederId, ...cases }));
    setOpen(false);
  };

  return (
    <div>
      <AppButton
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        New
        <AppIcon right>add_box_outlined</AppIcon>
      </AppButton>
      <Dialog maxWidth="sm" fullWidth open={open}>
        <StyledAppCard>
          <CardContent>
            <FeederSelect />
            <TimeSelect />
            <PvScaleSlider />
            <PvCountSlider />
            <LoadScaleSlider />
            <BaseVInput />
            <SeedSelect />
          </CardContent>
          <CardActions>
            <CancelButton
              variant="text"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </CancelButton>
            <AppButton
              variant="contained"
              color="primary"
              onClick={registerHandler}
            >
              Register
            </AppButton>
          </CardActions>
        </StyledAppCard>
      </Dialog>
    </div>
  );
}

const StyledAppCard = styled(AppCard)`
  padding: 1rem;
`;

const CancelButton = styled(AppButton)`
  margin-right: auto;
`;
