import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const main: Configuration = {
  target: "electron-main",

  entry: path.join(__dirname, "../src/main/index.ts"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts"],
  },
};

export const renderer: Configuration = {
  target: "electron-renderer",

  entry: path.join(__dirname, "../src/renderer/index.tsx"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "renderer.js",
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
    }),
  ],
};
