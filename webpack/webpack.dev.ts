import merge from "webpack-merge";
import { renderer } from "./webpack.common";
import path from "path";

const rendererDev = merge(renderer, {
  mode: "development",

  devServer: {
    contentBase: path.join(__dirname, "../src/renderer"),
    compress: true,
    hot: true,
    inline: true,
    noInfo: true,
    quiet: true,
    overlay: true,
  },
});

export default rendererDev;
