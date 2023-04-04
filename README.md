运行需要先[安装 vuepress](http://caibaojian.com/vuepress/guide/getting-started.html#%E5%9C%A8%E5%B7%B2%E6%9C%89%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%89%E8%A3%85)

本地运行执行 `yarn docs:dev` 或者 `yarn vuepress dev docs`

构建容器运行：

```
1. 进入 docs/.vuepress 目录中执行 `docker build -t nginxwithdist .`
2. 然后运行 start 脚本
```
