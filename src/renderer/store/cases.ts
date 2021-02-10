import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Case,
  getCases,
  registerCase,
  deleteCase,
  simCase,
  RegisterCaseInput,
} from "../api/flowAPI";

export const fetchCases = createAsyncThunk(
  "cases/fetchCases",
  async (feederId: number): Promise<Case[]> => await getCases(feederId)
);

export const createCase = createAsyncThunk(
  "cases/registerCase",
  async (props: RegisterCaseInput) => await registerCase(props)
);

export const removeCase = createAsyncThunk(
  "cases/deleteCase",
  async (id: number) => await deleteCase(id)
);

export const simulateCase = createAsyncThunk(
  "cases/simulateCase",
  async (id: number) => await simCase(id)
);

type State = {
  cases: Case[];
  hour: number;
  minute: number;
  pvScale: number;
  pvCount: number;
  loadScale: number;
  baseV: number;
  seed: number;
};

export const caseSlice = createSlice({
  name: "cases",
  initialState: {
    cases: [],
    hour: 0,
    minute: 0,
    pvScale: 1,
    pvCount: 0,
    loadScale: 1,
    baseV: 230,
    seed: 0,
  } as State,
  reducers: {
    setHour(state, action: PayloadAction<number>) {
      state.hour = action.payload;
    },
    setMinute(state, action: PayloadAction<number>) {
      state.minute = action.payload;
    },
    setPvScale(state, action: PayloadAction<number>) {
      state.pvScale = action.payload;
    },
    setPvCount(state, action: PayloadAction<number>) {
      state.pvCount = action.payload;
    },
    setLoadScale(state, action: PayloadAction<number>) {
      state.loadScale = action.payload;
    },
    setBaseV(state, action: PayloadAction<number>) {
      state.baseV = action.payload;
    },
    setSeed(state, action: PayloadAction<number>) {
      state.seed = action.payload;
    },
    updateStatus(state, action: PayloadAction<string>) {
      console.log(action.payload);
      const { id, status } = JSON.parse(action.payload);
      state.cases = state.cases.map((c) =>
        c.id === id ? { ...c, status } : c
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCases.fulfilled, (state, action) => {
      state.cases = action.payload;
    });
    builder.addCase(createCase.fulfilled, (state, action) => {
      state.cases.push(action.payload);
    });
    builder.addCase(removeCase.fulfilled, (state, action) => {
      state.cases = state.cases.filter((c) => c.id !== action.payload);
    });
  },
});

export const {
  setHour,
  setMinute,
  setPvScale,
  setPvCount,
  setLoadScale,
  setBaseV,
  setSeed,
  updateStatus,
} = caseSlice.actions;
export default caseSlice.reducer;
