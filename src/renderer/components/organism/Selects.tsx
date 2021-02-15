import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setFeeder } from "../../store/feeders";
import { AppSelect } from "../molecule/AppSelect";
import { setCaseId } from "../../store/cases";
import { setBidCaseId } from "../../store/bidCases";
import { setSelected } from "../../store/flows";

export default function Selects() {
  const { networkNums, feederNums, feeder } = useSelector((s) => s.feeders);
  const caseIds = useSelector((s) => s.cases.cases.map((c) => c.id));
  const { caseId } = useSelector((s) => s.cases);
  const bidCaseIds = useSelector((s) => s.bidCases.bidCases.map((c) => c.id));
  const { bidCaseId } = useSelector((s) => s.bidCases);
  const { selected } = useSelector((s) => s.flows);

  const dispatch = useDispatch();

  return (
    <Grid container justify="flex-start" spacing={2}>
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
      <Grid item xs={2}>
        <AppSelect
          label="Case | Load "
          labelId="Case | Load"
          onChange={({ target }) => dispatch(setCaseId(Number(target.value)))}
          options={caseIds}
          value={caseId}
          nullable
        />
      </Grid>
      <Grid item xs={2}>
        <AppSelect
          label="Case | Bid"
          labelId="Case | Bid"
          onChange={({ target }) =>
            dispatch(setBidCaseId(Number(target.value)))
          }
          options={bidCaseIds}
          value={bidCaseId}
          nullable
        />
      </Grid>
      <Grid item xs={2}>
        <AppSelect
          label="Flow"
          labelId="Flow"
          onChange={({ target }) => dispatch(setSelected(target.value))}
          options={["before", "after", "fixed"]}
          value={selected}
        />
      </Grid>
    </Grid>
  );
}
