# kubectl

## 安装

[https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/](https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/)

```
curl -LO https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl
```

或者在浏览器地址栏输入 `https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl`

:::tip
注意版本和 k8s 的版本不要相差 1

Before you begin
You must use a kubectl version that is within one minor version difference of your cluster. For example, a v1.28 client can communicate with v1.27, v1.28, and v1.29 control planes. Using the latest compatible version of kubectl helps avoid unforeseen issues.
:::

## 使用

- 查看版本

```shell
# 客户端版本
kubectl version --client

# 客户端和服务端版本
kubectl version
```

- 查看集群信息

```shell
kubectl cluster-info
```

## 常用命令

```shell
# 部署应用
kubectl apply -f app.yaml
# 查看 deployment
kubectl get deployment
# 查看 pod
kubectl get pod -o wide
# 查看 pod 详情
kubectl describe pod pod-name
# 查看 log
kubectl logs pod-name
# 进入 Pod 容器终端， -c container-name 可以指定进入哪个容器。
kubectl exec -it pod-name -- bash
# 伸缩扩展副本
kubectl scale deployment test-k8s --replicas=5
# 把集群内端口映射到节点
kubectl port-forward pod-name 8090:8080
# 查看历史
kubectl rollout history deployment test-k8s
# 回到上个版本
kubectl rollout undo deployment test-k8s
# 回到指定版本
kubectl rollout undo deployment test-k8s --to-revision=2
# 删除部署
kubectl delete deployment test-k8s
# 进入 pod 中的容器
kubectl exec -it pod-name -c container-name -- bash
```
