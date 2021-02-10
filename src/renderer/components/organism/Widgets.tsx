import { Grid } from "@material-ui/core";
import { cyan, green, orange } from "@material-ui/core/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidget } from "../../store/widgets";
import { AppWidget } from "../molecule/AppWidget";

export function Widgets() {
  const { selected } = useSelector((s) => s.widgets);
  const nodeCount = useSelector((s) => s.nodes.nodes).length;
  const caseCount = useSelector((s) => s.cases.cases).length;
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
          title="Nodes & Lines"
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
          active={selected === "flows"}
          color={cyan[500]}
          title="Flows"
          onClick={() => clickHandler("flows")}
        >
          10
        </AppWidget>
      </Grid>
      <Grid item xs={3}>
        <AppWidget
          active={selected === "loads"}
          color={cyan[500]}
          title="Loads"
          onClick={() => clickHandler("loads")}
        >
          10
        </AppWidget>
      </Grid>
    </>
  );
}
