import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import feeders from "./feeders";
import nodes from "./nodes";
import lines from "./lines";
import cases from "./cases";
import widgets from "./widgets";
import loads from "./loads";

const reducer = combineReducers({
  feeders,
  nodes,
  lines,
  cases,
  widgets,
  loads,
});
const configuredStore = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type Store = typeof configuredStore;
export default configuredStore;
