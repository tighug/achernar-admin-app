import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Flow, getFlows } from "../api/flowAPI";

export const fetchFlows = createAsyncThunk(
  "flows/fetchFlows",
  async (caseId: number): Promise<Flow[]> => await getFlows(caseId)
);

type State = {
  flows: Flow[];
};

const flowSlice = createSlice({
  name: "flows",
  initialState: {
    flows: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlows.fulfilled, (state, action) => {
      state.flows = action.payload;
    });
  },
});

export default flowSlice.reducer;
