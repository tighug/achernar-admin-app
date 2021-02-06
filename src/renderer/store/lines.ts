import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLines, Line } from "../api/flowAPI";

export const fetchLines = createAsyncThunk(
  "lines/fetchLines",
  async (feederId: number): Promise<Line[]> => await getLines(feederId)
);

type State = {
  lines: Line[];
};

const lineSlice = createSlice({
  name: "lines",
  initialState: {
    lines: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLines.fulfilled, (state, action) => {
      state.lines = action.payload;
    });
  },
});

export default lineSlice.reducer;
