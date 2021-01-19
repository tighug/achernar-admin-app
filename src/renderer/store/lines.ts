import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Node } from "./nodes";

const api = axios.create({ baseURL: process.env.FLOW_API_URL });

export type Line = {
  id: number;
  prevNode: Node;
  nextNode: Node;
  lengthM: number;
  phase: number;
  code: string;
  rOhmPerKm: number;
  xOhmPerKm: number;
};

export const fetchLines = createAsyncThunk(
  "lines/fetchLines",
  async (feederId: number): Promise<Line[]> => {
    const res = await api.get("/lines", { params: { feederId } }); // TODO: Add error handling
    return res.data.lines;
  }
);

const lineSlice = createSlice({
  name: "lines",
  initialState: [] as Line[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLines.pending, () => {
      return [];
    });
    builder.addCase(fetchLines.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default lineSlice.reducer;
