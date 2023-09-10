# Kind

## 官网

[https://kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)


## 使用

- 安装

```
# 默认会安装到 /home/user/go/bin 中 也就是 GOPATH 的 bin 中
go install sigs.k8s.io/kind@v0.8.0
```

- 创建集群

```shell
kind create cluster

# 创建结果
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.18.2) 🖼 
 ✓ Preparing nodes 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Not sure what to do next? 😅  Check out https://kind.sigs.k8s.io/docs/user/quick-start/
```

- 查看集群信息

```shell
kubectl cluster-info --context kind-kind
# 或
kubectl cluster-info

## 查看结果，可以看到是跑在本地
kubectl cluster-info --context kind-kind
Kubernetes master is running at https://127.0.0.1:39107
KubeDNS is running at https://127.0.0.1:39107/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

这里安装的是 0.8.0 版本的 kind，所对应的 kubernetes 版本是 1.18.2

版本对应关系：[https://github.com/kubernetes-sigs/kind/releases?page=2](https://github.com/kubernetes-sigs/kind/releases?page=2)

- 本地 kubeconfig

查看：

```shell
kind get kubeconfig
```

kind（Kubernetes IN Docker）是一种在本地环境中运行 Kubernetes 集群的工具。在默认情况下，kind 将集群的 kubeconfig 文件保存在以下路径：

```shell
$HOME/.kube/config
```

如果你想在操作 kind 集群时使用自定义的 kubeconfig 文件，可以通过设置 KUBECONFIG 环境变量来指定 kubeconfig 文件的路径。例如，可以使用以下命令设置环境变量：

```shell
export KUBECONFIG=/path/to/custom/kubeconfig
```