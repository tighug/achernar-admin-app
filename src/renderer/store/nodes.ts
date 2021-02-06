import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Node, getNodes } from "../api/flowAPI";

export const fetchNodes = createAsyncThunk(
  "nodes/fetchNodes",
  async (feederId: number): Promise<Node[]> => await getNodes(feederId)
);

type State = {
  nodes: Node[];
};

const nodeSlice = createSlice({
  name: "nodes",
  initialState: {
    nodes: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNodes.fulfilled, (state, action) => {
      state.nodes = action.payload;
    });
  },
});

export default nodeSlice.reducer;
