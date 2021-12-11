const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.ts",
    background: "./src/background/index.ts",
		scripts: './src/scripts/index.ts',
  },
  module: {
    rules: [
			{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] }
		],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebPackPlugin({
      template: "./src/popup/index.html",
      filename: "popup.html",
			inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        { from: "./src/icons/icon16.png", to: "./icons" },
        { from: "./src/icons/icon32.png", to: "./icons" },
        { from: "./src/icons/icon128.png", to: "./icons" },
      ],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
