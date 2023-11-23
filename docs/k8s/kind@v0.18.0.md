# kind@v0.18.0

## 安装

```shell
go install sigs.k8s.io/kind@v0.18.0
```

## 创建集群

```shell
➜  ~ kind delete cluster
Deleting cluster "kind" ...
➜  ~ go install sigs.k8s.io/kind@v0.18.0
➜  ~ kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.26.3) 🖼
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

## 安装 consul

[https://developer.hashicorp.com/consul/docs/k8s/installation/install](https://developer.hashicorp.com/consul/docs/k8s/installation/install)

```shell
helm install consul hashicorp/consul --set global.name=consul --create-namespace --namespace consul
##
NAME: consul
LAST DEPLOYED: Wed Nov 22 17:10:02 2023
NAMESPACE: consul
STATUS: deployed
REVISION: 1
NOTES:
Thank you for installing HashiCorp Consul!

Your release is named consul.

To learn more about the release, run:

  $ helm status consul --namespace consul
  $ helm get all consul --namespace consul

Consul on Kubernetes Documentation:
https://www.consul.io/docs/platform/k8s

Consul on Kubernetes CLI Reference:
https://www.consul.io/docs/k8s/k8s-cli

```

- 端口转发

```shell
kubectl port-forward service/consul-server --namespace consul 8500:8500
```
