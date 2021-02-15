import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BidCase,
  getBidCases,
  registerBidCase,
  RegisterBidCaseInput,
  deleteBidCase,
  simBidCase,
} from "../api/flowAPI";

export const fetchBidCases = createAsyncThunk(
  "bidCases/fetchBidCases",
  async (caseId: number): Promise<BidCase[]> => await getBidCases(caseId)
);

export const createBidCase = createAsyncThunk(
  "bidCases/registerBidCase",
  async (props: RegisterBidCaseInput) => await registerBidCase(props)
);

export const removeBidCase = createAsyncThunk(
  "bidCases/deleteBidCase",
  async (id: number) => await deleteBidCase(id)
);

export const simulateBidCase = createAsyncThunk(
  "bidCases/simulateBidCase",
  async (id: number) => await simBidCase(id)
);

type State = {
  bidCases: BidCase[];
  bidCaseId?: number;
  buyerCount: number;
  sellerCount: number;
  minBuyPrice: number;
  maxBuyPrice: number;
  minSellPrice: number;
  maxSellPrice: number;
  minBuyVolume: number;
  maxBuyVolume: number;
  minSellVolume: number;
  maxSellVolume: number;
  seed: number;
};

export const bidCasesSlice = createSlice({
  name: "bidCases",
  initialState: {
    bidCases: [],
    bidCaseId: undefined,
    buyerCount: 0,
    sellerCount: 0,
    minBuyPrice: 1,
    maxBuyPrice: 19,
    minSellPrice: 1,
    maxSellPrice: 19,
    minBuyVolume: 1000,
    maxBuyVolume: 5000,
    minSellVolume: 1000,
    maxSellVolume: 5000,
    seed: 0,
  } as State,
  reducers: {
    setBidCaseId(state, action: PayloadAction<number | undefined>) {
      state.bidCaseId = action.payload;
    },
    setBuyerCount(state, action: PayloadAction<number>) {
      state.buyerCount = action.payload;
    },
    setSellerCount(state, action: PayloadAction<number>) {
      state.sellerCount = action.payload;
    },
    setMinBuyPrice(state, action: PayloadAction<number>) {
      state.minBuyPrice = action.payload;
    },
    setMaxBuyPrice(state, action: PayloadAction<number>) {
      state.maxBuyPrice = action.payload;
    },
    setMinSellPrice(state, action: PayloadAction<number>) {
      state.minSellPrice = action.payload;
    },
    setMaxSellPrice(state, action: PayloadAction<number>) {
      state.maxSellPrice = action.payload;
    },
    setMinBuyVolume(state, action: PayloadAction<number>) {
      state.minBuyVolume = action.payload;
    },
    setMaxBuyVolume(state, action: PayloadAction<number>) {
      state.maxBuyVolume = action.payload;
    },
    setMinSellVolume(state, action: PayloadAction<number>) {
      state.minSellVolume = action.payload;
    },
    setMaxSellVolume(state, action: PayloadAction<number>) {
      state.maxSellVolume = action.payload;
    },
    setBidSeed(state, action: PayloadAction<number>) {
      state.seed = action.payload;
    },
    resetBidCases: (state) => {
      state.bidCases = [];
    },
    updateBidCaseStatus(
      state,
      action: PayloadAction<{ id: number; status: string; agreedPrice: number }>
    ) {
      const { id, status, agreedPrice } = action.payload;
      state.bidCases = state.bidCases.map((c) =>
        c.id === id ? { ...c, status, agreedPrice } : c
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBidCases.fulfilled, (state, action) => {
      state.bidCases = action.payload;
    });
    builder.addCase(createBidCase.fulfilled, (state, action) => {
      state.bidCases.push(action.payload);
    });
    builder.addCase(removeBidCase.fulfilled, (state, action) => {
      state.bidCases = state.bidCases.filter((c) => c.id !== action.payload);
    });
  },
});

export const {
  setBidCaseId,
  setBuyerCount,
  setSellerCount,
  setMinBuyPrice,
  setMaxBuyPrice,
  setMinSellPrice,
  setMaxSellPrice,
  setMinBuyVolume,
  setMaxBuyVolume,
  setMinSellVolume,
  setMaxSellVolume,
  setBidSeed,
  resetBidCases,
  updateBidCaseStatus,
} = bidCasesSlice.actions;
export default bidCasesSlice.reducer;
