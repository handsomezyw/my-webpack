const path = require("path");
// 合并文件配置
const { merge } = require("webpack-merge");
// 基础配置
const baseConfig = require("./webpack.base");

// 当前项目工作目录路径
const RootProject = process.cwd();

const devConfig = {
  mode: "development",
  stats: "errors-only",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(RootProject, "./dist"),
    hot: true,
    historyApiFallback: true, // 当使用HTML5 History API时，index.html页面可能要代替404响应。
  },
};

module.exports = merge(baseConfig, devConfig);
