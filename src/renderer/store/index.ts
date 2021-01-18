import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import feeders from "./feeders";
import nodes from "./nodes";
import cases from "./cases";

const reducer = combineReducers({ feeders, nodes, cases });
const configuredStore = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type Store = typeof configuredStore;
export default configuredStore;
