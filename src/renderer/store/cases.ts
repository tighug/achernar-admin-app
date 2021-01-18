import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Case = {
  networkNum: number;
  feederNum: number;
};

export const caseSlice = createSlice({
  name: "cases",
  initialState: {
    networkNum: 1,
    feederNum: 1,
  } as Case,
  reducers: {
    setNetworkNum(state, action: PayloadAction<number>) {
      state.networkNum = action.payload;
      state.feederNum = 1;
    },
    setFeederNum(state, action: PayloadAction<number>) {
      state.feederNum = action.payload;
    },
  },
});

export const { setNetworkNum, setFeederNum } = caseSlice.actions;
export default caseSlice.reducer;
