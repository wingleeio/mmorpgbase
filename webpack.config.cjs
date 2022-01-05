const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client"),
  },
};
