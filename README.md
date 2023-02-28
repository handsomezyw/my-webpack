## 基于webpack5搭建的react基础环境

- 只提供最基础的react运行环境

- 支持ts环境

- 已配置ESLint、Prettier，可根据自己代码风格修改（记得在vscode中安装ESLint、Prettier插件配合使用）

- 可根据你的业务需求自由配置

- 增加husky、lint-staged验证代码提交是否能通过ESLint检查

### 使用

安装依赖

```shell
yarn
```

预编译react、react-dom资源

```shell
yarn dll
```

使用husky验证

```shell
# 执行prepare 脚本，生成.husky目录
yarn prepare
# 增加 pre-commit 钩子
npx husky add .husky/pre-commit "npx lint-staged"
```

运行项目

```shell
yarn start
```

打包

```shell
yarn build
```
