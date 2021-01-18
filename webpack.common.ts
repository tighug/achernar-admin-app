import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";

export const main: Configuration = {
  target: "electron-main",

  entry: "./src/main/index.ts",
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript"],
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
          ],
        },
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
};

export const renderer: Configuration = {
  target: "electron-renderer",

  entry: "./src/renderer/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "renderer.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html",
    }),
    new Dotenv(),
  ],
};
