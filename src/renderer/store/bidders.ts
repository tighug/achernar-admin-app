import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Bidder, getBidders } from "../api/flowAPI";

export const fetchBidders = createAsyncThunk(
  "bidders/fetchBidders",
  async (bidCaseId: number): Promise<Bidder[]> => await getBidders(bidCaseId)
);

type State = {
  bidders: Bidder[];
};

export const bidderSlice = createSlice({
  name: "bidders",
  initialState: {
    bidders: [],
  } as State,
  reducers: {
    resetBidders: (state) => {
      state.bidders = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBidders.fulfilled, (state, action) => {
      state.bidders = action.payload;
    });
  },
});

export const { resetBidders } = bidderSlice.actions;
export default bidderSlice.reducer;
