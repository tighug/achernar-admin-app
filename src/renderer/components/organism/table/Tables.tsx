import { Grid } from "@material-ui/core";
import { blue, green, orange } from "@material-ui/core/colors";
import React from "react";
import { useSelector } from "react-redux";
import { AppPanel } from "../../molecule/AppPanel";
import { AddCaseDialog } from "../dialog/AddCaseDialog";
import { CaseTable } from "./CaseTable";
import { LineTable } from "./LineTable";
import { NodeTable } from "./NodeTable";

const height = 500;

export function Tables() {
  const { selected } = useSelector((s) => s.widgets);
  const nodes = (
    <>
      <Grid item xs={12} xl={5}>
        <AppPanel icon="adjust" color={green[500]} title="Nodes">
          <NodeTable height={height} />
        </AppPanel>
      </Grid>
      <Grid item xs={12} xl={7}>
        <AppPanel icon="linear_scale" color={blue[500]} title="Lines">
          <LineTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const cases = (
    <>
      <Grid item xs={12}>
        <AppPanel
          action={<AddCaseDialog />}
          icon="notes"
          color={orange[500]}
          title="Cases"
        >
          <CaseTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const renderTables = () => {
    if (selected === "nodes") return nodes;
    else if (selected === "cases") return cases;
  };

  return <>{renderTables()}</>;
}
