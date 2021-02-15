import { Grid } from "@material-ui/core";
import { cyan, green, orange, yellow } from "@material-ui/core/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidget } from "../../store/widgets";
import { AppWidget } from "../molecule/AppWidget";

export function Widgets() {
  const { selected } = useSelector((s) => s.widgets);
  const nodeCount = useSelector((s) => s.nodes.nodes).length;
  const lineCount = useSelector((s) => s.lines.lines).length;
  const caseCount = useSelector((s) => s.cases.cases).length;
  const loadCount = useSelector((s) => s.loads.loads).length;
  const pvCount = useSelector((s) => s.loads.pvs).length;
  const flowCount = useSelector((s) => s.flows.flows).length;
  const dispatch = useDispatch();
  const clickHandler = (name: string) => {
    dispatch(setWidget(name));
  };

  return (
    <>
      <Grid item xs={3}>
        <AppWidget
          active={selected === "nodes"}
          color={green[500]}
          icon="adjust"
          title="Nodes"
          onClick={() => clickHandler("nodes")}
        >
          {nodeCount}
        </AppWidget>
      </Grid>
      <Grid item xs={3}>
        <AppWidget
          active={selected === "cases"}
          color={orange[500]}
          icon="notes"
          title="Cases"
          onClick={() => clickHandler("cases")}
        >
          {caseCount}
        </AppWidget>
      </Grid>
      <Grid item xs={3}>
        <AppWidget
          active={selected === "loads"}
          color={yellow[500]}
          icon="emoji_objects"
          title="Loads & PVs"
          onClick={() => clickHandler("loads")}
          disabled={loadCount === 0}
        >
          {loadCount} / {pvCount}
        </AppWidget>
      </Grid>
      <Grid item xs={3}>
        <AppWidget
          active={selected === "flows"}
          color={cyan[500]}
          icon="sync_alt"
          title="Flows"
          onClick={() => clickHandler("flows")}
          disabled={loadCount === 0}
        >
          {flowCount}
        </AppWidget>
      </Grid>
    </>
  );
}
