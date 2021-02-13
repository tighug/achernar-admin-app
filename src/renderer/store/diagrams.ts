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
  toggleLineVisibility,
  toggleViolationVisibility,
} = diagramSlice.actions;
export default diagramSlice.reducer;
