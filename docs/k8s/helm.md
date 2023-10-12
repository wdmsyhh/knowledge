# helm

## 官网

- [https://helm.sh/zh/](https://helm.sh/zh/)

- helm charts 仓库：

[https://artifacthub.io/](https://artifacthub.io/)

## 安装

- 查看安装方式

[https://helm.sh/zh/docs/intro/install/](https://helm.sh/zh/docs/intro/install/)

- 下载可执行文件

[https://get.helm.sh/helm-v3.13.0-linux-amd64.tar.gz](https://get.helm.sh/helm-v3.13.0-linux-amd64.tar.gz)

- 解压

```shell
tar -zxvf helm-v3.13.0-linux-amd64.tar.gz
```

- 在解压目录中找到helm程序，移动到需要的目录中

```shell
mv linux-amd64/helm /usr/local/bin/helm
```

## 使用

- 添加仓库

```shell
helm repo add bitnami https://charts.bitnami.com/bitnami
```

- 查看仓库列表

```shell
helm repo list
```

- 删除仓库

```shell
helm repo remove bitnami
```

- 查看软件有哪些版本

```shell
helm search repo bitnami/mongodb --versions
```

发现没有 `4.x` 版本的 mongodb

:::tip
使用 4.x 版本的 mongodb 参考一下方法：
:::

[https://github.com/bitnami/charts/issues/14038](https://github.com/bitnami/charts/issues/14038)

- 添加完整的索引仓库

可能需要较好的网络，开 vpn

```shell
helm repo add bitnami-full-index https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami
```

- 查看软件有哪些版本

```shell
helm search repo bitnami-full-index/mongodb --versions
```

如果上面 repo add 失败可以使用下面方法：

- 拉取项目

```shell
# git clone 或者到 github 切换到 archive-full-index 直接下载
git clone git@github.com:bitnami/charts.git

cd charts

git checkout archive-full-index

docker run --name bitnami-full -p 80:8080 -v $(pwd)/bitnami:/app bitnami/nginx

helm repo add bitnami-full http://localhost

helm search repo bitnami-full/mongodb --versions
```

## 安装 mongodb

- 安装集群

对应的 mongodb 版本是 4.4

```shell
helm install mongo bitnami-full-index/mongodb --version 8.3.2 --set architecture="replicaset",auth.rootPassword="root"
```
