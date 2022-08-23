module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 关闭 tab 缩进
  useTabs: false,
  // 使用 2个tab 缩进
  tabWidth: 2,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: false,
  // 对象key是否使用引号 
  // as-needed 仅在需要的时候使用
  // consistent 有一个属性需要引号，就都需要引号
  // preserve 保留用户输入的情况
  quoteProps: "as-needed",
  // jsx 使用单引号代替双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号 
  trailingComma: "all",
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号 <always|avoid>
  arrowParens: "always",
};
