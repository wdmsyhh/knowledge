# minikube

## 安装

[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

## 启动

```
minikube start
```

解决 minikube start 过程中拉取镜像慢的问题：

先执行 minikube delete

再执行 minikube start --image-mirror-country='cn'

:::tip
启动失败也可以使用下面方式
:::

```
docker pull kicbase/stable:v0.0.32

minikube start --vm-driver=docker --base-image="kicbase/stable:v0.0.32" --image-mirror-country='cn' --image-repository='registry.cn-hangzhou.aliyuncs.com/google_containers' --kubernetes-version=v1.23.8
```