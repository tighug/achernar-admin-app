import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DiagramState = {
  maxV: number;
  minV: number;
  gradation: "bicolor" | "multicolor";
  strength: number;
  visibility: {
    load: boolean;
    pv: boolean;
    line: boolean;
    buyer: boolean;
    seller: boolean;
    violation: boolean;
  };
};

export const diagramSlice = createSlice({
  name: "diagrams",
  initialState: {
    minV: 216.2,
    maxV: 253,
    gradation: "bicolor",
    strength: 10,
    visibility: {
      load: true,
      pv: true,
      line: true,
      buyer: true,
      seller: true,
      violation: true,
    },
  } as DiagramState,
  reducers: {
    setMinV: (state, action: PayloadAction<number>) => {
      state.minV = action.payload;
    },
    setMaxV: (state, action: PayloadAction<number>) => {
      state.maxV = action.payload;
    },
    setGradation: (state, action: PayloadAction<"bicolor" | "multicolor">) => {
      state.gradation = action.payload;
    },
    setStrength: (state, action: PayloadAction<number>) => {
      state.strength = action.payload;
    },
    toggleLoadVisibility: (state) => {
      state.visibility.load = !state.visibility.load;
    },
    togglePVVisibility: (state) => {
      state.visibility.pv = !state.visibility.pv;
    },
    toggleBuyerVisibility: (state) => {
      state.visibility.buyer = !state.visibility.buyer;
    },
    toggleSellerVisibility: (state) => {
      state.visibility.seller = !state.visibility.seller;
    },
    toggleLineVisibility: (state) => {
      state.visibility.line = !state.visibility.line;
    },
    toggleViolationVisibility: (state) => {
      state.visibility.violation = !state.visibility.violation;
    },
  },
});

export const {
  setMinV,
  setMaxV,
  setGradation,
  setStrength,
  toggleLoadVisibility,
  togglePVVisibility,
  toggleBuyerVisibility,
  toggleSellerVisibility,
  toggleLineVisibility,
  toggleViolationVisibility,
} = diagramSlice.actions;
export default diagramSlice.reducer;
