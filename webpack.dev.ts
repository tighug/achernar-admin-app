import merge from "webpack-merge";
import { Configuration } from "webpack";
import { spawn } from "child_process";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { main, renderer } from "./webpack.common";

const mainDev = merge(main, {
  mode: "development",
});

const rendererDev: Configuration = merge(renderer, {
  mode: "development",
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript", "@babel/preset-react"],
              plugins: [
                "react-refresh/babel",
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new ReactRefreshWebpackPlugin()],
  devServer: {
    port: 3000,
    contentBase: `${__dirname}/src/renderer`,
    hot: true,
    noInfo: true,
    quiet: true,
    before() {
      spawn("yarn", ["dev:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      }).on("error", (spawnError) => console.error(spawnError));
    },
  },
});

export default [mainDev, rendererDev];
