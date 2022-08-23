const path = require("path");
const webpack = require("webpack");

// 当前项目工作目录路径
const RootProject = process.cwd();

module.exports = {
  entry: {
    library: ["react", "react-dom", "react-dom/client"],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(RootProject, "./library"),
    library: "[name]_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[hash]",
      path: path.resolve(RootProject, "./library/[name]-manifest.json"),
    }),
  ],
};
