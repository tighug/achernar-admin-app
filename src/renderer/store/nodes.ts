import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Feeder } from "./feeders";

const api = axios.create({ baseURL: process.env.FLOW_API_URL });

export type Node = {
  id: number;
  feeder: Feeder;
  num: number;
  posX: number;
  posY: number;
  hasLoad: boolean;
};

export const fetchNodes = createAsyncThunk(
  "nodes/fetchNodes",
  async (feederId: number): Promise<Node[]> => {
    const res = await api.get("/nodes", { params: { feederId } }); // TODO: Add error handling
    return res.data.nodes;
  }
);

const nodeSlice = createSlice({
  name: "nodes",
  initialState: [] as Node[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNodes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default nodeSlice.reducer;
