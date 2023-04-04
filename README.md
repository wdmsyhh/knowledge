## 项目运行

- 运行需要先[安装 vuepress](http://caibaojian.com/vuepress/guide/getting-started.html#%E5%9C%A8%E5%B7%B2%E6%9C%89%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%89%E8%A3%85)

- 本地运行执行：

    ```shell
    yarn docs:dev 或者 yarn vuepress dev docs
    ```

- 构建容器运行：

    ```
    cd docs/.vuepress

    docker build -t nginxwithdist .

    docker run --name kb -p 8000:80 -itd nginxwithdist

    ```
