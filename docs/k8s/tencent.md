# 腾讯云

## k8s 集群

- 开启允许外网访问。

- 下载 kubeconfig

重命名

```shell
mv ~/Downloads/cli-f5ukhgwj-config ~/Downloads/qcloud-config
```

- 新开终端

```shell
export KUBECONFIG=~/Downloads/qcloud-config
```

再查看集群信息：

```shell
kubectl cluster-info
```

此时显示的是跑在腾讯云机器上的集群。

- 可以使用 vscode 插件管理集群

管理腾讯云的： 点击插件设置选中 ~/Downloads/qcloud-config

管理本地 Kind 的：

```shell
kind get kubeconfig > ~/Downloads/kind-config
```

然后点击插件设置选中 ~/Downloads/kind-config