import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Flow,
  getBeforeFlows,
  getAfterFlows,
  getFixedFlows,
} from "../api/flowAPI";

export const fetchBeforeFlows = createAsyncThunk(
  "flows/fetchBeforeFlows",
  async (caseId: number): Promise<Flow[]> => await getBeforeFlows(caseId)
);

export const fetchAfterFlows = createAsyncThunk(
  "flows/fetchAfterFlows",
  async (props: { caseId: number; bidCaseId: number }): Promise<Flow[]> =>
    await getAfterFlows(props.caseId, props.bidCaseId)
);

export const fetchFixedFlows = createAsyncThunk(
  "flows/fetchFixedFlows",
  async (props: { caseId: number; bidCaseId: number }): Promise<Flow[]> =>
    await getFixedFlows(props.caseId, props.bidCaseId)
);

type State = {
  beforeFlows: Flow[];
  afterFlows: Flow[];
  fixedFlows: Flow[];
  selected: "before" | "after" | "fixed";
};

const flowSlice = createSlice({
  name: "flows",
  initialState: {
    beforeFlows: [],
    afterFlows: [],
    fixedFlows: [],
    selected: "before",
  } as State,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    resetBeforeFlows: (state) => {
      state.beforeFlows = [];
    },
    resetAfterFlows: (state) => {
      state.afterFlows = [];
    },
    resetFixedFlows: (state) => {
      state.fixedFlows = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBeforeFlows.fulfilled, (state, action) => {
      state.beforeFlows = action.payload;
    });
    builder.addCase(fetchAfterFlows.fulfilled, (state, action) => {
      state.afterFlows = action.payload;
    });
    builder.addCase(fetchFixedFlows.fulfilled, (state, action) => {
      state.fixedFlows = action.payload;
    });
  },
});

export const {
  setSelected,
  resetBeforeFlows,
  resetAfterFlows,
  resetFixedFlows,
} = flowSlice.actions;
export default flowSlice.reducer;
