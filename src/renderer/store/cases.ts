import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Case, getCases } from "../api/flowAPI";

export const fetchCases = createAsyncThunk(
  "cases/fetchCases",
  async (feederId: number): Promise<Case[]> => await getCases(feederId)
);

type State = {
  cases: Case[];
};

export const caseSlice = createSlice({
  name: "cases",
  initialState: {
    cases: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCases.fulfilled, (state, action) => {
      state.cases = action.payload;
    });
  },
});

export default caseSlice.reducer;
