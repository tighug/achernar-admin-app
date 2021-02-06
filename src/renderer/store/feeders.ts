import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feeder, getFeeders } from "../api/flowAPI";

type State = {
  feeders: Feeder[];
  feeder: Feeder;
  networkNums: number[];
  feederNums: number[];
};

export const fetchFeeders = createAsyncThunk(
  "feeders/fetchFeeders",
  async (): Promise<Feeder[]> => await getFeeders()
);

const feederSlice = createSlice({
  name: "feeders",
  initialState: {
    feeders: [],
    feeder: {
      id: 1,
      networkNum: 1,
      feederNum: 1,
    },
    networkNums: [],
    feederNums: [],
  } as State,
  reducers: {
    setFeeder(state, action: PayloadAction<[number, number]>) {
      const [networkNum, feederNum] = action.payload;
      const feeder = state.feeders.find(
        (f) => f.networkNum === networkNum && f.feederNum === feederNum
      );
      if (feeder === undefined) throw new Error("feeder is not found.");
      state.feeder = feeder;
      state.feederNums = state.feeders
        .filter((f) => f.networkNum === networkNum)
        .map((f) => f.feederNum);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeders.fulfilled, (state, action) => {
      const feeders = action.payload;
      state.feeders = feeders;
      state.networkNums = [...new Set(feeders.map((f) => f.networkNum))];
      state.feederNums = feeders
        .filter((f) => f.networkNum === 1)
        .map((f) => f.feederNum);
    });
  },
});

export const { setFeeder } = feederSlice.actions;
export default feederSlice.reducer;
