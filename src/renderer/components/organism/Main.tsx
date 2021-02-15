import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { NetworkDiagram } from "./network/NetworkDiagram";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeders } from "../../store/feeders";
import { fetchNodes } from "../../store/nodes";
import { fetchLines } from "../../store/lines";
import { fetchCases } from "../../store/cases";
import { Widgets } from "./Widgets";
import { Tables } from "./table/Tables";
import { updateStatus } from "../../store/cases";
import { fetchLoads, fetchPVs, resetLoads } from "../../store/loads";
import {
  fetchBeforeFlows,
  fetchAfterFlows,
  fetchFixedFlows,
  resetBeforeFlows,
  resetAfterFlows,
  resetFixedFlows,
} from "../../store/flows";
import { Filters } from "./Filters";
import {
  fetchBidCases,
  resetBidCases,
  updateBidCaseStatus,
} from "../../store/bidCases";
import { fetchBidders, resetBidders } from "../../store/bidders";

export function Main() {
  const { feeder } = useSelector((s) => s.feeders);
  const { caseId, cases } = useSelector((s) => s.cases);
  const { bidCaseId, bidCases } = useSelector((s) => s.bidCases);
  const ws = new WebSocket(process.env.FLOW_WS_URL || "ws://localhost:8001");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeders());
    ws.addEventListener("open", () => console.log("websocket connected."));
    ws.addEventListener("message", (e) => {
      console.log(e.data);
      const msg = JSON.parse(e.data);
      if (msg.type === "case") dispatch(updateStatus(msg));
      if (msg.type === "bidCase") dispatch(updateBidCaseStatus(msg));
    });
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
        dispatch(fetchBeforeFlows(matched.id));
        dispatch(fetchBidCases(matched.id));
      } else {
        dispatch(resetBeforeFlows());
        dispatch(resetLoads());
        dispatch(resetBidCases());
      }
    } else {
      dispatch(resetBeforeFlows());
      dispatch(resetLoads());
      dispatch(resetBidCases());
    }
  }, [cases, caseId]);

  useEffect(() => {
    const matched = bidCases.find((c) => c.id === bidCaseId);
    if (matched !== undefined) {
      if (matched.status === "completed" && caseId) {
        dispatch(fetchBidders(matched.id));
        dispatch(fetchAfterFlows({ caseId, bidCaseId: matched.id }));
        dispatch(fetchFixedFlows({ caseId, bidCaseId: matched.id }));
      } else {
        dispatch(resetBidders());
        dispatch(resetAfterFlows());
        dispatch(resetFixedFlows());
      }
    } else {
      dispatch(resetBidders());
      dispatch(resetAfterFlows());
      dispatch(resetFixedFlows());
    }
  }, [bidCases, bidCaseId]);

  return (
    <Container maxWidth="xl">
      <Grid container justify="space-around" alignItems="stretch" spacing={3}>
        <Grid item xs={8}>
          <NetworkDiagram width={500} height={500} />
        </Grid>
        <Grid item xs={4}>
          <Filters />
        </Grid>
        <Widgets />
        <Tables />
      </Grid>
    </Container>
  );
}
