import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLoads, getPVs, Load } from "../api/flowAPI";

export const fetchLoads = createAsyncThunk(
  "loads/fetchLoads",
  async (caseId: number): Promise<Load[]> => await getLoads(caseId)
);

export const fetchPVs = createAsyncThunk(
  "loads/fetchPVs",
  async (caseId: number): Promise<Load[]> => await getPVs(caseId)
);

type State = {
  loads: Load[];
  pvs: Load[];
};

const loadSlice = createSlice({
  name: "loads",
  initialState: {
    loads: [],
    pvs: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoads.fulfilled, (state, action) => {
      state.loads = action.payload;
    });
    builder.addCase(fetchPVs.fulfilled, (state, action) => {
      state.pvs = action.payload.sort((a, b) => a.node.num - b.node.num);
    });
  },
});

export default loadSlice.reducer;
