# Vue

官网：[https://v2.cn.vuejs.org/](https://v2.cn.vuejs.org/)

runoob 教程：[https://www.runoob.com/vue2/vue-tutorial.html](https://www.runoob.com/vue2/vue-tutorial.html)

## 安装

:::tip
前提是安装好了 npm，cnpm 或 yarn
:::

- 全局安装 vue-cli 。

```shell
yarn global add vue-cli
```

## 创建一个基于 webpack 模板的新项目

```shell
vue init webpack my-project
```

可参考 runoob 教程：[https://www.runoob.com/vue2/vue-tutorial.html](https://www.runoob.com/vue2/vue-tutorial.html)

## vue2 使用 tinymce 富文本编辑器

集成好之后，使用富文本编辑器的时候本地 npm run serve 运行没有问题，但是打包成 dist 使用 nginx 运行的时候出现问题：
`/js/skins/ui/oxide/content.min.css net::ERR_ABORTED 404 (Not Found)`

![](./images/vue/image-1.png)

解决办法是把 tinymce 拷贝到 public 目录中，然后加上

```js
init: {
    ...
    ...
    ...
    skin_url: '../../../tinymce/skins/ui/oxide', // skin路径，这里可以引用到 public 中的，虽然我也没有写前缀，疑惑,不过解决了打包部署后访问不到 css 文件的问题。
    content_css: '../../../tinymce/skins/content/default/content.min.css',
},
```

## 部署之后使用 www. 开头的域名转发到前端服务，浏览器 tab 的 icon 不显示问题。

其它开头的域名比如 front.xxx.xyz，代理到前端服务上可以正常显示 icon。
