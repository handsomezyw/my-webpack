const path = require("path");
const webpack = require("webpack");
const Mocha = require("mocha");

const mocha = new Mocha({
  timeout: 10000,
});

// 当前项目工作目录路径
const rootProject = process.cwd();

const prodConfig = require(path.resolve(rootProject, "config/webpack.prod"));
webpack(prodConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  mocha.addFile(path.resolve(__dirname, "html-test.js"));
  mocha.addFile(path.resolve(__dirname, "css-js-test.js"));
  mocha.run();
});
