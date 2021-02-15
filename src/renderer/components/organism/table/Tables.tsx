import { Grid } from "@material-ui/core";
import { blue, cyan, green, orange, yellow } from "@material-ui/core/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppPanel } from "../../molecule/AppPanel";
import { AppSelect } from "../../molecule/AppSelect";
import { AddCaseDialog } from "../dialog/AddCaseDialog";
import { CaseTable } from "./CaseTable";
import { LineTable } from "./LineTable";
import { NodeTable } from "./NodeTable";
import { setCaseId } from "../../../store/cases";
import { LoadTable } from "./LoadTable";
import { PVTable } from "./PVTable";
import FlowTable from "./FlowTable";
import { BidCaseTable } from "./BidCaseTable";
import AddBidCaseDialog from "../dialog/AddBidCaseDialog";
import { setBidCaseId } from "../../../store/bidCases";

const height = 500;

export function Tables() {
  const { selected } = useSelector((s) => s.widgets);
  const dispatch = useDispatch();
  const caseIds = useSelector((s) => s.cases.cases.map((c) => c.id));
  const bidCaseIds = useSelector((s) => s.bidCases.bidCases.map((c) => c.id));
  const { bidCaseId } = useSelector((s) => s.bidCases);
  const { caseId } = useSelector((s) => s.cases);

  const caseAction = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: 200, marginRight: 20 }}>
        <AppSelect
          label="Case (Load)"
          labelId="Case (Load)"
          onChange={({ target }) => dispatch(setCaseId(Number(target.value)))}
          options={caseIds}
          value={caseId}
          nullable
        />
      </div>
      <AddCaseDialog />
    </div>
  );
  const bidCaseAction = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: 200, marginRight: 20 }}>
        <AppSelect
          label="Case (Bid)"
          labelId="Case (Bid)"
          onChange={({ target }) =>
            dispatch(setBidCaseId(Number(target.value)))
          }
          options={bidCaseIds}
          value={bidCaseId}
          nullable
        />
      </div>
      <AddBidCaseDialog />
    </div>
  );
  const nodes = (
    <>
      <Grid item xs={12} xl={5}>
        <AppPanel icon="adjust" color={green[500]} title="Nodes">
          <NodeTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={12} xl={7}>
        <AppPanel icon="show_chart" color={blue[500]} title="Lines">
          <LineTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const cases = (
    <>
      <Grid item xs={12}>
        <AppPanel
          action={caseAction}
          icon="notes"
          color={orange[500]}
          title="Cases (Load)"
        >
          <CaseTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={12}>
        <AppPanel
          action={bidCaseAction}
          icon="notes"
          color={orange[500]}
          title="Cases (Bid)"
        >
          <BidCaseTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const loads = (
    <>
      <Grid item xs={6}>
        <AppPanel icon="emoji_objects" color={yellow[500]} title="Loads">
          <LoadTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={6}>
        <AppPanel icon="brightness_7" color={green[500]} title="PVs">
          <PVTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const flows = (
    <>
      <Grid item xs={12}>
        <AppPanel icon="sync_alt" color={cyan[500]} title="Flows">
          <FlowTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const renderTables = () => {
    if (selected === "nodes") return nodes;
    else if (selected === "cases") return cases;
    else if (selected === "loads") return loads;
    else if (selected === "flows") return flows;
  };

  return <>{renderTables()}</>;
}
