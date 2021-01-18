import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({ baseURL: process.env.FLOW_API_URL });

export type Feeder = {
  id: number;
  networkNum: number;
  feederNum: number;
};

export const fetchFeeders = createAsyncThunk<Feeder[]>(
  "feeders/fetchFeeders",
  async (): Promise<Feeder[]> => {
    const res = await api.get("/feeders");
    return res.data.feeders;
  }
);

const feederSlice = createSlice({
  name: "feeders",
  initialState: [{ id: 1, networkNum: 1, feederNum: 1 }] as Feeder[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeders.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default feederSlice.reducer;
