title: Ant Design of Vue
speaker: Cooper Zhang

<slide />

# Ant Design of Vue

Cooper Zhang

<slide />

## 简介

- 是 Ant Design 的 Vue 实现，开发和服务于企业级后台产品。
- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 Vue 组件。
- 共享 [Ant Design of React](https://ant-design.gitee.io/docs/spec/introduce-cn) 设计工具体系。

<slide />

## 安装

- 使用 yarn 或 npm 安装。

    ```shell
    yarn add ant-design-vue
    ```

- 网络不好可以切换镜像源。

<slide />

## 组件引用

```js
import Vue from 'vue';
import Antd from 'ant-design-vue';

Vue.use(Antd);
```

引入样式：

```js
import 'ant-design-vue/dist/antd.css'; // 或者 'ant-design-vue/dist/antd.less'
```

<slide />

## 按需加载

```js
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style'; // 或者 'ant-design-vue/lib/button/style/css'
```

<slide />

### [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)

修改 `babel.config.js` 文件，配置 `babel-plugin-import`。

```js
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
```

```js
import { Button } from 'ant-design-vue';
```
