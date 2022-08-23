module.exports = {
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // extends: "eslint:recommended",
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended", "prettier"],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./config/webpack.base.js",
      },
    },
  },
  rules: {
    // "off" or 0 - 关闭规则
    // "warn" or 1 - 将规则视为一个警告（不会影响退出码）
    // "error" or 2 - 将规则视为一个错误 (退出码为1)

    // 要求或禁止在类成员之间出现空行
    "lines-between-class-members": [0, "always"],
    // 允许的扩展集是可配置的 jsx可以出现在js中
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    // 函数组件声明方式
    "react/function-component-definition": [
      2,
      {
        namedComponents: ["function-declaration", "function-expression", "arrow-function"],
        unnamedComponents: ["function-expression", "arrow-function"],
      },
    ],
    // 禁用 console
    "no-console": "off",
    // 要求 require() 出现在顶层模块作用域中
    "global-require": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
