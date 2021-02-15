import { CardActions, CardContent, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createBidCase } from "../../../store/bidCases";
import { AppButton } from "../../atom/AppButton";
import { AppCard } from "../../atom/AppCard";
import { AppIcon } from "../../atom/AppIcon";
import { BuyerCountSlider } from "./BuyerCountSlider";
import { BidSeedSelect } from "./SeedSelect";
import { SellerCountSlider } from "./SellerCountSlider";

export default function AddBidCaseDialog() {
  const [open, setOpen] = useState(false);
  const bidCases = useSelector((s) => s.bidCases);
  const { caseId } = useSelector((s) => s.cases);
  const dispatch = useDispatch();

  const registerHandler = () => {
    if (caseId) {
      dispatch(createBidCase({ caseId, ...bidCases }));
    }
    setOpen(false);
  };

  return (
    <div>
      <AppButton
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        disabled={caseId === undefined}
      >
        New
        <AppIcon right>add_box_outlined</AppIcon>
      </AppButton>
      <Dialog maxWidth="sm" fullWidth open={open}>
        <StyledAppCard>
          <CardContent>
            <BuyerCountSlider />
            <SellerCountSlider />
            <BidSeedSelect />
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
