# Windows11 系统配置

## 安装 Node

- 官网下载合适版本 [https://nodejs.org/zh-cn/download](https://nodejs.org/zh-cn/download)

## 安装 Yarn

yarn是一个代码包管理器，它允许我们与来自世界各地的其他开发人员共享代码。想要更多了解可以进入官网查看：[https://yarnpkg.com/getting-started](https://yarnpkg.com/getting-started)

进入yarn官网，可以看见官网已经声明从新版本(16.10)开始，yarn附带于Node.js，所以我们直接去node.js官网安装node.js就可以很方便的使用yarn了，无需再像以前的旧版本需要下载yarn的二进制文件安装，还要配置环境，太麻烦了。

:::tip
问题：yarn : 无法加载文件 C:\Program Files\nodejs\yarn.ps1，因为在此系统上禁止运行脚本。
:::

解决：
- powershell，右键以管理员身份运行
- 若要在本地计算机上运行您编写的未签名脚本和来自其他用户的签名脚本，请使用以下命令将计算机上的 执行策略更改为 RemoteSigned
```shell
set-ExecutionPolicy RemoteSigned
```
- 输入 Y

- 查看执行策略：`get-ExecutionPolicy`

## 实现虚拟机与主机之间自由粘贴和复制及文件的拖拽——VMware Tools的安装

[https://zhuanlan.zhihu.com/p/158949598](https://zhuanlan.zhihu.com/p/158949598)