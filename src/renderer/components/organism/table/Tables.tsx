import { Grid } from "@material-ui/core";
import {
  blue,
  deepOrange,
  green,
  orange,
  yellow,
} from "@material-ui/core/colors";
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

const height = 500;

export function Tables() {
  const { selected } = useSelector((s) => s.widgets);
  const dispatch = useDispatch();
  const caseIds = useSelector((s) => s.cases.cases).map((c) => c.id);
  const caseId = useSelector((s) => s.cases.caseId);

  const caseAction = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: 200, marginRight: 20 }}>
        <AppSelect
          label="Case"
          labelId="Case"
          onChange={({ target }) => dispatch(setCaseId(Number(target.value)))}
          options={caseIds}
          value={caseId}
          nullable
        />
      </div>
      <AddCaseDialog />
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
          action={caseAction}
          icon="notes"
          color={orange[500]}
          title="Cases"
        >
          <CaseTable height={height} />
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
        <AppPanel icon="brightness_7" color={deepOrange[500]} title="PVs">
          <PVTable height={height} />
        </AppPanel>
      </Grid>
    </>
  );
  const renderTables = () => {
    if (selected === "nodes") return nodes;
    else if (selected === "cases") return cases;
    else if (selected === "loads") return loads;
  };

  return <>{renderTables()}</>;
}
