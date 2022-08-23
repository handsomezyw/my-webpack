const path = require("path");
// 使用 eslint 来查找和修复 JavaScript 代码中的问题
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 命令行提示优化插件
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
// 在一个独立进程上运行TypeScript类型检查器的Webpack插件。
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// 当前项目工作目录根路径
const RootProject = process.cwd();
// 根据参数获取需要的绝对路径
const getPath = (pathStr) => {
  return path.resolve(RootProject, `${pathStr}`);
};

module.exports = {
  entry: getPath("./src/app.tsx"),
  resolve: {
    // 创建 import 或 require 的别名
    alias: {
      "@": getPath("./src"),
    },
    // 解析这些后缀名的文件
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  performance: {
    hints: false, // 关闭打包文件体积过大提示
  },
  // 使用插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: getPath("./src"),
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: getPath("./public/index.html"),
      filename: "index.html",
      inject: true,
      minify: {
        html5: true, // 根据HTML5规范解析输入
        collapseWhitespace: true, // 折叠构成文档树中文本节点的空白
        preserveLineBreaks: false, // 当标签之间的空格包含换行符时，总是折叠为1个换行符(永远不要完全删除它)。必须与collapseWhitespace=true一起使用
        minifyCSS: true, // 在样式元素和样式属性中缩小CSS(使用clean-css)
        minifyJS: true, // 在脚本元素和事件属性中最小化JavaScript(使用Terser)
        removeComments: false, // 带HTML注释
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  module: {
    // 对模块(module)应用 loader
    rules: [
      {
        test: /\.jsx?$/,
        include: [getPath("./src")],
        use: [
          {
            loader: "thread-loader",
            // 有同样配置的 loader 会共享一个 worker 池
            options: {
              // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
              // 在 require('os').cpus() 是 undefined 时回退至 1
              // workers: 2,

              // 一个 worker 进程中并行执行工作的数量
              // 默认为 20
              workerParallelJobs: 50,

              // 额外的 node.js 参数
              workerNodeArgs: ["--max-old-space-size=1024"],

              // 允许重新生成一个僵死的 work 池
              // 这个过程会降低整体编译速度
              // 并且开发环境应该设置为 false
              poolRespawn: false,

              // 闲置时定时删除 worker 进程
              // 默认为 500（ms）
              // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,

              // 池分配给 worker 的工作数量
              // 默认为 200
              // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,

              // 池的名称
              // 可以修改名称来创建其余选项都一样的池
              name: "babel-pool",
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: "3.24.1", proposals: true },
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "thread-loader",
            // 有同样配置的 loader 会共享一个 worker 池
            options: {
              // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
              // 在 require('os').cpus() 是 undefined 时回退至 1
              // workers: 2,

              // 一个 worker 进程中并行执行工作的数量
              // 默认为 20
              workerParallelJobs: 50,

              // 额外的 node.js 参数
              workerNodeArgs: ["--max-old-space-size=1024"],

              // 允许重新生成一个僵死的 work 池
              // 这个过程会降低整体编译速度
              // 并且开发环境应该设置为 false
              poolRespawn: false,

              // 闲置时定时删除 worker 进程
              // 默认为 500（ms）
              // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,

              // 池分配给 worker 的工作数量
              // 默认为 200
              // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,

              // 池的名称
              // 可以修改名称来创建其余选项都一样的池
              name: "ts-pool",
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: "3.24.1", proposals: true },
                  },
                ],
              ],
              plugins: [],
            },
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
            },
          },
        ],
        include: getPath("./src"),
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader", //将style插入到head中
          MiniCssExtractPlugin.loader, // 提取css成单独文件
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true, // 允许根据文件名中含有module的文件开启css modules
                localIdentName: "[path][name]__[local]--[hash:base64:5]", // 允许配置生成的本地标识符(ident)
              },
              importLoaders: 3,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: [getPath("./src/global.less")],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
};
