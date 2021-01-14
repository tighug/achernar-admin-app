import merge from "webpack-merge";
import { main, renderer } from "./webpack.common";

const mainProd = merge(main, { mode: "production" });
const rendererProd = merge(renderer, { mode: "production" });

export default [mainProd, rendererProd];
