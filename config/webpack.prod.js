const path = require("path");
const webpack = require("webpack");
// 这个插件使用 cssnano 优化和压缩 CSS。
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 压缩js插件
const TerserPlugin = require("terser-webpack-plugin");
// 分析构建体积插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// 将指定js文件提取至压缩目录，并用script标签引入
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// 图片压缩插件（使用无损压缩配置）
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// 自动部署到服务端插件
// const AutoDeployWebpackPlugin = require("@handsomezyw/auto-deploy-webpack-plugin");
// 合并文件配置
const { merge } = require("webpack-merge");
// 基础配置
const baseConfig = require("./webpack.base");
// 当前项目工作目录路径
const RootProject = process.cwd();
// 根据参数获取需要的绝对路径
const getPath = (pathStr) => {
  return path.resolve(RootProject, `${pathStr}`);
};

// 生产环境配置
const prodConfig = {
  // 打包输出路径
  output: {
    path: getPath("./dist"),
    filename: "[name]_[chunkhash:8].js",
    assetModuleFilename: "[name]_[hash:8][ext]",
    clean: true,
  },
  mode: "production",
  // 捕获一个应用程序"配置文件"，包括统计和提示
  profile: true,
  // 在html中通过script标签加载js脚本，加载完成后删除script标签
  // externalsType: "script",
  // externals: {
  //   "react-dom": ["https://unpkg.com/react-dom@18/umd/react-dom.production.min.js", "ReactDOM"],
  // },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(getPath("./library/library-manifest.json")),
    }),
    new AddAssetHtmlPlugin({
      filepath: getPath("./library/library.dll.js"),
      publicPath: "./",
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        // implementation: ImageMinimizerPlugin.imageminMinify,
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              "svgo",
              {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        // customize default plugin options
                        inlineStyles: {
                          onlyMatchedOnce: false,
                        },

                        // or disable plugins
                        removeDoctype: false,
                      },
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
    // new AutoDeployWebpackPlugin({
    //   serverOptions: {
    //     username: "administrator",
    //     host: "xxx",
    //     password: "123456",
    //   },
    //   localPath: "/Users/xxx/Desktop/study/webpack-study/dist",
    //   serverPath: "Desktop/my-system/public",
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: 4,
      }),
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //       name: "vendor",
    //       chunks: "all",
    //     },
    //   },
    // },
  },
};

module.exports = merge(baseConfig, prodConfig);
