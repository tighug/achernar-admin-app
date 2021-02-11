import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { NetworkDiagram } from "./network/NetworkDiagram";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeders } from "../../store/feeders";
import { fetchNodes } from "../../store/nodes";
import { fetchLines } from "../../store/lines";
import { fetchCases } from "../../store/cases";
import { AppPanel } from "../molecule/AppPanel";
import { Widgets } from "./Widgets";
import { Tables } from "./table/Tables";
import { updateStatus } from "../../store/cases";
import { fetchLoads, fetchPVs } from "../../store/loads";
import { fetchFlows } from "../../store/flows";

export function Main() {
  const { feeder } = useSelector((s) => s.feeders);
  const { caseId, cases } = useSelector((s) => s.cases);
  const ws = new WebSocket(process.env.FLOW_WS_URL || "ws://localhost:8001");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeders());
    ws.addEventListener("open", () => console.log("websocket connected."));
    ws.addEventListener("message", (e) =>
      dispatch(updateStatus(JSON.parse(e.data)))
    );
  }, []);

  useEffect(() => {
    dispatch(fetchNodes(feeder.id));
    dispatch(fetchLines(feeder.id));
    dispatch(fetchCases(feeder.id));
  }, [feeder.id]);

  useEffect(() => {
    const matched = cases.find((c) => c.id === caseId);
    if (matched !== undefined) {
      if (matched.status === "completed") {
        dispatch(fetchLoads(matched.id));
        dispatch(fetchPVs(matched.id));
        dispatch(fetchFlows(matched.id));
      }
    }
  }, [cases, caseId]);

  return (
    <Container maxWidth="xl">
      <Grid container justify="space-around" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <AppPanel>
            <NetworkDiagram width={500} height={500} />
          </AppPanel>
        </Grid>
        <Widgets />
        <Tables />
      </Grid>
    </Container>
  );
}
