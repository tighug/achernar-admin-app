import { Grid } from "@material-ui/core";
import {
  blue,
  cyan,
  deepOrange,
  green,
  indigo,
  orange,
  yellow,
} from "@material-ui/core/colors";
import React from "react";
import { useSelector } from "react-redux";
import { AppPanel } from "../../molecule/AppPanel";
import { AddCaseDialog } from "../dialog/AddCaseDialog";
import { CaseTable } from "./CaseTable";
import { LineTable } from "./LineTable";
import { NodeTable } from "./NodeTable";
import { LoadTable } from "./LoadTable";
import { PVTable } from "./PVTable";
import { BeforeFlowTable, AfterFlowTable, FixedFlowTable } from "./FlowTable";
import { BidCaseTable } from "./BidCaseTable";
import AddBidCaseDialog from "../dialog/AddBidCaseDialog";
import { BuyerTable, SellerTable } from "./BidderTable";

const height = 500;

export function Tables() {
  const { selected } = useSelector((s) => s.widgets);

  const caseAction = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <AddCaseDialog />
    </div>
  );
  const bidCaseAction = (
    <div style={{ display: "flex", alignItems: "center" }}>
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
  const bidders = (
    <>
      <Grid item xs={6}>
        <AppPanel icon="face" color={indigo[500]} title="Buyers">
          <BuyerTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={6}>
        <AppPanel icon="face" color={deepOrange[500]} title="Sellers">
          <SellerTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const flows = (
    <>
      <Grid item xs={12}>
        <AppPanel icon="sync_alt" color={cyan[500]} title="Flows before market">
          <BeforeFlowTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={12}>
        <AppPanel icon="sync_alt" color={cyan[500]} title="Flows after market">
          <AfterFlowTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={12}>
        <AppPanel
          icon="sync_alt"
          color={cyan[500]}
          title="Flows fixed by nodal prices"
        >
          <FixedFlowTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const renderTables = () => {
    if (selected === "nodes") return nodes;
    else if (selected === "cases") return cases;
    else if (selected === "loads") return loads;
    else if (selected === "bidders") return bidders;
    else if (selected === "flows") return flows;
  };

  return <>{renderTables()}</>;
}
