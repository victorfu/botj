import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require("copy-webpack-plugin");

const assets = ["images"];
const copyPlugins = assets.map((asset) => {
  return new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/assets", asset),
        to: path.resolve(__dirname, ".webpack/renderer", asset),
      },
    ],
  });
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  ...copyPlugins,
];
