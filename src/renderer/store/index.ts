import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import feeders from "./feeders";
import nodes from "./nodes";
import lines from "./lines";
import cases from "./cases";
import widgets from "./widgets";
import loads from "./loads";
import flows from "./flows";
import bidCases from "./bidCases";
import bidders from "./bidders";
import diagrams from "./diagrams";

const reducer = combineReducers({
  feeders,
  nodes,
  lines,
  cases,
  widgets,
  loads,
  flows,
  bidCases,
  bidders,
  diagrams,
});
const configuredStore = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type Store = typeof configuredStore;
export default configuredStore;
