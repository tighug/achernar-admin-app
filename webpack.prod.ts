import merge from "webpack-merge";
import { main, renderer } from "./webpack.common";

const mainProd = merge(main, {
  mode: "production",
});

const rendererProd = merge(renderer, {
  mode: "production",
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
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
              ],
            },
          },
        ],
      },
    ],
  },
});

export default [mainProd, rendererProd];
