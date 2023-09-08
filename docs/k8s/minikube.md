# minikube

## 安装

[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

## 启动

- 方式一

```
minikube start
```

解决 `minikube start` 过程中拉取镜像慢的问题：

先执行 `minikube delete`

再执行 `minikube start --image-mirror-country='cn'`

- 方式二

```shell
minikube start --image-mirror-country='cn' --image-repository='registry.cn-hangzhou.aliyuncs.com/google_containers' --kubernetes-version=v1.23.9
```

:::tip
启动失败也可以使用下面方式
:::

```
docker pull kicbase/stable:v0.0.32

minikube start --vm-driver=docker --base-image="kicbase/stable:v0.0.32" --image-mirror-country='cn' --image-repository='registry.cn-hangzhou.aliyuncs.com/google_containers' --kubernetes-version=v1.23.8
```

## 要查看 Minikube 集群正在使用的 Kubernetes 版本，你可以执行以下命令：

```shell
minikube kubectl -- get nodes
```

这将使用 Minikube 的内置 kubectl 命令行工具与 Minikube 集群进行通信，并获取节点的信息。输出中将包含 Kubernetes 版本的信息。

在输出中搜索 Kubernetes 版本信息，你可以在 version 字段中找到。例如，输出可能如下所示：

```text
NAME       STATUS   ROLES                  AGE     VERSION
minikube   Ready    control-plane,master   2m59s   v1.22.2
```

在上述示例中，v1.22.2 是 Minikube 集群正在使用的 Kubernetes 版本。

通过运行 minikube kubectl 命令与 Minikube 集群通信，并检查获取到的节点信息，你可以直接查看 Minikube 的 Kubernetes 版本。

## 运行 pod

如果你的镜像仓库需要用户名和密码进行访问，你可以在 Kubernetes Pod 的配置中使用 Secret 对象来指定凭据。以下是一个示例，展示如何在你提供的 Pod 配置中集成该凭据：

- 创建一个 Secret 对象：

首先，创建一个含有用户名和密码的 Secret 对象。你可以使用 kubectl create secret docker-registry 命令来创建该 Secret 对象。示例如下：

```shell
kubectl create secret docker-registry my-registry-secret \
  --docker-server=<registry-server> \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email>
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: openapi-business
spec:
  # 定义容器，可以多个
  containers:
    - name: openapi-business # 容器名字
      image: registry.ap-southeast-1.aliyuncs.com/yhhnamespace/blogrpc-openapi-business:local # 镜像
  imagePullSecrets:
    - name: my-registry-secret-1

---
apiVersion: apps/v1
kind: Deployment
metadata:
  # 部署名字
  name: blogrpc-hello
spec:
  replicas: 2
  # 用来查找关联的 Pod，所有标签都匹配才行
  selector:
    matchLabels:
      app: blogrpc-hello
  # 定义 Pod 相关数据
  template:
    metadata:
      labels:
        app: blogrpc-hello
    spec:
      # 定义容器，可以多个
      containers:
        - name: blogrpc-hello # 容器名字
          image: registry.ap-southeast-1.aliyuncs.com/yhhnamespace/blogrpc-hello:local # 镜像
      imagePullSecrets:
        - name: my-registry-secret-1

---
apiVersion: v1
kind: Service
metadata:
  name: blogrpc-hello
spec:
  selector:
    app: blogrpc-hello
  # 默认 ClusterIP 集群内可访问，NodePort 节点可访问，LoadBalancer 负载均衡模式（需要负载均衡器才可用）
  type: NodePort
  ports:
    - port: 1701        # 本 Service 的端口
      targetPort: 1701  # 容器端口
      nodePort: 31000   # 节点端口，范围固定 30000 ~ 32767
```

## test

- 获取 token

```shell
curl "localhost:9091/accessToken?appId=111&appSecret=222"
```

```shell
curl "http://localhost:9091/v1/example/hello/get?value=aaa" \
 -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExMSIsImFwcFNlY3JldCI6IjIyMiIsImF1ZCI6ImF1ZCIsImV4cCI6MTY5NDE2NjU0NCwiaWF0IjoxNjk0MTYyOTQ0LCJpc3MiOiJpc3MiLCJzdWIiOiIxMTE6MjIyIn0.YaRiSDbnGkVrtOh9Ea-Fpttw5yR8MCj6QxDn0_Wmczc'
```
