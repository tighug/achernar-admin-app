import merge from "webpack-merge";
import { renderer } from "./webpack.common";
import path from "path";
import { Configuration } from "webpack";
import { spawn } from "child_process";

const rendererDev = merge(renderer, {
  mode: "development",

  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "../public"),
    compress: true,
    hot: true,
    inline: true,
    noInfo: true,
    quiet: true,
    overlay: true,

    before() {
      spawn("yarn", ["dev:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      }).on("error", (spawnError) => console.error(spawnError));
    },
  },
} as Configuration);

export default rendererDev;
