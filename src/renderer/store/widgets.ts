import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  selected: string;
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState: {
    selected: "nodes",
  } as State,
  reducers: {
    setWidget(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
  },
});

export const { setWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
