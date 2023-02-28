const path = require("path")

module.exports = {
  mode: "production",
  entry: "./dist/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "out"),
  },

  target: "node",
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    fallback: {
      fs: false,
      dns: false,
      net: false,
      "cpu-features": false,
      child_process: false,
    },
  },
}
